import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artigos | O Regrista',
  description: 'Textos editoriais e opiniões sobre o mundo dos boardgames.',
}

export default function ArtigosPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <p style={{ fontSize: 40, marginBottom: 16 }}>🚧</p>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--foreground)', marginBottom: 8 }}>
        Em breve
      </h1>
      <p style={{ fontSize: 14, color: 'var(--muted)' }}>
        Os artigos estão chegando. Volte em breve!
      </p>
    </div>
  )
}
