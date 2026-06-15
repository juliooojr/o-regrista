export const revalidate = 300 // ISR: revalida a cada 5 min em produção
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getReviewBySlug, getReviews } from '@/lib/content'
import {
  TypeBadge, GameCover, ReviewCard, formatDate, scoreColor, sectionLabel,
} from '@/components/content/shared'

const SCORE_COMPONENT_LABELS: Record<string, string> = {
  componentes: 'Componentes',
  mecanica:    'Mecânica',
  interacao:   'Interação',
  replay:      'Replay',
  curva:       'Curva de aprendizado',
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${(score / 10) * 100}%`, height: '100%', background: scoreColor(score), borderRadius: 3 }} />
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: scoreColor(score), minWidth: 28 }}>
        {score.toFixed(1)}
      </span>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, padding: '32px 0 48px' }}>

          {/* Conteúdo principal */}
          <article>
            <GameCover
              coverUrl={review.cover_url ?? game?.image_url}
              label={game?.name ?? review.title_pt}
              height={320}
            />

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

            {review.excerpt_pt && (
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--muted)', borderLeft: '3px solid var(--accent)', paddingLeft: 16, marginBottom: 32, fontStyle: 'italic' }}>
                {review.excerpt_pt}
              </p>
            )}

            {review.content_pt ? (
              <div style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--foreground)' }}>
                {review.content_pt.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: 20 }}>{para}</p>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--muted)', fontStyle: 'italic' }}>
                Conteúdo completo em breve.
              </p>
            )}

            {reviewData.verdict && (
              <div style={{ marginTop: 32, padding: '16px 20px', background: 'var(--surface)', borderRadius: 8, borderLeft: '4px solid var(--accent)' }}>
                <p style={{ ...sectionLabel, marginBottom: 8 }}>Veredicto</p>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {scoreEntries.map(([key, val]) => (
                    <div key={key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                          {SCORE_COMPONENT_LABELS[key] ?? key}
                        </span>
                      </div>
                      <ScoreBar score={val} />
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
                  game.publisher ? ['Editora', game.publisher] : null,
                  reviewData.recommended_players ? ['Melhor com', reviewData.recommended_players] : null,
                ].filter((item): item is [string, string] => item !== null).map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--muted)' }}>{key}</span>
                    <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>

        {/* Reviews relacionadas */}
        {related.length > 0 && (
          <div style={{ paddingBottom: 48, borderTop: '1px solid var(--border)', paddingTop: 32 }}>
            <p style={{ ...sectionLabel, marginBottom: 20 }}>Outras reviews</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {related.map(r => <ReviewCard key={r.id} post={r} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
