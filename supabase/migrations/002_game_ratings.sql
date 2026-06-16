-- ============================================================
-- O Regrista — Migration 002: campos de rating externos
-- Execute no Supabase SQL Editor
-- ============================================================

ALTER TABLE games
  ADD COLUMN IF NOT EXISTS bgg_rating     numeric(4,2),
  ADD COLUMN IF NOT EXISTS ludopedia_rating numeric(4,2),
  ADD COLUMN IF NOT EXISTS ludopedia_url  text;
