import type { PostType } from '@/lib/content'

const labels: Record<PostType, { pt: string; en: string; color: string; bg: string }> = {
  review:       { pt: 'Review',      en: 'Review',      bg: '#FAEEDA', color: '#633806' },
  article:      { pt: 'Artigo',      en: 'Article',     bg: '#EAF3DE', color: '#173404' },
  top10:        { pt: 'Top 10',      en: 'Top 10',      bg: '#E6F1FB', color: '#042C53' },
  'how-to-play':{ pt: 'Como Jogar', en: 'How to Play', bg: '#EEEDFE', color: '#26215C' },
}

export default function TypeBadge({ type, locale = 'pt' }: { type: PostType; locale?: string }) {
  const cfg = labels[type]
  const label = locale === 'en' ? cfg.en : cfg.pt
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '3px 8px',
      borderRadius: 4,
      background: cfg.bg,
      color: cfg.color,
    }}>
      {label}
    </span>
  )
}
