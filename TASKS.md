# O Regrista — TASKS

## Sessão 8

- [ ] **Top 10 Party Games** — Julio define os jogos → buscar imagens + notas via Chrome MCP no BGG e Ludopedia → inserir no `top10_seed.sql` e executar no Supabase
- [ ] **Favicon** — converter `favicon.png` (raiz do projeto) para `.ico` e substituir `app/favicon.ico` atual pelo personalizado

## Backlog (por prioridade)

- [ ] **Analytics** — pesquisar opções (Plausible, Umami, Vercel Analytics, Google Analytics) — avaliar custo, privacidade, facilidade de integração com Next.js 15
- [ ] **Deploy na Vercel** — configurar env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`), região `gru1` já configurada em `vercel.json`
- [ ] **Markdown** — renderizar `content_pt` nas páginas `/como-jogar/[slug]` e `/artigos/[slug]` (avaliar `marked`, `remark` ou `@next/mdx`)
- [ ] **Admin/CMS** — interface básica para publicar posts sem abrir o Supabase Studio
- [ ] **PT/EN switcher** — funcional no Header (next-intl `useRouter` + `useLocale`)
- [ ] **Reviews** — escrever conteúdo real para os jogos do top 10
- [ ] **Como Jogar** — criar guias reais de regras

## Concluído

### 2026-06-17 (sessão 7)
- [x] `react-markdown` instalado (v10) — renderização de markdown nas reviews
- [x] `app/[locale]/reviews/[slug]/page.tsx` — markdown com texto justificado, h2 estilizados, remoção do destaque do excerpt
- [x] `app/[locale]/reviews/[slug]/page.tsx` — sub-scores substituídos por estrelas (⭐/☆, escala 1–5) com novos critérios
- [x] `app/[locale]/reviews/[slug]/page.tsx` — imagem com `height: auto` (sem crop), ficha técnica com gap, "Veredito" corrigido
- [x] `supabase/review_shackleton_base.sql` — primeira review publicada: Shackleton Base, nota 10.0

### 2026-06-16 (sessão 6)
- [x] `app/[locale]/sobre/page.tsx` — bio completa (7 parágrafos do Julio), avatar Supabase Storage, stats dinâmicos (reviews/guias do DB), ANOS_NO_HOBBY=11, JOGOS_NA_COLECAO=75, WhatsApp verde
- [x] `app/[locale]/top10/page.tsx` — lista "Meu Top 10 de todos os tempos" aberta + sidebar com outras listas
- [x] `app/[locale]/top10/[slug]/page.tsx` — página dinâmica para qualquer lista
- [x] `supabase/migrations/002_game_ratings.sql` — colunas `bgg_rating`, `ludopedia_rating`, `ludopedia_url` na tabela `games`
- [x] `supabase/top10_seed.sql` — 10 jogos com imagens BGG, notas reais (buscadas no BGG e Ludopedia em 16/06), descritivos do Julio
- [x] `components/content/shared.tsx` — `GameCover` com `objectFit: cover` (preenche quadrado sem tarjas)
- [x] `components/layout/Footer.tsx` — "por Julio Jr."
- [x] `lib/content.ts` — `getSiteStats()`, `getTop10BySlug()`, campos `ludopedia_rating`/`ludopedia_url` no tipo `Game`

### 2026-06-14 (sessão 4)
- [x] `lib/i18n/navigation.ts` — `createNavigation` do next-intl
- [x] `components/layout/Header.tsx` — PT/EN switcher (visual, não funcional ainda)
- [x] `app/[locale]/artigos/[slug]/page.tsx` — detalhe com sidebar
- [x] `app/[locale]/como-jogar/[slug]/page.tsx` — detalhe com sidebar
- [x] `app/[locale]/top10/[slug]/page.tsx` — ranking interativo (ChangeBadge, WeightBar)
- [x] `generateMetadata` em todas as rotas públicas
- [x] `app/sitemap.ts` — dinâmico a partir de `getAllPublishedPosts()`

### 2026-06-14 (sessões 1–3)
- [x] Scaffold completo: Next.js 15, TypeScript, App Router, next-intl, Tailwind v4
- [x] Supabase conectado — migration + seed executados
- [x] Homepage + Reviews + Artigos + Como Jogar + Sobre — todos conectados ao banco
- [x] Arquivos de documentação: BRAIN.md, DESIGN.md, AGENTS.md, SCHEMA.md
