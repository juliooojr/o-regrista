-- ============================================================
-- Patch: atualiza imagem do Shackleton Base para versão quadrada (445x445)
-- Cole no Supabase SQL Editor e execute
-- ============================================================

-- Atualiza cover_url do post (aparece na página interna e cards)
UPDATE posts
SET cover_url = 'https://cf.geekdo-images.com/XE4S_nXyHVvld2BOrDmA7Q__opengraph_left/img/4q19CyWZGc3aXuQzCKzHQGtTRW4=/fit-in/445x445/filters:strip_icc()/pic7897060.jpg'
WHERE slug = 'shackleton-base-review';

-- Atualiza image_url do jogo (fallback usado onde não há cover_url)
UPDATE games
SET image_url = 'https://cf.geekdo-images.com/XE4S_nXyHVvld2BOrDmA7Q__opengraph_left/img/4q19CyWZGc3aXuQzCKzHQGtTRW4=/fit-in/445x445/filters:strip_icc()/pic7897060.jpg'
WHERE id = '00000000-0000-0000-0000-000000000021';
