# O Regrista — Resume para próxima sessão
# Objetivo: criar a terceira review do site

**Data:** 2026-06-24 | **Última sessão:** 12

---

## Contexto rápido

Site pessoal de boardgame reviews em **Next.js 15** + **Supabase** + **next-intl**.
Produção: https://o-regrista.vercel.app
Repositório: https://github.com/juliooojr/o-regrista

Leia os docs nesta ordem: `BRAIN.md` → `AGENTS.md` → `DESIGN.md` → `SCHEMA.md` → `TASKS.md`

---

## O que foi feito na sessão 12 (hoje)

### Review PARKS (Second Edition) — SQL gerado, pronto para publicar
- `supabase/review_parks_second_edition.sql` — game + post + review com nota 7.0
  - Slug: `parks-review`
  - Data: 21/06/2026, reading_time: 3 min
  - Score components: interacao 2, variabilidade 2, profundidade 2, iconografia 5, vontade 3
  - Imagem Second Edition: `pic8660069` (445×445, quadrada)
  - **Ainda não executado em produção**

### Patch Shackleton Base — imagem atualizada
- `supabase/patch_shackleton_image.sql` — UPDATE em `posts` e `games` para a versão quadrada (445×445) do `pic7897060`
- `supabase/review_shackleton_base.sql` e `top10_seed.sql` — URLs corrigidas nos arquivos fonte
- **Ainda não executado em produção**

### Layout das reviews — refatoração visual
- **`components/content/shared.tsx`** — `ReviewCard` redesenhado com `aspect-ratio: 1/1` + `objectPosition: center top`. Sem cropping em nenhum formato de capa.
- **`app/[locale]/reviews/[slug]/page.tsx`** — layout Opção A implementado:
  - Sem hero image no topo do artigo
  - Capa do jogo movida para o **topo da sidebar** (quadrada, sem cropping)
  - Sidebar com `position: sticky`
  - Artigo começa direto no badge → título → data → texto → veredito

---

## Estado atual do banco de produção

| SQL | Status |
|-----|--------|
| `001_initial_schema.sql` | ✅ executado |
| `002_game_ratings.sql` | ✅ executado |
| `top10_seed.sql` | ✅ executado (imagem Shackleton desatualizada até rodar o patch) |
| `review_shackleton_base.sql` | ✅ executado (imagem desatualizada até rodar o patch) |
| `top10_party_games_seed.sql` | ⏳ pendente |
| `patch_shackleton_image.sql` | ⏳ pendente |
| `review_parks_second_edition.sql` | ⏳ pendente |

---

## Reviews publicadas

| Jogo | Nota | Slug | Status |
|------|------|------|--------|
| Shackleton Base | 10.0 | `shackleton-base-review` | ✅ no ar |
| PARKS (Second Edition) | 7.0 | `parks-review` | ⏳ SQL pendente |

---

## UUIDs disponíveis para a próxima review (terceira)

- Game: `00000000-0000-0000-0000-000000000032`
- Post: `10000000-0000-0000-0000-000000000032`
- Review: `30000000-0000-0000-0000-000000000003`

---

## Estrutura da página de review (atual, pós-sessão 12)

`app/[locale]/reviews/[slug]/page.tsx` — layout com sidebar à direita:
- **Artigo (coluna principal):** badge de tipo → nome do jogo → título (h1) → data + leitura → conteúdo markdown → veredito
- **Sidebar (280px, sticky):** capa do jogo quadrada (aspect-ratio 1:1) → sub-scores em estrelas → nota final → ficha técnica

---

## Score — critérios e escala

| Critério | Descrição |
|----------|-----------|
| `interacao` | Quão dinâmica é a interação entre jogadores |
| `variabilidade` | Reconfigurabilidade, replay value |
| `profundidade` | Complexidade estratégica vs. peso da caixa |
| `iconografia` | Clareza visual, componentes, iconografia |
| `vontade` | Vontade de jogar de novo imediatamente |

Nota geral (`score`): 0.0–10.0, uma casa decimal.
Sub-scores: escala 1–5 (estrelas).

---

## Fluxo para criar uma nova review

1. **Escolher o jogo** com Julio
2. **Pesquisar dados oficiais** no BGG (bgg_id, imagem quadrada, weight, rating, rank, designer, ano, jogadores)
3. **Pesquisar na Ludopedia** (rating, URL — apenas para referência, não está no schema)
4. **Julio escreve ou aprova** o conteúdo em markdown (com pequenos erros de sintaxe para soar humano)
5. **Montar o SQL** seguindo o padrão de `review_parks_second_edition.sql`
6. **Julio executa o SQL** no Supabase SQL Editor de produção
7. **Verificar** em https://o-regrista.vercel.app/reviews/[slug]

---

## Convenções importantes

- Imagens de jogos: **sempre de `cf.geekdo-images.com`** (já liberado no `next.config.ts`)
- Preferir imagens **quadradas** (445×445 via `opengraph_left`) — evita cropping na sidebar e nos cards
- Slugs: kebab-case, ex: `review-wingspan`, `parks-review`
- Status inicial: `published` (não `draft`)
- `featured: false` para reviews novas (só o Shackleton Base é featured)
- Conteúdo `content_pt`: markdown, tom pessoal e direto do Julio
- Estilos: **inline `style={}`**, sem classes Tailwind no JSX
- Queries: sempre via `lib/content.ts`, nunca direto no componente
- `ON CONFLICT` dos posts deve incluir: `reading_time`, `published_at`, `cover_url`, `content_pt`, `title_pt`, `excerpt_pt`, `featured`, `status`
