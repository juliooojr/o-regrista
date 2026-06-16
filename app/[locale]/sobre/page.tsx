export const revalidate = 300 // ISR: revalida a cada 5 min em produção
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getReviews, getSiteStats } from '@/lib/content'
import { GameCover, scoreColor, sectionLabel } from '@/components/content/shared'

export const metadata: Metadata = {
  title: 'Sobre | O Regrista',
  description: 'O Regrista é o projeto pessoal de Julio Jr. — análises e guias de boardgames.',
}

// ─── WhatsApp ────────────────────────────────────────────────────────────────
const WHATSAPP_URL = 'https://wa.me/5534991907474'

// ─── Anos no hobby (atualizar manualmente) ───────────────────────────────────
const ANOS_NO_HOBBY = 11
const JOGOS_NA_COLECAO = 75

// ─── Avatar — Supabase Storage ───────────────────────────────────────────────
const AVATAR_URL: string | null = 'https://zvuwwlzlmnpzlwxfzfrd.supabase.co/storage/v1/object/public/media/foto_perfil.png'

// ─── Bio ──────────────────────────────────────────────────────────────────────
const BIO = [
  'Sou Julio Jr., morador de Uberlândia e apaixonado por boardgames desde 2015, quando fui apresentado a uma caixa de Catan em um sábado chuvoso. O que começou como um passatempo rapidamente se transformou em uma forma de reunir pessoas, criar histórias e compartilhar experiências ao redor de uma mesa.',
  'Ao longo dos anos, joguei centenas de partidas, apresentei inúmeros jogos para amigos e vivi uma situação que se repetia com frequência: a expectativa de conhecer um jogo novo muitas vezes dava lugar a longos minutos de leitura de regras, enquanto uma pessoa tentava entender o manual e o restante da mesa aguardava para começar. Sempre achei que deveria existir uma forma melhor de fazer isso.',
  'Foi nesse contexto que percebi outro padrão. Em praticamente toda partida, em algum momento alguém olhava para mim e perguntava: "mas como funciona mesmo essa regra?". Não sei exatamente quando esse papel passou a ser meu, mas ele ficou.',
  'Talvez porque eu sempre tenha gostado de entender como as coisas funcionam. Mais do que decorar regras, gosto de encontrar a lógica por trás delas. De transformar um manual de dezenas de páginas em algo simples, claro e fácil de explicar. De pegar sistemas complexos e organizar as informações de forma racional e organizada, permitindo que qualquer pessoa compreenda rapidamente o que realmente importa para começar a jogar.',
  'Foi dessa característica que nasceu O Regrista.',
  'Este espaço foi criado para ajudar jogadores a aprender novos jogos, esclarecer dúvidas e encontrar explicações objetivas para regras que, muitas vezes, parecem mais complicadas do que realmente são. Aqui você encontrará resumos, interpretações, dicas e conteúdos produzidos por alguém que acredita que uma boa explicação pode transformar completamente a experiência de uma mesa.',
  'Porque, no fim das contas, os melhores momentos dos jogos não acontecem lendo o manual. Eles acontecem quando todos entendem a partida e podem focar no que realmente importa: jogar, competir, cooperar e criar memórias ao redor da mesa.',
]

export default async function SobrePage() {
  const [latestReviews, stats] = await Promise.all([
    getReviews(3),
    getSiteStats(),
  ])

  const STATS = [
    { value: String(JOGOS_NA_COLECAO), label: 'jogos na coleção' },
    { value: String(stats.reviews), label: 'reviews publicadas' },
    { value: String(stats.guides),  label: 'guias de regras' },
    { value: String(ANOS_NO_HOBBY), label: 'anos no hobby' },
  ]

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
            {/* Avatar — Supabase Storage ou fallback gradiente */}
            <div style={{
              width: 100, height: 100, borderRadius: '50%', marginBottom: 24,
              overflow: 'hidden', position: 'relative', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--accent) 0%, #7B5EA7 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#fff', letterSpacing: '0.04em',
            }}>
              {AVATAR_URL
                ? <Image src={AVATAR_URL} alt="Julio Jr." fill style={{ objectFit: 'cover' }} />
                : 'JR'
              }
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6, color: 'var(--foreground)' }}>
              Julio Jr. — o Regrista
            </h2>
            <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, marginBottom: 20 }}>
              Uberlândia, Brasil
            </p>

            {BIO.map((p, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--foreground)', marginBottom: 18 }}>
                {p}
              </p>
            ))}

            {/* Stats dinâmicos do banco */}
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
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', textAlign: 'center', padding: '10px',
                  background: '#25D366', color: '#fff', borderRadius: 8,
                  fontSize: 13, fontWeight: 600, textDecoration: 'none',
                }}
              >
                WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
