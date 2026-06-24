export const revalidate = 300
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTop10BySlug, getPostsByType } from '@/lib/content'
import type { Top10Item } from '@/lib/content'
import { GameCover, formatDate, sectionLabel } from '@/components/content/shared'

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

// ─── sub-componentes (idênticos ao page.tsx) ──────────────────────────────────

function ChangeBadge({ item }: { item: Top10Item }) {
  if (item.prev_position === null) return null
  const diff = item.prev_position - item.position
  if (diff === 0) return <span style={{ fontSize: 11, color: 'var(--muted)' }}>—</span>
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: diff > 0 ? 'var(--success)' : 'var(--error)' }}>
      {diff > 0 ? '▲' : '▼'}{Math.abs(diff)}
    </span>
  )
}

function RatingBadge({ label, value, href }: { label: string; value: number | null; href?: string }) {
  if (!value) return null
  const badge = (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 7px', borderRadius: 5,
      background: 'var(--surface)', border: '1px solid var(--border)',
      fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
      color: 'var(--foreground)', whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'inherit' }}>{label}</span>
      {value.toFixed(2)}
    </span>
  )
  if (href) return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      {badge}
    </a>
  )
  return badge
}

export default async function Top10PostPage({ params }: Props) {
  const { slug } = await params
  const [post, allLists] = await Promise.all([
    getTop10BySlug(slug),
    getPostsByType('top10', 20),
  ])
  if (!post) notFound()

  const otherLists = allLists.filter(l => l.slug !== slug)
  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      {/* Breadcrumb — mesmo estilo do header das outras páginas */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 0 0', marginBottom: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ padding: '0 0 12px', borderBottom: '2px solid var(--foreground)' }}>
            <Link href="/top10" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>
              ← Top 10
            </Link>
          </div>
        </div>
      </div>

      <div style={container}>
        <div className="page-sidebar-grid">

          {/* ─── Lista principal ────────────────────────────────────────── */}
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 26,
                letterSpacing: '0.03em', color: 'var(--foreground)', margin: '0 0 6px',
              }}>
                {post.title_pt}
              </h2>
              {post.published_at && (
                <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: '0 0 10px' }}>
                  {formatDate(post.published_at)}
                </p>
              )}
              {post.excerpt_pt && (
                <p style={{
                  fontSize: 14, lineHeight: 1.7, color: 'var(--muted)', fontStyle: 'italic',
                  borderLeft: '3px solid var(--accent)', paddingLeft: 14, margin: 0,
                }}>
                  {post.excerpt_pt}
                </p>
              )}
            </div>

            {post.items.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Lista em construção.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {post.items.map((item, idx) => {
                  const game = item.game
                  const isFirst = item.position === 1
                  const bggUrl = game?.bgg_id
                    ? `https://boardgamegeek.com/boardgame/${game.bgg_id}`
                    : undefined

                  return (
                    <div
                      key={item.id}
                      className="top10-item"
                      style={{
                        padding: '24px 0',
                        borderBottom: idx < post.items.length - 1
                          ? '1px solid var(--border)'
                          : 'none',
                      }}
                    >
                      {/* Posição */}
                      <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        minWidth: 44, paddingTop: 6, flexShrink: 0,
                      }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: isFirst ? 32 : 22,
                          fontWeight: 700,
                          color: isFirst ? 'var(--accent)' : 'var(--muted)',
                          lineHeight: 1,
                        }}>
                          {item.position}
                        </span>
                        <div style={{ marginTop: 6 }}>
                          <ChangeBadge item={item} />
                        </div>
                      </div>

                      {/* Capa */}
                      <div style={{ flexShrink: 0 }}>
                        <GameCover
                          coverUrl={game?.image_url}
                          label={game?.name ?? ''}
                          width={130}
                          height={130}
                        />
                      </div>

                      {/* Infos */}
                      <div className="top10-info">
                        {/* Nome + link BGG */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                          <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.3, margin: 0 }}>
                            {game?.name_pt ?? game?.name ?? '—'}
                          </p>
                          {bggUrl && (
                            <a
                              href={bggUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: 11, color: 'var(--accent)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                            >
                              BGG ↗
                            </a>
                          )}
                        </div>

                        {/* Meta: ano · jogadores · designer */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 12px', marginBottom: 10 }}>
                          {game?.year && (
                            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{game.year}</span>
                          )}
                          {game?.min_players && game?.max_players && (
                            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                              {game.min_players === game.max_players
                                ? `${game.min_players} jogadores`
                                : `${game.min_players}–${game.max_players} jogadores`}
                            </span>
                          )}
                          {game?.designer && (
                            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{game.designer}</span>
                          )}
                        </div>

                        {/* Ratings BGG + Ludopedia */}
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                          <RatingBadge
                            label="BGG "
                            value={game?.bgg_rating ?? null}
                            href={bggUrl}
                          />
                          <RatingBadge
                            label="Ludo"
                            value={game?.ludopedia_rating ?? null}
                            href={game?.ludopedia_url ?? undefined}
                          />
                        </div>

                        {/* Nota do Julio */}
                        {item.notes_pt && (
                          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                            {item.notes_pt}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* ─── Sidebar ────────────────────────────────────────────────── */}
          <aside className="sidebar-sticky">
            <p style={{ ...sectionLabel, marginBottom: 16 }}>Outras listas</p>

            {otherLists.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic' }}>Em breve.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {otherLists.map(list => (
                  <Link
                    key={list.id}
                    href={`/top10/${list.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div style={{
                      padding: '14px 16px',
                      background: 'var(--surface)',
                      borderRadius: 10,
                      border: '1px solid var(--border)',
                    }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 4, lineHeight: 1.3 }}>
                        {list.title_pt}
                      </p>
                      {list.excerpt_pt && (
                        <p style={{
                          fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 8px',
                          overflow: 'hidden', display: '-webkit-box',
                          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        }}>
                          {list.excerpt_pt}
                        </p>
                      )}
                      <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>
                        Ver lista →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  )
}
