import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/lib/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BoardGameBackground from '@/components/layout/BoardGameBackground'
import '@fontsource/bebas-neue'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
import '@fontsource/jetbrains-mono/700.css'

export const metadata: Metadata = {
  title: { default: 'O Regrista', template: '%s | O Regrista' },
  description: 'Reviews, artigos e guias de regras de boardgames por Julio.',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'pt' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <BoardGameBackground />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}
