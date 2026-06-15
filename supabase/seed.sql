-- ============================================================
-- O Regrista — Seed de desenvolvimento
-- Execute DEPOIS de 001_initial_schema.sql
-- Popula o banco com os dados dos mocks para testes reais
-- ============================================================

-- ─── Games ───────────────────────────────────────────────────────────────────
INSERT INTO games (id, name, bgg_id, min_players, max_players, min_duration, max_duration, min_age, year, designer, weight, categories, mechanics)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Dune: Imperium',         362944, 1, 4,  60, 120, 14, 2020, 'Paul Dennen',         3.0, ARRAY['eurogame', 'deckbuilding'], ARRAY['worker placement', 'deck building']),
  ('00000000-0000-0000-0000-000000000002', 'Ark Nova',               342942, 1, 4,  90, 150, 14, 2021, 'Mathias Wigge',       3.7, ARRAY['eurogame'],                 ARRAY['hand management', 'network building']),
  ('00000000-0000-0000-0000-000000000003', 'Root',                   237182, 2, 4,  60,  90, 10, 2018, 'Cole Wehrle',         3.7, ARRAY['asymmetric'],               ARRAY['area control', 'hand management']),
  ('00000000-0000-0000-0000-000000000004', 'Wingspan',               266192, 1, 5,  40,  70, 10, 2019, 'Elizabeth Hargrave',  2.4, ARRAY['family'],                   ARRAY['hand management', 'engine building']),
  ('00000000-0000-0000-0000-000000000005', 'Ticket to Ride Europa',   14996, 2, 5,  30,  60, 10, 2005, 'Alan R. Moon',        1.9, ARRAY['family'],                   ARRAY['network building', 'set collection']),
  ('00000000-0000-0000-0000-000000000006', 'Pandemic Legacy S1',     161936, 2, 4,  60,  90, 13, 2015, 'Rob Daviau',          3.0, ARRAY['cooperative', 'legacy'],    ARRAY['cooperative play', 'hand management']),
  ('00000000-0000-0000-0000-000000000007', 'Catan',                    13,   3, 4,  60,  90, 10, 1995, 'Klaus Teuber',        2.3, ARRAY['family'],                   ARRAY['trading', 'network building'])
ON CONFLICT (id) DO NOTHING;


-- ─── Posts ───────────────────────────────────────────────────────────────────
INSERT INTO posts (id, slug, type, status, title_pt, excerpt_pt, cover_url, reading_time, featured, published_at)
VALUES
  -- Reviews
  ('10000000-0000-0000-0000-000000000001', 'dune-imperium-review',       'review',       'published', 'Dune: Imperium é o engine-builder perfeito para quem odeia engine-builders', 'Uma análise sobre como o jogo resolve o problema clássico do solitaire multiplayer sem que você perceba que isso está acontecendo.', NULL, 12, true,  '2026-06-14T00:00:00Z'),
  ('10000000-0000-0000-0000-000000000002', 'ark-nova-review',             'review',       'published', 'Ark Nova: o melhor jogo dos últimos anos?',                                  'Uma análise profunda do Ark Nova e por que ele conquistou o topo de tantas listas de melhores jogos.',                              NULL, 15, false, '2026-06-10T00:00:00Z'),
  ('10000000-0000-0000-0000-000000000003', 'root-review',                 'review',       'published', 'Root: caos assimétrico em forma de floresta',                                'Cada facção joga um jogo diferente. Isso é um problema ou é o ponto?',                                                             NULL, 11, false, '2026-06-01T00:00:00Z'),
  ('10000000-0000-0000-0000-000000000004', 'ticket-to-ride-europa-review','review',       'published', 'Ticket to Ride Europa: a porta de entrada perfeita',                         'Um clássico que ainda funciona depois de 20 anos no mercado.',                                                                     NULL,  9, false, '2026-05-25T00:00:00Z'),
  ('10000000-0000-0000-0000-000000000005', 'pandemic-legacy-s1-review',   'review',       'published', 'Pandemic Legacy S1: o melhor jogo cooperativo já feito',                    'Experiência única que não pode ser repetida. Vale cada partida.',                                                                  NULL, 14, false, '2026-05-18T00:00:00Z'),
  -- Artigos
  ('10000000-0000-0000-0000-000000000006', 'worker-placement-ultima-decada','article',    'published', 'Por que o worker placement dominou a última década',                         'Uma análise da mecânica que redefiniu os eurogames.',                                                                              NULL, 10, false, '2026-05-28T00:00:00Z'),
  -- Como jogar
  ('10000000-0000-0000-0000-000000000007', 'como-jogar-wingspan',         'how-to-play',  'published', 'Wingspan',                                                                   'Aprenda a jogar Wingspan em 5 minutos.',                                                                                           NULL,  5, false, '2026-06-05T00:00:00Z'),
  ('10000000-0000-0000-0000-000000000008', 'como-jogar-catan',            'how-to-play',  'published', 'Catan',                                                                      'O guia definitivo de Catan.',                                                                                                      NULL,  6, false, '2026-05-20T00:00:00Z'),
  ('10000000-0000-0000-0000-000000000009', 'como-jogar-dune-imperium',    'how-to-play',  'published', 'Dune: Imperium',                                                             'Como jogar Dune: Imperium sem confusão.',                                                                                          NULL,  7, false, '2026-05-10T00:00:00Z'),
  -- Top 10
  ('10000000-0000-0000-0000-000000000010', 'meu-top-10-de-todos-os-tempos','top10',       'published', 'Meu Top 10 de todos os tempos',                                              'Os 10 melhores boardgames da minha coleção, atualizados regularmente.',                                                            NULL, 5,  false, '2026-06-14T00:00:00Z')
ON CONFLICT (slug) DO NOTHING;


-- ─── Reviews ─────────────────────────────────────────────────────────────────
INSERT INTO reviews (post_id, game_id, score, score_components, verdict)
VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 8.5,
   '{"componentes": 9.0, "mecanica": 8.5, "interacao": 8.0, "replay": 9.0, "curva": 7.5}',
   'O melhor deck-builder com worker placement do mercado.'),

  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 9.0,
   '{"componentes": 9.5, "mecanica": 9.0, "interacao": 8.0, "replay": 9.5, "curva": 8.5}',
   'O melhor jogo de construção de motor dos últimos anos.'),

  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 9.0,
   '{"componentes": 9.5, "mecanica": 9.0, "interacao": 9.5, "replay": 9.0, "curva": 7.0}',
   'Caos intencional que funciona perfeitamente quando todos entendem o jogo.'),

  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005', 7.0,
   '{"componentes": 8.0, "mecanica": 7.0, "interacao": 7.0, "replay": 6.5, "curva": 9.0}',
   'O melhor gateway game de todos os tempos.'),

  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000006', 9.5,
   '{"componentes": 8.5, "mecanica": 9.5, "interacao": 9.5, "replay": 9.0, "curva": 8.0}',
   'A melhor experiência narrativa em boardgames.')

ON CONFLICT (post_id) DO NOTHING;
