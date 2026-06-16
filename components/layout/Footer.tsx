// TODO: Footer com links, redes sociais e créditos
export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
      <p>© {new Date().getFullYear()} O Regrista — por Julio Jr.</p>
    </footer>
  )
}
