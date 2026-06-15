# Prompt de continuidade — O Regrista

Cole este prompt no início de uma nova janela para retomar o projeto.

---

Estou trabalhando no projeto **O Regrista** — site pessoal de boardgames em Next.js 15.
Leia os arquivos de documentação nesta ordem antes de qualquer coisa:

1. `BRAIN.md` — visão, stack, status atual
2. `AGENTS.md` — regras de código e convenções
3. `DESIGN.md` — paleta, tipografia, componentes
4. `SCHEMA.md` — banco de dados Supabase
5. `TASKS.md` — o que está pendente e o que foi feito

## Estado atual (2026-06-14, sessão 3)

### ✅ Concluído
- Scaffold completo: Next.js 15, TypeScript, App Router, next-intl, Tailwind v4
- Supabase conectado e funcionando:
  - Projeto ID: `zvuwwlzlmnpzlwxfzfrd`, região `sa-east-1`
  - `.env.local` com URL e anon key corretos
  - Migration + seed executados (7 jogos, 10 posts, 5 reviews com sub-scores)
- Todas as páginas públicas conectadas ao banco (zero mock data):
  - `app/[locale]/page.tsx` — homepage com featured post + sidebar + reviews + como-jogar
  - `app/[locale]/reviews/page.tsx` — listagem
  - `app/[locale]/reviews/[slug]/page.tsx` — detalhe com sub-scores e ficha técnica
  - `app/[locale]/artigos/page.tsx` — listagem
  - `app/[locale]/como-jogar/page.tsx` — listagem
  - `app/[locale]/sobre/page.tsx` — bio + sidebar com últimas reviews
- Turbopack ativo (`next dev --turbo`)
- `export const revalidate = 300` em todas as páginas (ISR 5min)

### Arquitetura de dados
- Queries: `lib/content.ts` — usa `cache()` do React + `createPublicClient()` de `lib/supabase/public.ts`
- **NÃO usar** `unstable_cache` (incompatível com `cookies()`)
- **NÃO importar** de `lib/mock.ts`

### 🔜 Próximos passos (por prioridade)
1. PT/EN switcher funcional no Header (`useRouter` + `useLocale` do next-intl)
2. `/como-jogar/[slug]` — página de detalhe de guia de regras
3. `/artigos/[slug]` — página de detalhe de artigo
4. `/top10/[slug]` — ranking interativo com itens do banco
5. `generateMetadata` em cada rota pública
6. `app/sitemap.ts` dinâmico
7. Deploy na Vercel

## Comando para rodar
```bash
cd "C:\Users\Julio Jr\Desktop\o-regrista"
npm run dev
```
Abre em http://localhost:3000
