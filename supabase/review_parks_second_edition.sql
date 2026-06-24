-- ============================================================
-- O Regrista — Review: PARKS (Second Edition)
-- Sem pré-requisito: game é inserido neste arquivo
-- Cole tudo no Supabase SQL Editor e execute
-- ============================================================


-- ─── 1. Game ─────────────────────────────────────────────────────────────────

INSERT INTO games (
  id, name, name_pt, bgg_id,
  image_url,
  min_players, max_players,
  min_duration, max_duration,
  min_age, year,
  designer, publisher,
  weight, bgg_rating, bgg_rank,
  categories, mechanics
)
VALUES (
  '00000000-0000-0000-0000-000000000031',
  'PARKS (Second Edition)',
  'PARKS (Second Edition)',
  266524,
  'https://cf.geekdo-images.com/hHnw1JGLaEkJXaOv8bm6YQ__opengraph/img/JoTjkpsFBMwufrJXknRBB8kgNLI=/fit-in/1200x630/filters:strip_icc()/pic8660069.jpg',
  1, 5,
  30, 60,
  10, 2024,
  'Henry Audubon',
  'Keymaster Games',
  1.88, 7.56, 650,
  ARRAY['family', 'nature'],
  ARRAY['set collection', 'point-to-point movement', 'modular board', 'variable setup']
)
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  bgg_rating  = EXCLUDED.bgg_rating,
  bgg_rank    = EXCLUDED.bgg_rank;


-- ─── 2. Post ─────────────────────────────────────────────────────────────────

INSERT INTO posts (
  id, slug, type, status,
  title_pt,
  excerpt_pt,
  cover_url,
  content_pt,
  reading_time,
  featured,
  published_at
)
VALUES (
  '10000000-0000-0000-0000-000000000031',
  'parks-review',
  'review',
  'published',

  'PARKS não tenta ser mais do que é — e funciona',

  'Não é nada revolucionário, mas é um jogo que eu jogaria novamente sem pensar duas vezes.',

  'https://cf.geekdo-images.com/hHnw1JGLaEkJXaOv8bm6YQ__opengraph/img/JoTjkpsFBMwufrJXknRBB8kgNLI=/fit-in/1200x630/filters:strip_icc()/pic8660069.jpg',

  E'## 🎯 Poucas ações, mais decisões do que parece\n\nA primeira impressão que PARKS passa é a de um jogo bastante simples. Você anda pela trilha, coleta recursos e tenta visitar parques para fazer pontos.\n\nMas depois de alguns turnos fica claro que o desafio não está em entender as regras. Está em aproveitar bem o pouco que você pode fazer.\n\nAs ações são fáceis de explicar, mas o número de oportunidades durante a partida é bastante limitado. Em vários momentos eu tinha mais de um plano interessante na cabeça, e precisava decidir qual deles abandonar. Quando a rodada termina, a sensação é que ainda havia muita coisa que eu gostaria de ter feito.\n\nBoa parte da estratégia está justamente aí. Maximizar cada ação, encontrar pequenas combinações entre cartas, equipamentos e objetivos e tentar extrair o máximo de um sistema que parece simples à primeira vista.\n\nNão é um jogo profundo, mas oferece decisões suficientes pra manter a partida interessante do começo ao fim.\n\n## 👨‍👩‍👧 Funciona muito bem para diferentes públicos\n\nUma das coisas que mais me chamou atenção foi como PARKS consegue agradar jogadores com níveis de experiência muito diferentes. Na nossa partida, uma criança de seis anos conseguiu acompanhar boa parte do jogo sem grandes dificuldades. Isso acontece porque as ações são intuitivas e o fluxo da partida faz bastante sentido. Você coleta recursos, faz trocas e visita parques.\n\nAo mesmo tempo, os jogadores mais experientes conseguem enxergar oportunidades de otimização que passam despercebidas pra quem está começando.\n\nÉ justamente esse equilíbrio que me parece ser a maior qualidade do jogo. Ele oferece decisões interessantes sem exigir uma explicação longa ou uma curva de aprendizado complicada.\n\n## ⚠️ Não procure profundidade onde ela não existe\n\nAcho que as críticas que PARKS recebe normalmente vem de jogadores acostumados com experiências mais pesadas.\n\nE eu entendo o motivo.\n\nExiste estratégia, existem decisões importantes e existe espaço para otimização. Mas o jogo não tenta competir com eurogames mais densos nem oferecer dezenas de caminhos estratégicos completamente diferentes.\n\nO foco aqui está na acessibilidade e na fluidez da experiência.\n\nQuem procura um familiar com boas decisões provavelmente ficará satisfeito. Quem procura algo para explorar durante dezenas de partidas talvez encontre seus limites relativamente rápido.',

  3,
  false,
  '2026-06-21T00:00:00Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title_pt      = EXCLUDED.title_pt,
  excerpt_pt    = EXCLUDED.excerpt_pt,
  content_pt    = EXCLUDED.content_pt,
  cover_url     = EXCLUDED.cover_url,
  featured      = EXCLUDED.featured,
  status        = EXCLUDED.status,
  reading_time  = EXCLUDED.reading_time,
  published_at  = EXCLUDED.published_at;


-- ─── 3. Review ───────────────────────────────────────────────────────────────

INSERT INTO reviews (
  id, post_id, game_id,
  score,
  score_components,
  verdict,
  recommended_players
)
VALUES (
  '30000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000031',
  '00000000-0000-0000-0000-000000000031',

  7.0,

  '{"interacao": 2, "variabilidade": 2, "profundidade": 2, "iconografia": 5, "vontade": 3}'::jsonb,

  'PARKS não tenta ser mais do que realmente é — não é nada revolucionário, mas é um jogo que eu jogaria novamente sem pensar duas vezes.',

  '2–3'
)
ON CONFLICT (id) DO UPDATE SET
  score            = EXCLUDED.score,
  score_components = EXCLUDED.score_components,
  verdict          = EXCLUDED.verdict;
