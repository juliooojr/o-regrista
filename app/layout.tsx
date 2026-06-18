import './globals.css'

// Root layout — html/body ficam aqui para o next-intl poder controlar o lang via [locale]
// O data-theme é inicializado antes da hidratação para evitar flash de tema errado
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-theme','light')`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
