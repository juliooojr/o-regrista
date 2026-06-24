-- ============================================================
-- O Regrista — Top 10 Party Games (seed completo)
-- Cole no Supabase SQL Editor e execute
-- PRÉ-REQUISITO: top10_seed.sql já executado (post e lista existem)
-- ============================================================


-- ─── 1. Atualiza Codenames com imagem e corrige imagens de outros jogos ──────

UPDATE games SET
  image_url = 'https://cf.geekdo-images.com/F_KDEu0GjdClml8N7c8Imw__opengraph/img/HwjL0dy9bRuwn1XPzKwvUcRe26U=/fit-in/1200x630/filters:strip_icc()/pic2582929.jpg'
WHERE id = '00000000-0000-0000-0000-000000000012'; -- Codenames


-- ─── 2. Insere os novos jogos do Top 10 Party Games ──────────────────────────

INSERT INTO games (id, name, name_pt, bgg_id, image_url, min_players, max_players, min_duration, max_duration, min_age, year, designer, weight, categories, mechanics, bgg_rating, ludopedia_rating, ludopedia_url)
VALUES

-- Passaporte Mundo
('00000000-0000-0000-0000-000000000022',
 'Passaporte Mundo', 'Passaporte Mundo', 413920,
 'https://cf.geekdo-images.com/NG2ubOMc3uLVIdPbRRXLwA__opengraph/img/rCsSldJMPlv2Wdgpx1XxrMXyaTo=/0x281:3642x2193/fit-in/1200x630/filters:strip_icc()/pic8114034.png',
 2, 6, 30, 45, 12, 2024, 'Rodrigo Rego',
 1.50, ARRAY['party', 'trivia'], ARRAY['cooperative play', 'hand management'],
 7.50, 8.00, 'https://ludopedia.com.br/jogo/passaporte-mundo'),

-- Flip 7
('00000000-0000-0000-0000-000000000023',
 'Flip 7', 'Flip 7', 420087,
 'https://cf.geekdo-images.com/YrQxEB9Ef0kQorRApzG5vQ__opengraph/img/hziHazLor3j2SyWQHnEiPvn6ejQ=/0x747:3000x2339/fit-in/1200x630/filters:fill(blur):strip_icc()/pic8780246.jpg',
 2, 8, 20, 30, 8, 2024, 'Eric Olsen',
 1.15, ARRAY['party', 'card game'], ARRAY['press your luck', 'hand management'],
 7.10, 7.50, 'https://ludopedia.com.br/jogo/flip-7'),

-- Citadels
('00000000-0000-0000-0000-000000000024',
 'Citadels', 'Citadels', 478,
 'https://cf.geekdo-images.com/shXqRK7Sfsp-jCLwoN3kqw__opengraph/img/FPUiFGAcl44zN-WUcZasMBibqUc=/0x0:290x152/fit-in/1200x630/filters:strip_icc()/pic636868.jpg',
 2, 7, 60, 60, 10, 2000, 'Bruno Faidutti',
 1.72, ARRAY['party', 'bluffing'], ARRAY['role selection', 'hand management', 'variable player powers'],
 7.29, 7.80, 'https://ludopedia.com.br/jogo/citadels'),

-- Telestrations
('00000000-0000-0000-0000-000000000025',
 'Telestrations', 'Telestrations', 46213,
 'https://cf.geekdo-images.com/h7Lq7mz22O2UOEQ3baieVw__opengraph/img/MVKZpbdMRlRXZPyVYuRoOpZ9FWc=/fit-in/1200x630/filters:strip_icc()/pic768545.jpg',
 4, 8, 30, 30, 12, 2009, 'Não creditado',
 1.07, ARRAY['party', 'drawing'], ARRAY['storytelling', 'paper and pencil'],
 7.31, 7.50, 'https://ludopedia.com.br/jogo/telestrations'),

-- Cabanga! (nome internacional: Snailed It!)
('00000000-0000-0000-0000-000000000026',
 'Snailed It!', 'Cabanga!', 394889,
 'https://cf.geekdo-images.com/8m6FFT_CE_zFdHQz6rUPAQ__opengraph/img/jf8sbCxZEz4NZ_0bsXcdoTioj4k=/fit-in/1200x630/filters:strip_icc()/pic8802920.jpg',
 3, 6, 20, 20, 8, 2022, 'Michael Modler',
 1.21, ARRAY['party', 'card game'], ARRAY['hand management', 'take that'],
 6.80, 7.20, 'https://ludopedia.com.br/jogo/cabanga'),

-- BANG!
('00000000-0000-0000-0000-000000000027',
 'BANG!', 'BANG!', 3955,
 'https://cf.geekdo-images.com/IzmlvxYPoGFxgIA9D3wPxw__opengraph/img/iS08v76eoqMIMERrQgiK2o_w_Tw=/fit-in/1200x630/filters:strip_icc()/pic1766481.jpg',
 4, 7, 20, 40, 10, 2002, 'Emiliano Sciarra',
 1.61, ARRAY['party', 'bluffing'], ARRAY['hand management', 'hidden roles', 'variable player powers'],
 6.87, 7.50, 'https://ludopedia.com.br/jogo/bang'),

-- Dobble (Spot it!)
('00000000-0000-0000-0000-000000000028',
 'Spot it!', 'Dobble', 63268,
 'https://cf.geekdo-images.com/hqDT4HbEb2eNCyMOeiGj-g__opengraph/img/trE3E4a_gSNJFlVpzleEeu2Zg0Q=/0x357:984x873/fit-in/1200x630/filters:strip_icc()/pic6477003.png',
 2, 8, 15, 15, 6, 2009, 'Denis Blanchot',
 1.03, ARRAY['party', 'real time'], ARRAY['pattern recognition', 'speed'],
 6.60, 7.00, 'https://ludopedia.com.br/jogo/dobble'),

-- Imagem & Ação
('00000000-0000-0000-0000-000000000029',
 'Imagem & Ação 2', 'Imagem & Ação', 13512,
 'https://cf.geekdo-images.com/-ldS-dDNkT4wTlOHsH-UsQ__opengraph/img/iddquJQrDsRTRW4U5tmzBTPOlyY=/0x134:800x554/fit-in/1200x630/filters:strip_icc()/pic1604602.jpg',
 3, 16, 60, 60, 8, 2000, 'Estrela',
 1.00, ARRAY['party', 'drawing'], ARRAY['paper and pencil', 'team game'],
 6.50, 7.80, 'https://ludopedia.com.br/jogo/imagem-e-acao'),

-- Exploding Kittens
('00000000-0000-0000-0000-000000000030',
 'Exploding Kittens', 'Exploding Kittens', 172225,
 'https://cf.geekdo-images.com/N8bL53-pRU7zaXDTrEaYrw__opengraph/img/2GQDDt2HfOV58ip2jT-eJLQ6o-k=/0x0:680x357/fit-in/1200x630/filters:strip_icc()/pic2691976.png',
 2, 5, 15, 15, 7, 2015, 'Elan Lee, Matthew Inman, Shane Small',
 1.08, ARRAY['party', 'card game'], ARRAY['hand management', 'push your luck', 'take that'],
 6.23, 6.80, 'https://ludopedia.com.br/jogo/exploding-kittens')

ON CONFLICT (id) DO UPDATE SET
  name             = EXCLUDED.name,
  name_pt          = EXCLUDED.name_pt,
  image_url        = EXCLUDED.image_url,
  bgg_rating       = EXCLUDED.bgg_rating,
  ludopedia_rating = EXCLUDED.ludopedia_rating,
  ludopedia_url    = EXCLUDED.ludopedia_url;


-- ─── 3. Repopula os itens do Top 10 Party Games ──────────────────────────────
-- (a lista e o post já existem via top10_seed.sql)

DELETE FROM top10_items WHERE list_id = '20000000-0000-0000-0000-000000000002';

INSERT INTO top10_items (list_id, game_id, position, prev_position, notes_pt)
VALUES

  -- 1. Código Secreto (Codenames)
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000012', 1, NULL,
   'Nenhum outro party game gerou tantas discussões interessantes nas minhas mesas. O mais impressionante é que as melhores partidas normalmente não acontecem quando alguém dá uma dica genial, mas quando todo mundo tenta entender como aquela dica fez sentido na cabeça do capitão.'),

  -- 2. Passaporte Mundo
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000022', 2, NULL,
   'Um dos raros jogos de conhecimento que eu realmente tenho vontade de jogar de novo. Em vez de premiar quem decorou mais informações, ele faz as pessoas conversarem, discutirem possibilidades e descobrirem coisas novas durante a partida.'),

  -- 3. Flip 7
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000023', 3, NULL,
   'O tipo de jogo que parece simples demais até a primeira partida terminar. A partir daí, todo mundo começa a forçar a sorte um pouco mais do que deveria. É provavelmente o jogo mais fácil da lista de ensinar e um dos mais difíceis de guardar depois.'),

  -- 4. Citadels
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000024', 4, NULL,
   'Poucos jogos geram tanta paranoia com tão poucas regras. Você passa metade da partida tentando executar seu plano e a outra metade tentando descobrir quem vai estragar ele antes.'),

  -- 5. Telestrations
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000025', 5, NULL,
   'O jogo que mais me fez rir. Não importa quantas vezes eu jogue, sempre existe um desenho absurdo ou uma interpretação completamente sem sentido que faz a mesa inteira perder a compostura.'),

  -- 6. Cabanga!
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000026', 6, NULL,
   'Um daqueles jogos que vivem de pequenos momentos. Você passa boa parte da partida tranquilo até alguém encontrar exatamente a carta que precisava para despejar um monte de cartas na sua frente.'),

  -- 7. Bang!
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000027', 7, NULL,
   'O melhor de Bang! nunca foi o tiroteio. O melhor de Bang! é ver pessoas tomando decisões completamente erradas porque confiaram na pessoa errada ou suspeitaram da pessoa certa.'),

  -- 8. Dobble
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000028', 8, NULL,
   'Um jogo que parece fácil até você perceber que o símbolo está literalmente na sua frente e mesmo assim você não consegue enxergar. Simples, rápido e incrivelmente eficiente.'),

  -- 9. Imagem & Ação
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000029', 9, NULL,
   'O jogo responsável por muitas pessoas descobrirem que desenham muito pior do que imaginavam. Continua sendo um clássico porque transforma algo simples em uma desculpa perfeita para dar risada dos amigos.'),

  -- 10. Exploding Kittens
  ('20000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000030', 10, NULL,
   'Não é o jogo mais brilhante da lista, mas talvez seja um dos mais fáceis de colocar na mesa. Funciona justamente porque não tenta ser mais complexo do que precisa.');


-- ─── Patch de imagens (re-executar se o seed anterior já foi aplicado) ────────

UPDATE games SET image_url = 'https://cf.geekdo-images.com/h7Lq7mz22O2UOEQ3baieVw__opengraph/img/MVKZpbdMRlRXZPyVYuRoOpZ9FWc=/fit-in/1200x630/filters:strip_icc()/pic768545.jpg'
WHERE id = '00000000-0000-0000-0000-000000000025'; -- Telestrations

UPDATE games SET image_url = 'https://cf.geekdo-images.com/F_KDEu0GjdClml8N7c8Imw__opengraph/img/HwjL0dy9bRuwn1XPzKwvUcRe26U=/fit-in/1200x630/filters:strip_icc()/pic2582929.jpg'
WHERE id = '00000000-0000-0000-0000-000000000012'; -- Codenames

UPDATE games SET image_url = 'https://cf.geekdo-images.com/8m6FFT_CE_zFdHQz6rUPAQ__opengraph/img/jf8sbCxZEz4NZ_0bsXcdoTioj4k=/fit-in/1200x630/filters:strip_icc()/pic8802920.jpg'
WHERE id = '00000000-0000-0000-0000-000000000026'; -- Cabanga!

UPDATE games SET image_url = 'https://cf.geekdo-images.com/IzmlvxYPoGFxgIA9D3wPxw__opengraph/img/iS08v76eoqMIMERrQgiK2o_w_Tw=/fit-in/1200x630/filters:strip_icc()/pic1766481.jpg'
WHERE id = '00000000-0000-0000-0000-000000000027'; -- BANG!
