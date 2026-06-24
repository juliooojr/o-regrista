# O Regrista — BRAIN

## Visão do projeto
Site pessoal público de conteúdo sobre boardgames: reviews com nota, artigos editoriais, listas top 10 e guias de regras (Como Jogar). Área admin protegida para publicar conteúdo. O objetivo é ser referência em PT-BR com alcance em inglês, com a identidade do Julio como regrista — alguém que explica regras com clareza e analisa jogos com honestidade.

## Stack
- **Framework:** Next.js 15 com App Router
- **Linguagem:** TypeScript (strict, sem `any` explícito)
- **Estilo:** Tailwind CSS v4 + CSS Variables (sem classes no JSX — tudo via `style={}` por ora)
- **Banco:** Supabase (PostgreSQL + Auth + Storage via `@supabase/ssr`)
- **Fontes:** Bebas Neue (display/logo), Inter (corpo), JetBrains Mono (scores)
- **i18n:** next-intl v3 — PT-BR padrão (sem prefixo de URL), `/en/` para inglês
- **Deploy:** Vercel (planejado)

## Tipos de conteúdo
| Tipo | Slug raiz | Tem nota? | Diferencial |
|------|-----------|-----------|-------------|
| `review` | `/reviews` | Sim (0–10) | Sub-scores por critério em JSON |
| `article` | `/artigos` | Não | Editorial, opinião |
| `top10` | `/top10` | Não | Ranking com posição e histórico (↑↓) |
| `how-to-play` | `/como-jogar` | Não | Guia de regras — diferencial do Regrista |

## Status atual do projeto (2026-06-24)
- **Frontend:** Homepage + todas as listagens + review individual — todas conectadas ao Supabase (sem mock data)
- **Banco:** Supabase conectado e funcionando. Projeto ID `zvuwwlzlmnpzlwxfzfrd`, região `sa-east-1`. Migrations + seeds executados. `.env.local` configurado corretamente.
- **Dados em produção:** 22 jogos, 2 reviews publicadas (Shackleton Base 10.0, PARKS 7.0 pendente de SQL)
- **Reviews:** layout com capa na sidebar (quadrada, sem cropping), sub-scores em estrelas, ficha técnica sticky
- **Cards de review:** aspect-ratio 1:1 com objectPosition center top — funciona para imagens quadradas e landscape
- **i18n:** Roteamento configurado; switcher PT/EN no Header ainda é visual-only
- **Deploy:** Vercel ativo em https://o-regrista.vercel.app (deploy automático via git push)

## Acesso
- **Leitura:** público, sem autenticação
- **Escrita/Admin:** apenas usuário autenticado via Supabase Auth
- Rotas públicas: `/`, `/reviews`, `/reviews/[slug]`, `/artigos`, `/artigos/[slug]`, `/top10`, `/top10/[slug]`, `/como-jogar`, `/como-jogar/[slug]`, `/sobre`
- Rotas protegidas (a criar): `/admin`

## Regras de negócio
- Post sempre tem `status: draft | published | archived`. Nunca deletar — apenas arquivar.
- Reviews são vinculadas a um jogo da tabela `games`.
- Score: 0–10, uma casa decimal. Sub-scores por critério em JSONB (`score_components`).
- Top 10 é um post especial com itens rankeados em `top10_items` (posição, prev_position, notas).
- `bgg_id` é opcional mas recomendado para sync com a API do BGG.
- `featured = true` no post → aparece no destaque principal da home.

## Estrutura de pastas
```
app/
  layout.tsx                  — root (inline script anti-flash, suppressHydrationWarning)
  globals.css                 — CSS variables de tema
  [locale]/
    layout.tsx                — NextIntlClientProvider + Header + BoardGameBackground + Footer
    page.tsx                  — Homepage
    reviews/, artigos/, top10/, como-jogar/, sobre/

components/
  layout/   Header, Footer, BoardGameBackground
  content/  shared.tsx (TypeBadge, GameCover, ReviewCard, HowToPlayCard, PageHeader, helpers)

lib/
  content.ts              — tipos TypeScript + queries Supabase (cache React + createPublicClient)
  i18n/routing.ts         — defineRouting
  supabase/public.ts      — cliente público sem cookies (para cache() functions)
  supabase/client.ts      — cliente browser (para uso futuro com auth)
  supabase/server.ts      — cliente SSR com cookies (para uso futuro com auth)

i18n/request.ts, middleware.ts
messages/pt.json, messages/en.json
supabase/migrations/001_initial_schema.sql
supabase/seed.sql
```

## Integração BoardGameGeek (BGG)
- API pública: `https://boardgamegeek.com/xmlapi2`
- Usar para puxar dados de jogos (nome, imagem, jogadores, duração, ano, peso)
- Imagens do BGG: `cf.geekdo-images.com` — já liberado no `remotePatterns` do `next.config.ts`
- Implementar após a tabela `games` estar populada no Supabase

## SEO (planejado)
- `generateMetadata` em cada rota com título, descrição e og:image
- `app/sitemap.ts` dinâmico a partir dos posts publicados
- `app/robots.ts`

## Instrução para IA
Leia este arquivo no início de cada sessão. Para detalhes de design: DESIGN.md. Para banco: SCHEMA.md. Para tarefas pendentes: TASKS.md.

**Supabase:** O banco está conectado. URL: `https://zvuwwlzlmnpzlwxfzfrd.supabase.co`. Todas as queries usam `cache()` do React + `createPublicClient()` de `lib/supabase/public.ts`. NÃO use `unstable_cache` — incompatível com `cookies()`. NÃO importe de `lib/mock.ts` — arquivo pode ser deletado futuramente.
