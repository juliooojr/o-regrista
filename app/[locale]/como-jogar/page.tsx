export const revalidate = 300 // ISR: revalida a cada 5 min em produção
import Link from 'next/link'
import { getHowToPlayGuides } from '@/lib/content'
import type { Post } from '@/lib/content'
import type { Metadata } from 'next'
import { PageHeader, HowToPlayCard, TypeBadge, GameCover, formatDate, sectionLabel } from '@/components/content/shared'

export const metadata: Metadata = {
  title: 'Como Jogar | O Regrista',
  description: 'Guias de regras claros e diretos para os melhores jogos de tabuleiro.',
}

function FeaturedGuide({ post }: { post: Post }) {
  return (
    <Link href={`/como-jogar/${post.slug}`} style={{
      textDecoration: 'none', color: 'inherit', display: 'flex', gap: 28,
      padding: '24px', background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, marginBottom: 32,
    }}>
      <GameCover coverUrl={post.cover_url} label={post.title_pt} width={160} height={160} />
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 10 }}>
          <TypeBadge type="how-to-play" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.3, marginBottom: 8, color: 'var(--foreground)' }}>
          Como jogar {post.title_pt}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
          {post.excerpt_pt ?? `Um guia completo para aprender as regras de ${post.title_pt} em poucos minutos, sem enrolação e com exemplos práticos.`}
        </p>
        <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
          {post.published_at ? formatDate(post.published_at) : ''} · {post.reading_time} min de leitura
        </span>
      </div>
    </Link>
  )
}

export default async function ComoJogarPage() {
  const guides = await getHowToPlayGuides(20)
  const [featured, ...rest] = guides
  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      <PageHeader title="Como Jogar" count={guides.length} unit="guias" />
      <div style={container}>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28, maxWidth: 640, borderLeft: '3px solid var(--accent)', paddingLeft: 14 }}>
          Sou o regrista — aquele cara da mesa que explica o jogo. Aqui estão guias de regras diretos ao ponto, sem enrolação.
        </p>

        {guides.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--muted)', paddingTop: 24 }}>Nenhum guia publicado ainda.</p>
        ) : (
          <>
            <p style={{ ...sectionLabel, marginBottom: 12 }}>Em destaque</p>
            <FeaturedGuide post={featured} />

            {rest.length > 0 && (
              <>
                <p style={{ ...sectionLabel, marginBottom: 16 }}>Todos os guias</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, paddingBottom: 48 }}>
                  {rest.map(p => <HowToPlayCard key={p.id} post={p} />)}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
