export const revalidate = 300 // ISR: revalida a cada 5 min em produção
import Link from 'next/link'
import { getPostsByType } from '@/lib/content'
import type { Post } from '@/lib/content'
import type { Metadata } from 'next'
import { PageHeader, TypeBadge, GameCover, formatDate, sectionLabel } from '@/components/content/shared'

export const metadata: Metadata = {
  title: 'Artigos | O Regrista',
  description: 'Textos editoriais e opiniões sobre o mundo dos boardgames.',
}

function ArticleCard({ post }: { post: Post }) {
  return (
    <Link href={`/artigos/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
      <GameCover coverUrl={post.cover_url} label={post.title_pt} width={80} height={80} />
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 8 }}>
          <TypeBadge type={post.type} />
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4, marginBottom: 6, color: 'var(--foreground)' }}>
          {post.title_pt}
        </h3>
        <p style={{
          fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 8,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {post.excerpt_pt}
        </p>
        <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
          {post.published_at ? formatDate(post.published_at) : ''} · {post.reading_time} min
        </span>
      </div>
    </Link>
  )
}

export default async function ArtigosPage() {
  const articles = await getPostsByType('article', 50)
  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      <PageHeader title="Artigos" count={articles.length} unit="artigos" />
      <div style={container}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, paddingBottom: 48 }}>
          {/* Lista principal */}
          <div>
            {articles.length === 0 ? (
              <p style={{ fontSize: 14, color: 'var(--muted)', paddingTop: 24 }}>Nenhum artigo publicado ainda.</p>
            ) : (
              articles.map(p => <ArticleCard key={p.id} post={p} />)
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div style={{ padding: '16px 18px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)', position: 'sticky', top: 72 }}>
              <p style={{ ...sectionLabel, marginBottom: 12 }}>Temas</p>
              {['Análise', 'Coleção', 'Mecânicas', 'Mercado', 'Cultura', 'Resenha'].map(tag => (
                <span key={tag} style={{
                  display: 'inline-block', margin: '4px 4px 0 0', padding: '4px 10px',
                  fontSize: 12, borderRadius: 20, background: 'var(--border)', color: 'var(--muted)',
                  cursor: 'pointer',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
