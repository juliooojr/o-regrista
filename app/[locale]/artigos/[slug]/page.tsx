export const revalidate = 300
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getPostsByType } from '@/lib/content'
import { TypeBadge, GameCover, formatDate, sectionLabel } from '@/components/content/shared'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getArticleBySlug(slug)
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
  const articles = await getPostsByType('article', 100)
  return articles.map(a => ({ slug: a.slug }))
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params
  const [post, others] = await Promise.all([
    getArticleBySlug(slug),
    getPostsByType('article', 5),
  ])
  if (!post) notFound()

  const related = others.filter(a => a.id !== post.id).slice(0, 4)
  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 0 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ padding: '0 0 12px', borderBottom: '2px solid var(--foreground)' }}>
            <Link href="/artigos" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>
              ← Artigos
            </Link>
          </div>
        </div>
      </div>

      <div style={container}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48, padding: '32px 0 48px' }}>

          {/* Conteúdo principal */}
          <article>
            {post.cover_url && (
              <GameCover coverUrl={post.cover_url} label={post.title_pt} height={280} />
            )}

            <div style={{ margin: post.cover_url ? '24px 0 16px' : '0 0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <TypeBadge type="article" />
              {post.reading_time && (
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {post.reading_time} min de leitura
                </span>
              )}
            </div>

            <h1 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.25, marginBottom: 8, color: 'var(--foreground)' }}>
              {post.title_pt}
            </h1>

            <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 24 }}>
              {post.published_at ? formatDate(post.published_at) : ''}
            </p>

            {post.excerpt_pt && (
              <p style={{
                fontSize: 17, lineHeight: 1.75, color: 'var(--muted)',
                borderLeft: '3px solid var(--accent)', paddingLeft: 16,
                marginBottom: 32, fontStyle: 'italic',
              }}>
                {post.excerpt_pt}
              </p>
            )}

            {post.content_pt ? (
              <div style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--foreground)' }}>
                {post.content_pt.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: 24 }}>{para}</p>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 15, color: 'var(--muted)', fontStyle: 'italic' }}>
                Conteúdo completo em breve.
              </p>
            )}
          </article>

          {/* Sidebar */}
          <aside style={{ paddingTop: 32 }}>
            {related.length > 0 && (
              <div>
                <p style={{ ...sectionLabel, marginBottom: 16 }}>Mais artigos</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {related.map(a => (
                    <Link
                      key={a.id}
                      href={`/artigos/${a.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{
                        padding: '12px 14px', border: '1px solid var(--border)',
                        borderRadius: 8, background: 'var(--surface-elevated)',
                      }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)', lineHeight: 1.4, marginBottom: 4 }}>
                          {a.title_pt}
                        </p>
                        <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
                          {a.published_at ? formatDate(a.published_at) : ''}
                          {a.reading_time ? ` · ${a.reading_time} min` : ''}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
