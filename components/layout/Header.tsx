'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/lib/i18n/navigation'

type Theme = 'light' | 'dark'

export default function Header() {
  const [theme, setTheme] = useState<Theme>('light')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const switchLocale = (next: 'pt' | 'en') => {
    if (next === locale) return
    router.replace(pathname, { locale: next })
  }

  const navLinks = [
    { href: '/reviews',    label: locale === 'en' ? 'Reviews'    : 'Reviews' },
    { href: '/artigos',    label: locale === 'en' ? 'Articles'   : 'Artigos' },
    { href: '/top10',      label: 'Top 10' },
    { href: '/como-jogar', label: locale === 'en' ? 'How to Play': 'Como Jogar' },
    { href: '/sobre',      label: locale === 'en' ? 'About'      : 'Sobre' },
  ]

  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--background)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div className="header-inner">
        <Link href="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.04em', color: 'var(--foreground)', textDecoration: 'none', flexShrink: 0 }}>
          O Regrista
        </Link>

        <nav className="header-nav">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{ color: 'var(--muted)', textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* PT/EN Switcher */}
          <div style={{ border: '1px solid var(--border)', borderRadius: 20, padding: '3px 10px', fontSize: 12, display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              onClick={() => switchLocale('pt')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontWeight: locale === 'pt' ? 700 : 400,
                color: locale === 'pt' ? 'var(--foreground)' : 'var(--muted)',
                fontSize: 12,
              }}
            >
              PT
            </button>
            <span style={{ color: 'var(--border)' }}>|</span>
            <span
              title="Em breve"
              style={{ fontWeight: 400, color: 'var(--border)', fontSize: 12, cursor: 'not-allowed' }}
            >
              EN
            </span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '5px 8px', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}
