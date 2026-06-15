// Exibe a nota com cor baseada no range
type Props = { score: number; size?: 'sm' | 'lg' }

function getScoreColor(score: number): string {
  if (score >= 9.0) return 'var(--success)'
  if (score >= 7.5) return 'var(--accent)'
  if (score >= 6.0) return 'var(--foreground)'
  if (score >= 4.0) return 'var(--muted)'
  return 'var(--error)'
}

export default function ScoreBadge({ score, size = 'sm' }: Props) {
  const fontSize = size === 'lg' ? 32 : 15
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
      fontSize,
      color: getScoreColor(score),
    }}>
      {score.toFixed(1)}
    </span>
  )
}
