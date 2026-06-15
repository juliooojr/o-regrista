export const revalidate = 300
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTop10BySlug, getPostsByType } from '@/lib/content'
import type { Top10Item } from '@/lib/content'
import { TypeBadge, GameCover, formatDate, sectionLabel } from '@/components/content/shared'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getTop10BySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title_pt} | O Regrista`,
    description: post.excerpt_pt ?? undefined,
    openGraph: {
      title: post.title_pt,
      description: post.excerpt_pt ?? undefined,
      images: post.cover_url ? [post.cover_url] : [],
    },
  }
}

export async function generateStaticParams() {
  const lists = await getPostsByType('top10', 100)
  return lists.map(l => ({ slug: l.slug }))
}

function ChangeBadge({ item }: { item: Top10Item }) {
  if (item.prev_position === null) {
    return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#fff', background: '#3b82f6', borderRadius: 4, padding: '2px 5px' }}>NOVO</span>
  }
  const diff = item.prev_position - item.position
  if (diff === 0) {
    return <span style={{ fontSize: 11, color: 'var(--muted)' }}>—</span>
  }
  const up = diff > 0
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: up ? 'var(--success)' : 'var(--error)' }}>
      {up ? '▲' : '▼'}{Math.abs(diff)}
    </span>
  )
}

function WeightBar({ weight }: { weight: number }) {
  const pct = ((weight - 1) / 4) * 100
  const color = weight <= 2 ? '#22c55e' : weight <= 3 ? '#ca8a04' : '#ef4444'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 48, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--muted)', minWidth: 20 }}>{weight.toFixed(1)}</span>
    </div>
  )
}

export default async function Top10PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getTop10BySlug(slug)
  if (!post) notFound()

  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 0 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ padding: '0 0 12px', borderBottom: '2px solid var(--foreground)' }}>
            <Link href="/top10" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>
              ← Top 10
            </Link>
          </div>
        </div>
      </div>

      <div style={container}>
        <div style={{ padding: '32px 0 48px', maxWidth: 800 }}>

          {/* Cabeçalho */}
          <div style={{ marginBottom: 32 }}>
            <TypeBadge type="top10" />
            <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, margin: '12px 0 8px', color: 'var(--foreground)', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              {post.title_pt}
            </h1>
            <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 16 }}>
              {post.published_at ? formatDate(post.published_at) : ''}
            </p>
            {post.excerpt_pt && (
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--muted)', borderLeft: '3px solid var(--accent)', paddingLeft: 16, fontStyle: 'italic' }}>
                {post.excerpt_pt}
              </p>
            )}
          </div>

          {/* Lista rankeada */}
          {post.items.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Lista em construção.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {post.items.map((item, idx) => {
                const game = item.game
                const isFirst = item.position === 1
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex', gap: 16, alignItems: 'flex-start',
                      padding: '20px 0',
                      borderBottom: idx < post.items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    }}
                  >
                    {/* Posição */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40, paddingTop: 2 }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: isFirst ? 28 : 20,
                        fontWeight: 700,
                        color: isFirst ? 'var(--accent)' : 'var(--muted)',
                        lineHeight: 1,
                      }}>
                        {item.position}
                      </span>
                      <div style={{ marginTop: 4 }}>
                        <ChangeBadge item={item} />
                      </div>
                    </div>

                    {/* Capa */}
                    <GameCover
                      coverUrl={game?.image_url}
                      label={game?.name ?? ''}
                      width={56}
                      height={72}
                    />

                    {/* Infos */}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', marginBottom: 4, lineHeight: 1.3 }}>
                        {game?.name_pt ?? game?.name ?? '—'}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginBottom: 8 }}>
                        {game?.year && (
                          <span style={{ fontSize: 12, color: 'var(--muted)' }}>{game.year}</span>
                        )}
                        {game?.min_players && game?.max_players && (
                          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                            {game.min_players}–{game.max_players} jogadores
                          </span>
                        )}
                        {game?.designer && (
                          <span style={{ fontSize: 12, color: 'var(--muted)' }}>{game.designer}</span>
                        )}
                        {game?.weight && <WeightBar weight={game.weight} />}
                      </div>
                      {item.notes_pt && (
                        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                          {item.notes_pt}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Corpo do post */}
          {post.content_pt && (
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
              <p style={{ ...sectionLabel, marginBottom: 16 }}>Sobre esta lista</p>
              <div style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--foreground)' }}>
                {post.content_pt.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: 20 }}>{para}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
