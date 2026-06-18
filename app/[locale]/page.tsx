export const revalidate = 300 // ISR: revalida a cada 5 min em produção
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'O Regrista — Reviews e guias de boardgames',
  description: 'Reviews honestas, guias de regras e listas dos melhores jogos de tabuleiro, em português.',
  openGraph: {
    title: 'O Regrista',
    description: 'Reviews, guias e listas de boardgames — em português.',
    type: 'website',
  },
}
import {
  getFeaturedPost, getLatestPosts, getReviews, getHowToPlayGuides, getReviewBySlug,
} from '@/lib/content'
import type { Post, PostType, ReviewFull } from '@/lib/content'

// ─── helpers ────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<PostType, string> = {
  review: 'Review', article: 'Artigo', top10: 'Top 10', 'how-to-play': 'Como Jogar',
}
const TYPE_STYLE: Record<PostType, { bg: string; color: string }> = {
  review:        { bg: '#FAEEDA', color: '#633806' },
  article:       { bg: '#EAF3DE', color: '#173404' },
  top10:         { bg: '#E6F1FB', color: '#042C53' },
  'how-to-play': { bg: '#EEEDFE', color: '#26215C' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function scoreColor(score: number) {
  if (score >= 9)   return 'var(--success)'
  if (score >= 7.5) return 'var(--accent)'
  if (score >= 6)   return 'var(--foreground)'
  if (score >= 4)   return 'var(--muted)'
  return 'var(--error)'
}

function placeholderColor(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  return `hsl(${Math.abs(h) % 360}, 28%, 30%)`
}

// ─── sub-components ─────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: PostType }) {
  const s = TYPE_STYLE[type]
  return (
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: s.bg, color: s.color }}>
      {TYPE_LABEL[type]}
    </span>
  )
}

function Cover({ coverUrl, label, width, height }: { coverUrl?: string | null; label: string; width?: number | string; height: number | string }) {
  if (coverUrl) {
    return (
      <div style={{ width: width ?? '100%', height, flexShrink: 0, borderRadius: 6, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverUrl} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )
  }
  return (
    <div style={{ width: width ?? '100%', height, flexShrink: 0, borderRadius: 6, background: placeholderColor(label), overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
      <span style={{ width: '100%', padding: '6px 8px', background: 'rgba(0,0,0,0.45)', color: '#fff', fontSize: 10, fontWeight: 600, lineHeight: 1.2, letterSpacing: '0.03em' }}>{label}</span>
    </div>
  )
}

function postHref(post: Post): string {
  if (post.type === 'review')       return `/reviews/${post.slug}`
  if (post.type === 'top10')        return `/top10/${post.slug}`
  if (post.type === 'how-to-play')  return `/como-jogar/${post.slug}`
  return `/artigos/${post.slug}`
}

// ─── sections ───────────────────────────────────────────────────────────────

function FeaturedPost({ post, score }: { post: Post; score?: number }) {
  const label = post.title_pt
  return (
    <Link href={postHref(post)} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 28, height: '100%' }}>
      {/* Imagem quadrada */}
      <div style={{ flexShrink: 0 }}>
        <Cover coverUrl={post.cover_url} label={label} width={280} height={280} />
      </div>

      {/* Texto */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <TypeBadge type={post.type} />
          {score !== undefined && (
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 700, color: scoreColor(score), lineHeight: 1 }}>
              {score.toFixed(1)}
            </span>
          )}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.3, marginBottom: 12, color: 'var(--foreground)' }}>
          {post.title_pt}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>
          {post.excerpt_pt}
        </p>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
            {post.published_at ? formatDate(post.published_at) : ''} · {post.reading_time} min
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
            {post.type === 'review' ? 'Ler review →' : 'Ler →'}
          </span>
        </div>
      </div>
    </Link>
  )
}

function SidebarItem({ post }: { post: Post }) {
  return (
    <Link href={postHref(post)} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <Cover coverUrl={post.cover_url} label={post.title_pt} width={64} height={64} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <TypeBadge type={post.type} />
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: 'var(--foreground)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {post.title_pt}
        </p>
        <span style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 4, display: 'block' }}>
          {post.published_at ? formatDate(post.published_at) : ''}
        </span>
      </div>
    </Link>
  )
}

function ReviewCard({ post }: { post: ReviewFull }) {
  return (
    <Link href={`/reviews/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', display: 'block', background: 'var(--surface-elevated)' }}>
      <Cover coverUrl={post.cover_url ?? post.game?.image_url} label={post.game?.name ?? post.title_pt} height={180} />
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <TypeBadge type={post.type} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 700, color: scoreColor(post.review.score) }}>
            {post.review.score.toFixed(1)}
          </span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, marginBottom: 6, color: 'var(--foreground)' }}>
          {post.title_pt}
        </p>
        <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 10, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {post.excerpt_pt}
        </p>
        <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
          {post.published_at ? formatDate(post.published_at) : ''} · {post.reading_time} min
        </span>
      </div>
    </Link>
  )
}

function HowToPlayCard({ post }: { post: Post }) {
  return (
    <Link href={`/como-jogar/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', display: 'block', background: 'var(--surface-elevated)' }}>
      <Cover coverUrl={post.cover_url} label={post.title_pt} height={120} />
      <div style={{ padding: '12px 14px 14px' }}>
        <TypeBadge type="how-to-play" />
        <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, margin: '8px 0 6px', color: 'var(--foreground)' }}>
          Como jogar {post.title_pt}
        </p>
        <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
          {post.published_at ? formatDate(post.published_at) : ''} · {post.reading_time} min
        </span>
      </div>
    </Link>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }
  const labelStyle = { fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' as const, color: 'var(--muted)' }

  // Busca em paralelo
  const featuredPost = await getFeaturedPost()
  const [latestPosts, latestReviews, howToPlayGuides, featuredReview] = await Promise.all([
    getLatestPosts(6),
    getReviews(3),
    getHowToPlayGuides(4),
    featuredPost?.type === 'review' ? getReviewBySlug(featuredPost.slug) : Promise.resolve(null),
  ])

  const featured = featuredPost
  const featuredScore = featuredReview?.review.score
  const sidebarItems = latestPosts.filter(p => p.id !== featuredPost?.id).slice(0, 5)

  return (
    <div>
      {/* ── Destaque ─────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 0 0' }}>
        <div style={container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 12px', borderBottom: '2px solid var(--foreground)' }}>
            <span style={labelStyle}>Destaque da semana</span>
            {featured?.published_at && (
              <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{formatDate(featured.published_at)}</span>
            )}
          </div>
        </div>
      </div>

      <div style={container}>
        {/* ── Grid principal ────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40, padding: '28px 0 32px', borderBottom: '1px solid var(--border)' }}>
          {/* Featured */}
          {featured ? (
            <FeaturedPost post={featured} score={featuredScore} />
          ) : (
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>Nenhum destaque publicado ainda.</p>
          )}

          {/* Sidebar */}
          <div>
            <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--foreground)' }}>Sobre o Regrista</p>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                Julio — regrista convicto. Reviews honestas, regras sem mistério e opinião sem papas na língua.
              </p>
            </div>
            <p style={{ ...labelStyle, marginBottom: 4 }}>Recentes</p>
            {sidebarItems.map(p => <SidebarItem key={p.id} post={p} />)}
          </div>
        </div>

        {/* ── Como Jogar ───────────────────────────────────── */}
        {howToPlayGuides.length > 0 && (
          <div style={{ padding: '28px 0 32px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <p style={labelStyle}>Como Jogar — guias de regras</p>
              <Link href="/como-jogar" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Ver todos →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {howToPlayGuides.map(p => <HowToPlayCard key={p.id} post={p} />)}
            </div>
          </div>
        )}

        {/* ── Últimos reviews ──────────────────────────────── */}
        {latestReviews.length > 0 && (
          <div style={{ padding: '28px 0 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <p style={labelStyle}>Últimos reviews</p>
              <Link href="/reviews" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Ver todos →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {latestReviews.map(r => <ReviewCard key={r.id} post={r} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
