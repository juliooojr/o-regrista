import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed', // PT sem prefixo, /en/ para inglês
  localeDetection: false,     // não redireciona baseado no Accept-Language do browser
})
