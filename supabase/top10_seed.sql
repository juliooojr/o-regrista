-- ============================================================
-- O Regrista — Top 10 de Todos os Tempos (seed completo)
-- PRÉ-REQUISITO: execute migrations/002_game_ratings.sql primeiro
-- Cole tudo no Supabase SQL Editor e execute
-- ============================================================


-- ─── 1. Atualiza jogos existentes com imagem e ratings ───────────────────────

UPDATE games SET
  image_url        = 'https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__opengraph/img/xMvepGsqNnzY6JyUnU7ea11SoiY=/0x2456:3543x4316/fit-in/1200x630/filters:strip_icc()/pic6293412.jpg',
  bgg_rating       = 8.50,
  ludopedia_rating = 9.00,
  ludopedia_url    = 'https://ludopedia.com.br/jogo/ark-nova'
WHERE id = '00000000-0000-0000-0000-000000000002'; -- Ark Nova

UPDATE games SET
  name             = 'Terraforming Mars',
  name_pt          = 'Terraforming Mars',
  image_url        = 'https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__opengraph/img/_V1SiXfiWKPumwUOhTsU24zjaKw=/0x708:1500x1495/fit-in/1200x630/filters:strip_icc()/pic3536616.jpg',
  bgg_rating       = 8.30,
  ludopedia_rating = 9.00,
  ludopedia_url    = 'https://ludopedia.com.br/jogo/terraforming-mars'
WHERE id = '00000000-0000-0000-0000-000000000008'; -- Terraforming Mars

UPDATE games SET
  image_url        = 'https://cf.geekdo-images.com/sZYp_3BTDGjh2unaZfZmuA__opengraph/img/dCW_XJo_64ZlKvVflRgT-W2ZK8c=/0x0:3500x1838/fit-in/1200x630/filters:strip_icc()/pic2437871.jpg',
  bgg_rating       = 8.50,
  ludopedia_rating = 9.00,
  ludopedia_url    = 'https://ludopedia.com.br/jogo/gloomhaven'
WHERE id = '00000000-0000-0000-0000-000000000009'; -- Gloomhaven


-- ─── 2. Insere jogos novos do Top 10 ─────────────────────────────────────────

INSERT INTO games (id, name, name_pt, bgg_id, image_url, min_players, max_players, min_duration, max_duration, min_age, year, designer, weight, categories, mechanics, bgg_rating, ludopedia_rating, ludopedia_url)
VALUES

-- Brass: Birmingham
('00000000-0000-0000-0000-000000000015',
 'Brass: Birmingham', 'Brass: Birmingham', 224517,
 'https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__opengraph/img/9JP25fFDv5TUeo3h0i2ky6xXwQk=/0x249:1200x879/fit-in/1200x630/filters:strip_icc()/pic3490053.jpg',
 2, 4, 60, 120, 14, 2018, 'Gavan Brown, Matt Tolman, Martin Wallace',
 3.91, ARRAY['eurogame', 'economic'], ARRAY['network building', 'hand management'],
 8.60, 9.00, 'https://ludopedia.com.br/jogo/brass-birmingham'),

-- Dune: Imperium – Uprising
('00000000-0000-0000-0000-000000000016',
 'Dune: Imperium – Uprising', 'Dune: Imperium – Uprising', 397598,
 'https://cf.geekdo-images.com/UVUkjMV_Q2paVUIUP30Vvw__opengraph/img/6SOQJAez0x7nLah2c6ih20_RacM=/0x0:3539x1858/fit-in/1200x630/filters:strip_icc()/pic7664424.jpg',
 1, 6, 60, 120, 14, 2023, 'Paul Dennen',
 3.07, ARRAY['eurogame', 'deckbuilding'], ARRAY['worker placement', 'deck building'],
 8.70, 8.80, 'https://ludopedia.com.br/jogo/dune-imperium-uprising'),

-- SETI: Search for Extraterrestrial Intelligence
('00000000-0000-0000-0000-000000000017',
 'SETI: Search for Extraterrestrial Intelligence', 'SETI: Search for Extraterrestrial Intelligence', 418059,
 'https://cf.geekdo-images.com/_BUXOVRDU9g_eRwgpR5ZZw__opengraph/img/R_0RJcFbaLX_G2Vv1L7AoLwdlHE=/0x0:2000x1050/fit-in/1200x630/filters:strip_icc()/pic8160466.jpg',
 1, 4, 60, 120, 14, 2024, 'Tomáš Holek',
 3.65, ARRAY['eurogame', 'science'], ARRAY['worker placement', 'hand management'],
 8.40, 8.90, 'https://ludopedia.com.br/jogo/seti-search-for-extraterrestrial-intelligence'),

-- Age of Innovation
('00000000-0000-0000-0000-000000000018',
 'Age of Innovation', 'Age of Innovation', 383179,
 'https://cf.geekdo-images.com/D1vrcFEptCEoD8Z6s_iRfw__opengraph/img/dpHVS88WSKGa6Ni2zPUy8rd_NJY=/0x0:1435x753/fit-in/1200x630/filters:strip_icc()/pic7430993.jpg',
 1, 5, 60, 150, 14, 2023, 'Helge Ostertag',
 3.80, ARRAY['eurogame'], ARRAY['area control', 'engine building', 'variable setup'],
 8.40, 8.80, 'https://ludopedia.com.br/jogo/age-of-innovation'),

-- La Granja: Deluxe Master Set
('00000000-0000-0000-0000-000000000019',
 'La Granja: Deluxe Master Set', 'La Granja: Deluxe Master Set', 341945,
 'https://cf.geekdo-images.com/_kOpPrIydA24hH3_8n44Dg__opengraph/img/pW84NrcDRGmSXlfkpmnTl2XKSt0=/0x60:1500x848/fit-in/1200x630/filters:strip_icc()/pic6620505.jpg',
 1, 4, 60, 120, 12, 2021, 'Michael Keller, Andreas Odendahl',
 3.29, ARRAY['eurogame'], ARRAY['hand management', 'dice drafting', 'network building'],
 8.20, 8.60, 'https://ludopedia.com.br/jogo/la-granja-deluxe-master-set'),

-- Nucleum
('00000000-0000-0000-0000-000000000020',
 'Nucleum', 'Nucleum', 396790,
 'https://cf.geekdo-images.com/fIVUaMvbfy6GCOgfxt7xaw__opengraph/img/pjmYhBAfV1N5rxC74XJdhF7l-IA=/0x0:3485x1830/fit-in/1200x630/filters:strip_icc()/pic7647168.jpg',
 1, 4, 90, 150, 14, 2023, 'Simone Luciani, Nestore Mangone',
 3.70, ARRAY['eurogame'], ARRAY['engine building', 'network building', 'tile placement'],
 8.10, 8.50, 'https://ludopedia.com.br/jogo/nucleum'),

-- Shackleton Base: A Journey to the Moon
('00000000-0000-0000-0000-000000000021',
 'Shackleton Base: A Journey to the Moon', 'Shackleton Base: A Journey to the Moon', 408180,
 'https://cf.geekdo-images.com/XE4S_nXyHVvld2BOrDmA7Q__opengraph_left/img/4q19CyWZGc3aXuQzCKzHQGtTRW4=/fit-in/445x445/filters:strip_icc()/pic7897060.jpg',
 1, 4, 60, 120, 14, 2024, 'Fabio Lopiano, Nestore Mangone',
 3.89, ARRAY['eurogame'], ARRAY['worker placement', 'area development', 'variable setup'],
 8.00, 8.10, 'https://ludopedia.com.br/jogo/shackleton-base-a-journey-to-the-moon')

ON CONFLICT (id) DO UPDATE SET
  name             = EXCLUDED.name,
  name_pt          = EXCLUDED.name_pt,
  image_url        = EXCLUDED.image_url,
  bgg_rating       = EXCLUDED.bgg_rating,
  ludopedia_rating = EXCLUDED.ludopedia_rating,
  ludopedia_url    = EXCLUDED.ludopedia_url;


-- ─── 3. Garante que os posts existem ─────────────────────────────────────────

INSERT INTO posts (id, slug, type, status, title_pt, excerpt_pt, reading_time, featured, published_at)
VALUES (
  '10000000-0000-0000-0000-000000000010',
  'meu-top-10-de-todos-os-tempos', 'top10', 'published',
  'Meu Top 10 de todos os tempos',
  'Os 10 melhores boardgames que já joguei, atualizados regularmente.',
  5, false, '2026-06-14T00:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
  excerpt_pt = EXCLUDED.excerpt_pt;

INSERT INTO posts (id, slug, type, status, title_pt, excerpt_pt, reading_time, featured, published_at)
VALUES (
  '10000000-0000-0000-0000-000000000011',
  'top-10-party-games', 'top10', 'published',
  'Top 10 Party Games',
  'Os melhores jogos para animar qualquer mesa, independente de experiência.',
  4, false, '2026-06-15T00:00:00Z'
) ON CONFLICT (slug) DO NOTHING;


-- ─── 4. Garante as listas ─────────────────────────────────────────────────────

INSERT INTO top10_lists (id, post_id)
VALUES
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000010'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000011')
ON CONFLICT (id) DO NOTHING;


-- ─── 5. Limpa e repopula os itens do Top 10 de Todos os Tempos ───────────────

DELETE FROM top10_items WHERE list_id = '20000000-0000-0000-0000-000000000001';

INSERT INTO top10_items (list_id, game_id, position, prev_position, notes_pt)
VALUES
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000008',  1, NULL,
   'Nenhum jogo me faz adaptar tanto minha estratégia quanto Terraforming Mars. A cada partida, as cartas, corporações e oportunidades disponíveis me obrigam a trabalhar com o que tenho em mãos e encontrar novos caminhos para vencer. Depois de mais de 200 partidas, continua me surpreendendo.'),

  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000009',  2, NULL,
   'O jogo que mais me fez sentir que estava vivendo uma aventura. Campanha, evolução, descoberta e cooperação em uma experiência que me lembrou tudo o que eu gostava nos RPGs de mesa.'),

  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000015',  3, NULL,
   'Para mim, Brass é a definição de um eurogame pesado perfeito. Poucas regras, poucos componentes e uma densidade estratégica impressionante. É um jogo que prova que profundidade não depende de complexidade excessiva.'),

  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000016',  4, NULL,
   'O melhor deckbuilding que já joguei. Cada carta importa, cada decisão gera consequências e a disputa pelos espaços mantém a tensão do início ao fim. Um jogo extremamente estratégico que sempre me deixa com vontade de jogar novamente.'),

  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002',  5, NULL,
   'Um jogo que recompensa adaptação e criatividade. Cada partida apresenta novos caminhos e desafios, fazendo com que a estratégia surja das oportunidades disponíveis e não de um plano pré-definido. A sensação de construir algo único é excelente.'),

  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000017',  6, NULL,
   'SETI me conquistou pela sensação constante de descoberta. Poucos jogos conseguem transmitir tão bem a ideia de explorar o desconhecido enquanto exigem adaptação contínua às oportunidades que surgem durante a partida.'),

  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000018',  7, NULL,
   'Um jogo com profundidade estratégica impressionante e enorme potencial de longevidade. A quantidade de combinações possíveis faz com que cada partida apresente novos desafios e novas formas de abordar o jogo.'),

  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000019',  8, NULL,
   'Um clássico que continua envelhecendo muito bem. A flexibilidade das cartas e a variedade de estratégias fazem com que cada partida siga por caminhos diferentes, mantendo o jogo interessante mesmo depois de muitos anos.'),

  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020',  9, NULL,
   'Um eurogame extremamente denso e recompensador. Exige dedicação para ser dominado, mas oferece decisões importantes o tempo inteiro e uma enorme satisfação quando sua estratégia finalmente começa a funcionar.'),

  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000021', 10, NULL,
   'Um dos jogos mais promissores dos últimos anos. A combinação de módulos e corporações cria partidas bastante diferentes entre si, oferecendo exatamente o tipo de variabilidade e adaptação que mais valorizo em um boardgame.');


-- ─── 6. Party Games (mantém) ─────────────────────────────────────────────────

INSERT INTO games (id, name, name_pt, bgg_id, min_players, max_players, min_duration, max_duration, min_age, year, designer, weight, categories, mechanics, bgg_rating, ludopedia_rating, ludopedia_url)
VALUES
  ('00000000-0000-0000-0000-000000000011', 'Just One',    'Just One',    254640, 3, 7, 20, 20,  8, 2018, 'Ludovic Roudy',      1.07, ARRAY['party'], ARRAY['cooperative play', 'word game'],  7.67, 7.81, 'https://ludopedia.com.br/jogo/just-one'),
  ('00000000-0000-0000-0000-000000000012', 'Codenames',   'Codenames',   178900, 2, 8, 15, 15, 10, 2015, 'Vlaada Chvátil',     1.27, ARRAY['party'], ARRAY['word game', 'team game'],         7.62, 7.89, 'https://ludopedia.com.br/jogo/codenames'),
  ('00000000-0000-0000-0000-000000000013', 'Dixit',       'Dixit',        39856, 3, 6, 30, 30,  6, 2008, 'Jean-Louis Roubira', 1.10, ARRAY['party'], ARRAY['storytelling', 'voting'],         7.21, 7.56, 'https://ludopedia.com.br/jogo/dixit'),
  ('00000000-0000-0000-0000-000000000014', 'Wavelength',  'Wavelength',  262543, 2, 12, 30, 45,  8, 2019, 'Alex Hague',         1.19, ARRAY['party'], ARRAY['team game', 'deduction'],         7.43, 7.62, 'https://ludopedia.com.br/jogo/wavelength')
ON CONFLICT (id) DO NOTHING;

DELETE FROM top10_items WHERE list_id = '20000000-0000-0000-0000-000000000002';

INSERT INTO top10_items (list_id, game_id, position, prev_position, notes_pt)
VALUES
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000011', 1, NULL, 'Cooperativo, rápido e hilário. Funciona com qualquer grupo.'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000012', 2, NULL, 'Um clássico moderno. A versão Dueto permite jogar até a dois.'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000013', 3, NULL, 'Arte bonita e associações que revelam muito sobre quem está jogando.'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000014', 4, NULL, 'O melhor jogo de leitura de pessoas que existe. Simples de explicar, difícil de dominar.');
