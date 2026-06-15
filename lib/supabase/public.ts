/**
 * Cliente Supabase público — sem cookies, para leitura de dados públicos.
 * O RLS garante que só posts com status='published' são retornados para a anon key.
 */
import { createClient } from '@supabase/supabase-js'

export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      '[Supabase] Variáveis de ambiente não encontradas.\n' +
      'Verifique se o arquivo .env.local existe na raiz do projeto e contém:\n' +
      '  NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co\n' +
      '  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...'
    )
  }

  return createClient(url, key)
}
