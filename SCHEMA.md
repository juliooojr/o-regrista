# O Regrista — SCHEMA

## Setup do banco

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Copie `.env.local.example` → `.env.local` e preencha com as chaves do projeto
3. Abra o SQL Editor no Supabase e execute:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/seed.sql` *(apenas para desenvolvimento)*

---

## Tabelas

### `games`
Catálogo de jogos. Fonte de dados para reviews, top10 e como-jogar.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid PK | Identificador único |
| `name` | text | Nome oficial do jogo |
| `name_pt` | text | Nome em português (quando diferente) |
| `bgg_id` | int UNIQUE | ID no BoardGameGeek |
| `image_url` | text | URL da capa |
| `min_players` | int | Mínimo de jogadores |
| `max_players` | int | Máximo de jogadores |
| `min_duration` | int | Duração mínima (minutos) |
| `max_duration` | int | Duração máxima (minutos) |
| `min_age` | int | Idade mínima recomendada |
| `year` | int | Ano de lançamento |
| `designer` | text | Designer(s) |
| `publisher` | text | Editora |
| `weight` | numeric(3,2) | Complexidade 1.0–5.0 (escala BGG) |
| `bgg_rating` | numeric(4,2) | Média BGG (sincronizar via CRON) |
| `bgg_rank` | int | Posição no ranking geral do BGG |
| `categories` | text[] | ex: `['eurogame', 'cooperative']` |
| `mechanics` | text[] | ex: `['worker placement', 'drafting']` |

---

### `posts`
Tabela central de conteúdo. Tipos: `review`, `article`, `top10`, `how-to-play`.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid PK | Identificador único |
| `slug` | text UNIQUE | URL amigável (kebab-case) |
| `type` | post_type | `review` \| `article` \| `top10` \| `how-to-play` |
| `status` | post_status | `draft` \| `published` \| `archived` |
| `title_pt` | text | Título em português (obrigatório) |
| `title_en` | text | Título em inglês (opcional) |
| `excerpt_pt` | text | Resumo em PT para cards e SEO |
| `excerpt_en` | text | Resumo em EN |
| `content_pt` | text | Corpo do post em Markdown (PT) |
| `content_en` | text | Corpo do post em Markdown (EN) |
| `cover_url` | text | URL da imagem de capa (Supabase Storage) |
| `reading_time` | int | Tempo de leitura estimado em minutos |
| `featured` | boolean | Se `true`, aparece no destaque principal da home |
| `author_id` | uuid FK → auth.users | Autor |
| `published_at` | timestamptz | Data de publicação |

---

### `reviews`
Dados específicos de posts do tipo `review`. Sempre `1:1` com um post.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid PK | |
| `post_id` | uuid FK → posts | Post pai (CASCADE DELETE) |
| `game_id` | uuid FK → games | Jogo avaliado |
| `score` | numeric(3,1) | Nota geral 0.0–10.0 |
| `score_components` | jsonb | Sub-notas por critério |
| `verdict` | text | Frase curta de veredicto |
| `recommended_players` | text | Número ideal de jogadores (ex: "2–3") |

**Exemplo de `score_components`:**
```json
{
  "componentes": 9.0,
  "mecanica": 8.5,
  "interacao": 8.0,
  "replay": 9.0,
  "curva": 7.5
}
```

---

### `top10_lists`
Metadados de uma lista Top 10. `1:1` com um post do tipo `top10`.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid PK | |
| `post_id` | uuid FK → posts | Post pai |
| `updated_at` | timestamptz | Última atualização da lista |

---

### `top10_items`
Cada jogo dentro de uma lista Top 10.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid PK | |
| `list_id` | uuid FK → top10_lists | Lista pai |
| `game_id` | uuid FK → games | Jogo rankeado |
| `position` | int | Posição atual (1 = melhor) |
| `prev_position` | int | Posição anterior (NULL = estreante) |
| `notes_pt` | text | Comentário sobre este jogo na lista (PT) |
| `notes_en` | text | Comentário em EN |

---

## Relacionamentos

```
auth.users
    │
    └──── posts ─────────── reviews ─── games
              └──── top10_lists
                         └──── top10_items ─── games
```

---

## RLS — Resumo das políticas

| Tabela | Leitura anônima | Escrita |
|--------|----------------|---------|
| `games` | Todos | Autenticado |
| `posts` | Apenas `published` | Autenticado |
| `reviews` | Se post published | Autenticado |
| `top10_lists` | Se post published | Autenticado |
| `top10_items` | Se list published | Autenticado |

---

## Índices

```sql
idx_posts_slug           -- busca por slug (página de detalhe)
idx_posts_type_status    -- listagens por tipo
idx_posts_featured       -- destaque da home (partial index)
idx_posts_published_at   -- ordenação cronológica
idx_games_bgg_id         -- sync com BGG
idx_reviews_post_id      -- join reviews → posts
idx_reviews_game_id      -- reviews de um jogo
idx_top10_items_list     -- itens de uma lista ordenados
```

---

## Histórico de alterações

| Data | Alteração |
|------|-----------|
| 2026-06-14 | Schema inicial: posts, games, reviews |
| 2026-06-14 | Adicionado: top10_lists, top10_items, tipos bilíngues, weight, reading_time, featured |
