export const revalidate = 300
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostsByType } from '@/lib/content'
import { PageHeader, TypeBadge, GameCover, formatDate, sectionLabel } from '@/components/content/shared'

export const metadata: Metadata = {
  title: 'Top 10 | O Regrista',
  description: 'Minhas listas pessoais dos melhores jogos de tabuleiro.',
}

export default async function Top10Page() {
  const lists = await getPostsByType('top10', 20)
  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      <PageHeader title="Top 10" count={lists.length} unit="listas" />

      <div style={container}>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 32, maxWidth: 600 }}>
          Listas pessoais com os melhores jogos que já joguei — atualizadas conforme novas experiências chegam.
        </p>

        {lists.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Nenhuma lista publicada ainda.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 48 }}>
            {lists.map(post => (
              <Link
                key={post.id}
                href={`/top10/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden',
                  background: 'var(--surface-elevated)', display: 'flex', gap: 0,
                  flexDirection: 'column',
                }}>
                  <GameCover coverUrl={post.cover_url} label={post.title_pt} height={140} />
                  <div style={{ padding: '14px 16px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <TypeBadge type="top10" />
                      {post.published_at && (
                        <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
                          {formatDate(post.published_at)}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.3, marginBottom: 8, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                      {post.title_pt}
                    </p>
                    {post.excerpt_pt && (
                      <p style={{
                        fontSize: 13, color: 'var(--muted)', lineHeight: 1.55,
                        overflow: 'hidden', display: '-webkit-box',
                        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      }}>
                        {post.excerpt_pt}
                      </p>
                    )}
                    <p style={{ ...sectionLabel, marginTop: 12, color: 'var(--accent)' }}>
                      Ver lista →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
