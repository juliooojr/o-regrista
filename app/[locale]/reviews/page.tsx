export const revalidate = 300 // ISR: revalida a cada 5 min em produção
import { getReviews } from '@/lib/content'
import type { Metadata } from 'next'
import { PageHeader, ReviewCard, sectionLabel } from '@/components/content/shared'

export const metadata: Metadata = {
  title: 'Reviews | O Regrista',
  description: 'Análises honestas de jogos de tabuleiro, com sub-scores por critério.',
}

const SCORE_RANGES = [
  { label: 'Obra-prima', min: 9.5, color: '#16a34a' },
  { label: 'Excelente',  min: 9.0, color: '#22c55e' },
  { label: 'Muito bom',  min: 7.5, color: '#ca8a04' },
  { label: 'Bom',        min: 6.0, color: '#78716c' },
  { label: 'Mediano',    min: 4.0, color: '#9ca3af' },
  { label: 'Fraco',      min: 0,   color: '#dc2626' },
]

export default async function ReviewsPage() {
  const reviews = await getReviews(50)
  const container = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

  return (
    <div>
      <PageHeader title="Reviews" count={reviews.length} unit="reviews" />

      <div style={container}>
        {/* Legenda de scores */}
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap' as const, marginBottom: 32,
          padding: '12px 16px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)',
        }}>
          <span style={{ ...sectionLabel, alignSelf: 'center', marginRight: 4 }}>Escala:</span>
          {SCORE_RANGES.map(r => (
            <span key={r.label} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: r.color }} />
              <span style={{ color: 'var(--muted)' }}>{r.label}</span>
              <span style={{ color: 'var(--muted-foreground)', fontSize: 11 }}>≥{r.min}</span>
            </span>
          ))}
        </div>

        {/* Grid de reviews */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, paddingBottom: 48 }}>
          {reviews.map(r => <ReviewCard key={r.id} post={r} />)}
        </div>
      </div>
    </div>
  )
}
