export const revalidate = 300
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getHowToPlayBySlug, getHowToPlayGuides, getPostsByType } from '@/lib/content'
import { TypeBadge, GameCover, HowToPlayCard, formatDate, sectionLabel } from '@/components/content/shared'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getHowToPlayBySlug(slug)
  if (!post) return {}
  return {
    title: `Como jogar ${post.title_pt} | O Regrista`,
    description: post.excerpt_pt ?? undefined,
    openGraph: {
      title: `Como jogar ${post.title_pt}`,
      description: post.excerpt_pt ?? undefined,
      images: post.cover_url ? [post.cover_url] : [],
    },
  }
}

export async function generateStaticParams() {
  const guides = await getPostsByType('how-to-play', 100)
  return guides.map(g => ({ slug: g.slug }))
}

export default async function ComoJogarPostPage({ params }: Props) {
  const { slug } = await params
  const [post, others] = await Promise.all([
    getHowToPlayBySlug(slug),
    getHowToPlayGuides(5),
  ])
  if (!post) notFound()

  const related = others.filter(g => g.id !== post.id).slice(0, 4)
  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 0 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ padding: '0 0 12px', borderBottom: '2px solid var(--foreground)' }}>
            <Link href="/como-jogar" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>
              ← Como Jogar
            </Link>
          </div>
        </div>
      </div>

      <div style={container}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48, padding: '32px 0 48px' }}>

          {/* Conteúdo principal */}
          <article>
            <GameCover
              coverUrl={post.cover_url}
              label={post.title_pt}
              height={280}
            />

            <div style={{ margin: '24px 0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <TypeBadge type="how-to-play" />
              {post.reading_time && (
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {post.reading_time} min de leitura
                </span>
              )}
            </div>

            <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.3, marginBottom: 8, color: 'var(--foreground)' }}>
              Como jogar {post.title_pt}
            </h1>

            <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 24 }}>
              {post.published_at ? formatDate(post.published_at) : ''}
            </p>

            {post.excerpt_pt && (
              <p style={{
                fontSize: 16, lineHeight: 1.75, color: 'var(--muted)',
                borderLeft: '3px solid var(--accent)', paddingLeft: 16,
                marginBottom: 32, fontStyle: 'italic',
              }}>
                {post.excerpt_pt}
              </p>
            )}

            {post.content_pt ? (
              <div style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--foreground)' }}>
                {post.content_pt.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: 22 }}>{para}</p>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 15, color: 'var(--muted)', fontStyle: 'italic' }}>
                Guia completo em breve.
              </p>
            )}
          </article>

          {/* Sidebar */}
          <aside style={{ paddingTop: 32 }}>
            {related.length > 0 && (
              <div>
                <p style={{ ...sectionLabel, marginBottom: 16 }}>Outros guias</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {related.map(g => (
                    <HowToPlayCard key={g.id} post={g} />
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
