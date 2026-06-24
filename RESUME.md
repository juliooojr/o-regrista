# O Regrista — Resume para próxima sessão
# Objetivo: criar a segunda review do site

**Data:** 2026-06-24 | **Última sessão:** 11

---

## Contexto rápido

Site pessoal de boardgame reviews em **Next.js 15** + **Supabase** + **next-intl**.
Produção: https://o-regrista.vercel.app
Repositório: https://github.com/juliooojr/o-regrista

Leia os docs nesta ordem: `BRAIN.md` → `AGENTS.md` → `DESIGN.md` → `SCHEMA.md` → `TASKS.md`

---

## O que foi feito na sessão 11 (hoje)

- **Fix crítico em produção:** todas as rotas `[slug]` davam 500. Root cause: `[locale]/layout.tsx` precisava de `generateStaticParams` (padrão next-intl). Corrigido no commit `91bfa3d`.
- **Top 10 Party Games:** código da página pronto, SQL gerado. **SQL ainda não foi executado em produção** (arquivo: `supabase/top10_party_games_seed.sql`).

---

## Estado atual da review existente

Existe **uma review publicada**: Shackleton Base, nota 10.0.

**Estrutura do SQL de uma review** (referência para criar a nova):

```sql
-- 1. Inserir o jogo em `games`
INSERT INTO games (id, name, name_pt, bgg_id, image_url,
  min_players, max_players, min_duration, max_duration, min_age,
  year, designer, weight, bgg_rating, bgg_rank,
  ludopedia_rating, ludopedia_url, categories, mechanics)
VALUES ('UUID', 'Nome BGG', 'Nome PT', BGG_ID, 'https://cf.geekdo-images.com/...',
  MIN, MAX, MIN_DUR, MAX_DUR, MIN_AGE,
  ANO, 'Designer', WEIGHT, BGG_RATING, BGG_RANK,
  LUDO_RATING, 'https://ludopedia.com.br/jogo/slug',
  ARRAY['categoria'], ARRAY['mecanica'])
ON CONFLICT (id) DO UPDATE SET ...;

-- 2. Inserir o post em `posts`
INSERT INTO posts (id, slug, type, status,
  title_pt, excerpt_pt, content_pt,
  cover_url, reading_time, featured, published_at)
VALUES ('UUID', 'review-slug', 'review', 'published',
  'Título da Review | O Regrista',
  'Frase de resumo para cards e SEO',
  $$ Markdown completo aqui $$,
  'URL da imagem de capa', LEITURA_MIN, false, NOW());

-- 3. Inserir a review em `reviews`
INSERT INTO reviews (id, post_id, game_id, score, score_components, verdict, recommended_players)
VALUES ('UUID', 'POST_UUID', 'GAME_UUID', NOTA,
  '{"interacao": N, "variabilidade": N, "profundidade": N, "iconografia": N, "vontade": N}',
  'Frase de veredicto', 'X–Y jogadores');
```

**UUIDs disponíveis para nova review:**
- Game: `00000000-0000-0000-0000-000000000031` (próximo livre)
- Post: `10000000-0000-0000-0000-000000000031`
- Review: `30000000-0000-0000-0000-000000000002`

---

## Estrutura da página de review

`app/[locale]/reviews/[slug]/page.tsx` — **não editar**, já está pronta e funcional.

O que a página renderiza:
- Capa do jogo (`cover_url` do post, fallback para `game.image_url`)
- Score com cor (`scoreColor`) em JetBrains Mono
- Sub-scores em estrelas ⭐ (5 critérios: interação, variabilidade, profundidade, iconografia, vontade)
- Conteúdo `content_pt` em **react-markdown** com estilo justificado
- Ficha técnica: jogadores, duração, ano, designer, peso, BGG link
- Veredito + jogadores recomendados
- Sidebar: últimas 3 reviews

---

## Score — critérios e escala

| Critério | Descrição |
|----------|-----------|
| `interacao` | Quão dinâmica e envolvente é a interação entre jogadores |
| `variabilidade` | Reconfigurabilidade, replay value |
| `profundidade` | Complexidade estratégica vs. peso da caixa |
| `iconografia` | Clareza visual, componentes, iconografia |
| `vontade` | Vontade de jogar de novo imediatamente |

Nota geral (`score`): 0.0–10.0, uma casa decimal.
Sub-scores: escala 1–5 (estrelas). Exemplo: `"interacao": 4` = 4 estrelas de 5.

Cor automática do score principal:
- ≥ 9.0 → verde (`--success`)
- ≥ 7.5 → accent
- ≥ 6.0 → foreground
- ≥ 4.0 → muted
- < 4.0 → vermelho (`--error`)

---

## Fluxo para criar uma nova review

1. **Escolher o jogo** com Julio
2. **Pesquisar dados oficiais** no BGG (bgg_id, imagem, weight, rating, rank, designer, ano, jogadores)
3. **Pesquisar na Ludopedia** (rating, URL)
4. **Julio escreve ou aprova** o conteúdo em markdown
5. **Montar o SQL** seguindo o padrão acima
6. **Julio executa o SQL** no Supabase SQL Editor de produção
7. **Verificar** em https://o-regrista.vercel.app/reviews/[slug]

---

## Pendências paralelas (não bloqueiam a review)

- [ ] Executar `supabase/top10_party_games_seed.sql` no Supabase (Top 10 Party Games)
- [ ] Analytics (backlog)
- [ ] PT/EN switcher funcional (backlog)

---

## Convenções importantes

- Imagens de jogos: **sempre de `cf.geekdo-images.com`** (já liberado no `next.config.ts`)
- Slugs: kebab-case, ex: `review-wingspan`, `review-brass-birmingham`
- Status inicial: `published` (não `draft`)
- `featured: false` para reviews novas (só o Shackleton Base é featured)
- Conteúdo `content_pt`: markdown, tom pessoal e direto do Julio
- Estilos: **inline `style={}`**, sem classes Tailwind no JSX
- Queries: sempre via `lib/content.ts`, nunca direto no componente
