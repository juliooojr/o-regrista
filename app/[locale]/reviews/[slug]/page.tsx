export const revalidate = 300 // ISR: revalida a cada 5 min em produção
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getReviewBySlug, getReviews } from '@/lib/content'
import {
  TypeBadge, GameCover, ReviewCard, formatDate, scoreColor, sectionLabel,
} from '@/components/content/shared'

const SCORE_COMPONENT_LABELS: Record<string, string> = {
  interacao:     'Interação',
  variabilidade: 'Variabilidade',
  profundidade:  'Profundidade Estratégica',
  iconografia:   'Iconografia e Clareza',
  vontade:       'Vontade de Jogar Novamente',
}

function StarRating({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div style={{ display: 'flex', gap: 1, fontSize: 13 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i}>{i < score ? '⭐' : '☆'}</span>
      ))}
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const review = await getReviewBySlug(slug)
  if (!review) return {}
  return {
    title: `${review.title_pt} | O Regrista`,
    description: review.excerpt_pt ?? `Review de ${review.game?.name ?? review.title_pt} — nota ${review.review.score.toFixed(1)}.`,
    openGraph: {
      title: review.title_pt,
      description: review.excerpt_pt ?? undefined,
      images: review.cover_url ? [review.cover_url] : review.game?.image_url ? [review.game.image_url] : [],
    },
  }
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [review, allReviews] = await Promise.all([
    getReviewBySlug(slug),
    getReviews(4),
  ])
  if (!review) notFound()

  const related = allReviews.filter(r => r.id !== review.id).slice(0, 3)
  const { game, review: reviewData } = review
  const scoreComponents = reviewData.score_components ?? {}
  const scoreEntries = Object.entries(scoreComponents).filter(([, v]) => v !== undefined) as [string, number][]

  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 0 0', marginBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ padding: '0 0 12px', borderBottom: '2px solid var(--foreground)' }}>
            <Link href="/reviews" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>
              ← Reviews
            </Link>
          </div>
        </div>
      </div>

      <div style={container}>
        <div className="page-sidebar-grid" style={{ padding: '32px 0 48px' }}>

          {/* Conteúdo principal */}
          <article>
            {(review.cover_url ?? game?.image_url) ? (
              <div style={{ borderRadius: 8, overflow: 'hidden', background: 'var(--surface)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={review.cover_url ?? game?.image_url ?? ''}
                  alt={game?.name ?? review.title_pt}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            ) : (
              <GameCover
                coverUrl={null}
                label={game?.name ?? review.title_pt}
                height={220}
              />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '24px 0 16px' }}>
              <div>
                <TypeBadge type={review.type} />
                {game?.name && (
                  <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>
                    {game.name_pt ?? game.name}
                  </p>
                )}
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 48, fontWeight: 700,
                  color: scoreColor(reviewData.score), lineHeight: 1,
                }}>
                  {reviewData.score.toFixed(1)}
                </span>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  nota final
                </p>
              </div>
            </div>

            <h1 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, marginBottom: 12, color: 'var(--foreground)' }}>
              {review.title_pt}
            </h1>
            <p style={{ fontSize: 14, color: 'var(--muted-foreground)', marginBottom: 24 }}>
              {review.published_at ? formatDate(review.published_at) : ''} · {review.reading_time} min de leitura
            </p>

            {review.content_pt ? (
              <div style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--foreground)' }}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p style={{ marginBottom: 20, textAlign: 'justify' }}>{children}</p>
                    ),
                    h2: ({ children }) => (
                      <h2 style={{
                        fontSize: 17, fontWeight: 700, lineHeight: 1.3,
                        marginBottom: 12, marginTop: 36,
                        color: 'var(--foreground)',
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: 8,
                      }}>{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 style={{
                        fontSize: 15, fontWeight: 700, lineHeight: 1.3,
                        marginBottom: 10, marginTop: 28,
                        color: 'var(--foreground)',
                      }}>{children}</h3>
                    ),
                    strong: ({ children }) => (
                      <strong style={{ fontWeight: 700, color: 'var(--foreground)' }}>{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em style={{ fontStyle: 'italic', color: 'var(--muted)' }}>{children}</em>
                    ),
                  }}
                >
                  {review.content_pt}
                </ReactMarkdown>
              </div>
            ) : (
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--muted)', fontStyle: 'italic' }}>
                Conteúdo completo em breve.
              </p>
            )}

            {reviewData.verdict && (
              <div style={{ marginTop: 32, padding: '16px 20px', background: 'var(--surface)', borderRadius: 8, borderLeft: '4px solid var(--accent)' }}>
                <p style={{ ...sectionLabel, marginBottom: 8 }}>Veredito</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--foreground)', lineHeight: 1.5 }}>
                  {reviewData.verdict}
                </p>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside>
            {/* Sub-scores */}
            {scoreEntries.length > 0 && (
              <div style={{ padding: '16px 18px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)', marginBottom: 24 }}>
                <p style={{ ...sectionLabel, marginBottom: 14 }}>Sub-scores</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {scoreEntries.map(([key, val]) => (
                    <div key={key}>
                      <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                        {SCORE_COMPONENT_LABELS[key] ?? key}
                      </span>
                      <StarRating score={val} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>Nota final</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: scoreColor(reviewData.score) }}>
                    {reviewData.score.toFixed(1)}
                  </span>
                </div>
              </div>
            )}

            {/* Ficha técnica */}
            {game && (
              <div style={{ padding: '16px 18px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)', marginBottom: 24 }}>
                <p style={{ ...sectionLabel, marginBottom: 14 }}>Ficha técnica</p>
                {[
                  ['Jogo', game.name_pt ?? game.name],
                  game.year ? ['Ano', String(game.year)] : null,
                  (game.min_players && game.max_players) ? ['Jogadores', `${game.min_players}–${game.max_players}`] : null,
                  (game.min_duration && game.max_duration) ? ['Duração', `${game.min_duration}–${game.max_duration} min`] : null,
                  game.weight ? ['Complexidade', `${game.weight.toFixed(1)} / 5.0`] : null,
                  game.designer ? ['Designer', game.designer] : null,
 