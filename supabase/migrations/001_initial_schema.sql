-- ============================================================
-- O Regrista — Migration 001: Schema inicial
-- Execute no Supabase SQL Editor (Settings → SQL Editor)
-- ============================================================

-- ─── Extensions ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ─── Enum types ──────────────────────────────────────────────────────────────
CREATE TYPE post_type   AS ENUM ('review', 'article', 'top10', 'how-to-play');
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');


-- ─── games ───────────────────────────────────────────────────────────────────
-- Catálogo de jogos. Serve como fonte de dados para reviews e top10.
CREATE TABLE games (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          text NOT NULL,
  name_pt       text,                          -- nome em português (se diferente)
  bgg_id        integer UNIQUE,                -- ID no BoardGameGeek para sync
  image_url     text,                          -- capa do jogo
  min_players   integer CHECK (min_players >= 1),
  max_players   integer CHECK (max_players >= 1),
  min_duration  integer CHECK (min_duration >= 0),  -- minutos
  max_duration  integer CHECK (max_duration >= 0),
  min_age       integer CHECK (min_age >= 0),
  year          integer,
  designer      text,
  publisher     text,
  weight        numeric(3,2) CHECK (weight BETWEEN 1 AND 5),  -- escala BGG (1-5)
  bgg_rating    numeric(4,2),                  -- média BGG (atualizar via CRON)
  bgg_rank      integer,                       -- posição no rank BGG
  categories    text[],                        -- ex: ['eurogame', 'deckbuilding']
  mechanics     text[],                        -- ex: ['worker placement', 'drafting']
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE games IS 'Catálogo de jogos referenciados em reviews, top10 e como-jogar.';


-- ─── posts ───────────────────────────────────────────────────────────────────
-- Tabela central de conteúdo. Suporta todos os tipos de post.
CREATE TABLE posts (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          text NOT NULL UNIQUE,          -- URL: /reviews/ark-nova-review
  type          post_type NOT NULL,
  status        post_status NOT NULL DEFAULT 'draft',

  -- Conteúdo bilíngue (PT é obrigatório; EN é opcional)
  title_pt      text NOT NULL,
  title_en      text,
  excerpt_pt    text,                          -- resumo para cards e SEO
  excerpt_en    text,
  content_pt    text,                          -- corpo (Markdown)
  content_en    text,

  -- Metadata
  cover_url     text,                          -- Supabase Storage URL
  reading_time  integer CHECK (reading_time > 0),  -- minutos estimados de leitura
  featured      boolean NOT NULL DEFAULT false,    -- aparece no destaque da home
  author_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Timestamps
  published_at  timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE posts IS 'Conteúdo editorial: reviews, artigos, top10 e guias de regras.';
COMMENT ON COLUMN posts.featured IS 'Se true, pode aparecer no destaque principal da home.';


-- ─── reviews ─────────────────────────────────────────────────────────────────
-- Dados específicos de posts do tipo "review".
CREATE TABLE reviews (
  id                   uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id              uuid NOT NULL UNIQUE REFERENCES posts(id) ON DELETE CASCADE,
  game_id              uuid NOT NULL REFERENCES games(id) ON DELETE RESTRICT,
  score                numeric(3,1) NOT NULL CHECK (score BETWEEN 0 AND 10),
  score_components     jsonb,
  -- Exemplo de score_components:
  -- {"componentes": 9.0, "mecanica": 8.5, "interacao": 8.0, "replay": 9.0, "curva": 7.5}
  verdict              text,                   -- frase curta de veredicto
  recommended_players  text,                   -- ex: '2-3' (melhor número de jogadores)
  created_at           timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE reviews IS 'Dados de nota e avaliação. Sempre vinculada a um post de tipo review.';


-- ─── top10_lists ─────────────────────────────────────────────────────────────
-- Metadados de uma lista Top 10 (vinculada a um post).
CREATE TABLE top10_lists (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id     uuid NOT NULL UNIQUE REFERENCES posts(id) ON DELETE CASCADE,
  updated_at  timestamptz NOT NULL DEFAULT now()
);


-- ─── top10_items ─────────────────────────────────────────────────────────────
-- Cada jogo dentro de uma lista Top 10, com posição e histórico.
CREATE TABLE top10_items (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id      uuid NOT NULL REFERENCES top10_lists(id) ON DELETE CASCADE,
  game_id      uuid NOT NULL REFERENCES games(id) ON DELETE RESTRICT,
  position     integer NOT NULL CHECK (position >= 1),
  prev_position integer,                        -- posição anterior (NULL = novo)
  notes_pt     text,                            -- comentário sobre este jogo na lista
  notes_en     text,
  created_at   timestamptz NOT NULL DEFAULT now(),

  UNIQUE (list_id, position),
  UNIQUE (list_id, game_id)
);

COMMENT ON TABLE top10_items IS 'Jogos rankeados dentro de uma lista Top 10. prev_position NULL = estreante.';


-- ─── Timestamps automáticos ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_games_updated_at
  BEFORE UPDATE ON games
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ─── Índices ─────────────────────────────────────────────────────────────────
-- Consultas frequentes pela aplicação
CREATE INDEX idx_posts_slug          ON posts (slug);
CREATE INDEX idx_posts_type_status   ON posts (type, status, published_at DESC);
CREATE INDEX idx_posts_featured      ON posts (featured) WHERE featured = true;
CREATE INDEX idx_posts_published_at  ON posts (published_at DESC) WHERE status = 'published';
CREATE INDEX idx_games_bgg_id        ON games (bgg_id) WHERE bgg_id IS NOT NULL;
CREATE INDEX idx_reviews_post_id     ON reviews (post_id);
CREATE INDEX idx_reviews_game_id     ON reviews (game_id);
CREATE INDEX idx_top10_items_list    ON top10_items (list_id, position);


-- ─── Row Level Security (RLS) ─────────────────────────────────────────────────
-- Habilita RLS em todas as tabelas
ALTER TABLE games       ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews     ENABLE ROW LEVEL SECURITY;
ALTER TABLE top10_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE top10_items ENABLE ROW LEVEL SECURITY;

-- LEITURA PÚBLICA: qualquer pessoa (inclusive anônimos) pode ler conteúdo publicado
CREATE POLICY "public_read_games"
  ON games FOR SELECT
  USING (true);

CREATE POLICY "public_read_published_posts"
  ON posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "public_read_reviews"
  ON reviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM posts p
      WHERE p.id = reviews.post_id AND p.status = 'published'
    )
  );

CREATE POLICY "public_read_top10_lists"
  ON top10_lists FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM posts p
      WHERE p.id = top10_lists.post_id AND p.status = 'published'
    )
  );

CREATE POLICY "public_read_top10_items"
  ON top10_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM top10_lists tl
      JOIN posts p ON p.id = tl.post_id
      WHERE tl.id = top10_items.list_id AND p.status = 'published'
    )
  );

-- ESCRITA: apenas usuário autenticado (o admin — você) pode inserir/atualizar/deletar
CREATE POLICY "auth_write_games"
  ON games FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_write_posts"
  ON posts FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_write_reviews"
  ON reviews FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_write_top10_lists"
  ON top10_lists FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_write_top10_items"
  ON top10_items FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- LEITURA DE RASCUNHOS: admin pode ver seus próprios drafts
CREATE POLICY "auth_read_own_drafts"
  ON posts FOR SELECT
  USING (
    status != 'published' AND auth.role() = 'authenticated'
  );
