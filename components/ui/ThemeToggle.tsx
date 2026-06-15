'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Alternar tema"
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
