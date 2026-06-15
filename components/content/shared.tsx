// Componentes e helpers reutilizados em todas as páginas de conteúdo

import Link from 'next/link'
import type { Post, PostType, ReviewFull } from '@/lib/content'

// ─── constants ──────────────────────────────────────────────────────────────

export const TYPE_LABEL: Record<PostType, string> = {
  review: 'Review',
  article: 'Artigo',
  top10: 'Top 10',
  'how-to-play': 'Como Jogar',
}

export const TYPE_STYLE: Record<PostType, { bg: string; color: string }> = {
  review:        { bg: '#FAEEDA', color: '#633806' },
  article:       { bg: '#EAF3DE', color: '#173404' },
  top10:         { bg: '#E6F1FB', color: '#042C53' },
  'how-to-play': { bg: '#EEEDFE', color: '#26215C' },
}

// ─── helpers ────────────────────────────────────────────────────────────────

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function scoreColor(score: number) {
  if (score >= 9)   return 'var(--success)'
  if (score >= 7.5) return 'var(--accent)'
  if (score >= 6)   return 'var(--foreground)'
  if (score >= 4)   return 'var(--muted)'
  return 'var(--error)'
}

export const sectionLabel = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.09em',
  textTransform: 'uppercase' as const,
  color: 'var(--muted)',
}

/** Gera cor placeholder determinística a partir de uma string (slug/título) */
function placeholderColor(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  }
  return `hsl(${Math.abs(h) % 360}, 28%, 30%)`
}

// ─── components ─────────────────────────────────────────────────────────────

export function TypeBadge({ type }: { type: PostType }) {
  const s = TYPE_STYLE[type]
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.07em',
      textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4,
      background: s.bg, color: s.color,
    }}>
      {TYPE_LABEL[type]}
    </span>
  )
}

export function GameCover({
  coverUrl, label, width, height,
}: {
  coverUrl?: string | null
  label: string
  width?: number | string
  height: number | string
}) {
  if (coverUrl) {
    return (
      <div style={{ width: width ?? '100%', height, flexShrink: 0, borderRadius: 6, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverUrl} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )
  }
  return (
    <div style={{
      width: width ?? '100%', height, flexShrink: 0, borderRadius: 6,
      background: placeholderColor(label), display: 'flex', alignItems: 'flex-end', overflow: 'hidden',
    }}>
      <span style={{
        width: '100%', padding: '6px 8px', background: 'rgba(0,0,0,0.45)',
        color: '#fff', fontSize: 10, fontWeight: 600, lineHeight: 1.2, letterSpacing: '0.03em',
      }}>
        {label}
      </span>
    </div>
  )
}

export function ReviewCard({ post }: { post: ReviewFull }) {
  return (
    <Link href={`/reviews/${post.slug}`} style={{
      textDecoration: 'none', color: 'inherit', border: '1px solid var(--border)',
      borderRadius: 10, overflow: 'hidden', display: 'block',
      background: 'var(--surface-elevated)', transition: 'border-color 0.15s',
    }}>
      <GameCover coverUrl={post.cover_url} label={post.game?.name ?? post.title_pt} height={120} />
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
        <p style={{
          fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 10,
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

export function HowToPlayCard({ post }: { post: Post }) {
  return (
    <Link href={`/como-jogar/${post.slug}`} style={{
      textDecoration: 'none', color: 'inherit', border: '1px solid var(--border)',
      borderRadius: 10, overflow: 'hidden', display: 'block', background: 'var(--surface-elevated)',
    }}>
      <GameCover coverUrl={post.cover_url} label={post.title_pt} height={120} />
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

// Cabeçalho de seção reutilizável
export function PageHeader({ title, count, unit }: { title: string; count?: number; unit?: string }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 0 0', marginBottom: 32 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 0 12px', borderBottom: '2px solid var(--foreground)',
        }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: '0.04em', color: 'var(--foreground)', margin: 0 }}>
            {title}
          </h1>
          {count !== undefined && (
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
              {count} {unit ?? 'publicações'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
