# O Regrista — TASKS

## Sessão 10 — Pendente

*(nenhum item pendente desta sessão)*

## Backlog (por prioridade)

## Backlog (por prioridade)

- [ ] **Analytics** — pesquisar opções (Plausible, Umami, Vercel Analytics, Google Analytics) — avaliar custo, privacidade, facilidade de integração com Next.js 15
- [ ] **Deploy na Vercel** — configurar env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`), região `gru1` já configurada em `vercel.json`
- [ ] **Markdown** — renderizar `content_pt` nas páginas `/como-jogar/[slug]` e `/artigos/[slug]` (avaliar `marked`, `remark` ou `@next/mdx`)
- [ ] **Admin/CMS** — interface básica para publicar posts sem abrir o Supabase Studio
- [ ] **PT/EN switcher** — funcional no Header (next-intl `useRouter` + `useLocale`)
- [ ] **Reviews** — escrever conteúdo real para os jogos do top 10
- [ ] **Como Jogar** — criar guias reais de regras

## Concluído

### 2026-06-19 (sessão 10)
- [x] **Top 10 Party Games** — 10 jogos definidos pelo Julio, dados oficiais coletados via BGG, SQL gerado
  - `supabase/top10_party_games_seed.sql` — UPDATE Codenames (image_url) + INSERT 9 jogos novos + repopula `top10_items` da lista `top-10-party-games`
  - Jogos: Codenames, Passaporte Mundo, Flip 7, Citadels, Telestrations, Cabanga!, BANG!, Dobble, Imagem & Ação, Exploding Kittens
  - IDs de jogos alocados: `000...0022` a `000...0030`
  - Imagens: todas via `cf.geekdo-images.com` (já liberado no `next.config.ts`)
  - **Próximo passo manual:** executar `top10_party_games_seed.sql` no Supabase SQL Editor

### 2026-06-19 (sessão 9)
- [x] **Responsividade completa** — todas as páginas adaptadas para mobile/tablet
  - `app/globals.css` — classes responsivas: `.home-main-grid`, `.page-sidebar-grid`, `.sidebar-sticky`, `.card-grid-3`, `.card-grid-4`, `.featured-row`, `.featured-cover`, `.header-inner`, `.header-nav`, `.featured-guide-row`, `.featured-cover-sm`, `.top10-item`, `.top10-info`, `.stats-grid`
  - `app/[locale]/page.tsx` — homepage grid, featured post, cards
  - `app/[locale]/top10/page.tsx` — sidebar grid + itens do ranking (infos abaixo da capa no mobile)
  - `app/[locale]/reviews/page.tsx` — card grid 3 colunas
  - `app/[locale]/reviews/[slug]/page.tsx` — sidebar grid
  - `app/[locale]/como-jogar/page.tsx` — featured guide row + card grid 4 colunas
  - `app/[locale]/como-jogar/[slug]/page.tsx` — sidebar grid
  - `app/[locale]/sobre/page.tsx` — sidebar grid + stats grid
  - `components/layout/Header.tsx` — nav em segunda linha scrollável no mobile
  - Breakpoints: ≤768px (tablet) e ≤480px (mobile estreito)
- [x] **Favicon** — `favicon.png` (meeple lendo livro) convertido e aplicado
  - `app/favicon.ico` — ICO multi-size (16, 32, 48px) gerado via Pillow
  - `app/icon.png` — 512×512px PNG para apple-touch-icon e ícones modernos
  - Next.js App Router serve ambos automaticamente sem configuração adicional

### 2026-06-18 (sessão 8)
- [x] `react-markdown` instalado (v10) — renderização de markdown nas reviews
- [x] `app/[locale]/reviews/[slug]/page.tsx` — markdown com texto justificado, h2 estilizados, remoção do destaque do excerpt
- [x] `app/[locale]/reviews/[slug]/page.tsx` — sub-scores substituídos por estrelas (⭐/☆, escala 1–5) com novos critérios
- [x] `app/[locale]/reviews/[slug]/page.tsx` — imagem com `height: auto` (sem crop), ficha técnica com gap, "Veredito" corrigido
- [x] `supabase/review_shackleton_base.sql` — primeira review publicada: Shackleton Base, nota 10.0

### 2026-06-16 (sessão 6)
- [x] `app/[locale]/sobre/page.tsx` — bio completa, avatar Supabase Storage, stats dinâmicos, WhatsApp
- [x] `app/[locale]/top10/page.tsx` — lista principal + sidebar com outras listas
- [x] `app/[locale]/top10/[slug]/page.tsx` — página dinâmica para qualquer lista
- [x] `supabase/migrations/002_game_ratings.sql` — colunas bgg_rating, ludopedia_rating, ludopedia_url
- [x] `supabase/top10_seed.sql` — 10 jogos com imagens BGG, notas reais, descritivos do Julio
- [x] `components/content/shared.tsx` — GameCover com objectFit: cover
- [x] `components/layout/Footer.tsx` — "por Julio Jr."
- [x] `lib/content.ts` — getSiteStats(), getTop10BySlug(), campos ludopedia

### 2026-06-14 (sessões 1–4)
- [x] Scaffold completo: Next.js 15, TypeScript, App Router, next-intl, Tailwind v4
- [x] Supabase conectado — migration + seed executados
- [x] Homepage + Reviews + Artigos + Como Jogar + Sobre — conectados ao banco
- [x] Arquivos de documentação: BRAIN.md, DESIGN.md, AGENTS.md, SCHEMA.md
- [x] Header PT/EN switcher (visual), sitemap dinâmico, generateMetadata em todas as rotas
