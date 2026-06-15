export const revalidate = 300 // ISR: revalida a cada 5 min em produção
import Link from 'next/link'
import type { Metadata } from 'next'
import { getReviews } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Sobre | O Regrista',
  description: 'O Regrista é o projeto pessoal de Julio — análises e guias de boardgames.',
}
import { GameCover, formatDate, scoreColor, sectionLabel } from '@/components/content/shared'

const STATS = [
  { value: '40+', label: 'jogos na coleção' },
  { value: '12',  label: 'reviews publicadas' },
  { value: '8',   label: 'guias de regras' },
  { value: '3',   label: 'anos no hobby' },
]

export default async function SobrePage() {
  const latestReviews = await getReviews(3)
  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 0 0', marginBottom: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ padding: '0 0 12px', borderBottom: '2px solid var(--foreground)' }}>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: '0.04em', color: 'var(--foreground)', margin: 0 }}>
              Sobre o Regrista
            </h1>
          </div>
        </div>
      </div>

      <div style={container}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48, paddingBottom: 48 }}>

          {/* Bio */}
          <div>
            {/* Avatar placeholder */}
            <div style={{
              width: 100, height: 100, borderRadius: '50%', marginBottom: 24,
              background: 'linear-gradient(135deg, var(--accent) 0%, #7B5EA7 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#fff', letterSpacing: '0.04em',
            }}>
              JR
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6, color: 'var(--foreground)' }}>
              Julio — o Regrista
            </h2>
            <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, marginBottom: 20 }}>
              São Paulo, Brasil
            </p>

            {[
              'Sou chamado de regrista há anos. Esse apelido surgiu porque toda vez que um jogo novo aparece na mesa, sou eu quem explica as regras — com clareza, sem pular partes, e sem enrolar.',
              'Comecei no hobby com Catan e Ticket to Ride, como todo mundo. Hoje minha coleção tem mais de 40 jogos, com preferência por eurogames e jogos de peso médio-alto que cabem em uma noite.',
              'O Regrista é o meu espaço para documentar o que jogo, o que penso, e para ajudar quem quer entrar ou se aprofundar no hobby. Tudo em português, com opinião, sem papas na língua.',
            ].map((p, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--foreground)', marginBottom: 18 }}>
                {p}
              </p>
            ))}

            {/* Stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
              background: 'var(--border)', borderRadius: 10, overflow: 'hidden', marginTop: 32,
            }}>
              {STATS.map(s => (
                <div key={s.label} style={{ padding: '20px 16px', background: 'var(--surface)', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            {/* Últimas reviews */}
            <div style={{ padding: '16px 18px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)', marginBottom: 20 }}>
              <p style={{ ...sectionLabel, marginBottom: 14 }}>Últimas reviews</p>
              {latestReviews.map(r => (
                <Link key={r.id} href={`/reviews/${r.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <GameCover
                    coverUrl={r.cover_url ?? r.game?.image_url}
                    label={r.game?.name ?? r.title_pt}
                    width={40}
                    height={40}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)', lineHeight: 1.4 }}>{r.title_pt}</p>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: scoreColor(r.review.score) }}>
                      {r.review.score.toFixed(1)}
                    </span>
                  </div>
                </Link>
              ))}
              <Link href="/reviews" style={{ display: 'block', fontSize: 12, color: 'var(--accent)', textDecoration: 'none', marginTop: 12, fontWeight: 500 }}>
                Ver todas →
              </Link>
            </div>

            {/* Contato */}
            <div style={{ padding: '16px 18px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <p style={{ ...sectionLabel, marginBottom: 12 }}>Contato</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
                Sugestão de jogo, troca de coleção, ou só quer conversar sobre boardgames?
              </p>
              <a href="mailto:contato@oregrista.com.br" style={{
                display: 'block', textAlign: 'center', padding: '10px',
                background: 'var(--accent)', color: '#fff', borderRadius: 8,
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}>
                Enviar mensagem
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
