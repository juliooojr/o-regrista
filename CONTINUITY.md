# Prompt de continuidade — O Regrista

Cole este prompt no início de uma nova janela para retomar o projeto.

---

Estou trabalhando no projeto **O Regrista** — site pessoal de boardgames em Next.js 15.
Leia os arquivos de documentação nesta ordem antes de qualquer coisa:

1. `BRAIN.md` — visão, stack, status atual
2. `AGENTS.md` — regras de código e convenções
3. `DESIGN.md` — paleta, tipografia, componentes
4. `SCHEMA.md` — banco de dados Supabase
5. `TASKS.md` — o que está pendente e o que foi feito

## Estado atual (2026-06-24, sessão 12)

### ✅ Reviews publicadas
- **Shackleton Base** — nota 10.0, slug `shackleton-base-review`, featured = true
- **PARKS (Second Edition)** — nota 7.0, slug `parks-review` — **SQL gerado, ainda não executado no Supabase**

### ✅ Layout da review — refatorado (sessão 12)
Página `app/[locale]/reviews/[slug]/page.tsx` com sidebar à direita:
- **Artigo:** badge → nome do jogo → título → data/leitura → markdown → veredito (sem hero image)
- **Sidebar (sticky, 280px):** capa do jogo quadrada (aspect-ratio 1:1, sem cropping) → sub-scores em estrelas → nota final → ficha técnica

### ✅ Cards de review — redesenhados (sessão 12)
`components/content/shared.tsx` — `ReviewCard` usa `aspect-ratio: 1/1` + `objectPosition: center top`. Funciona sem cropping para imagens quadradas e landscape.

### ✅ Fix 500 em produção — RESOLVIDO (sessão 11)
Root cause: `[locale]/layout.tsx` sem `generateStaticParams`. Commit `91bfa3d`.

### ✅ Top 10 Party Games — CÓDIGO PRONTO (sessão 11)
`supabase/top10_party_games_seed.sql` — **ainda não executado em produção**

### ✅ Banco de dados (Supabase)
- Projeto ID: `zvuwwlzlmnpzlwxfzfrd`, região `sa-east-1`
- Migrations executadas: `001_initial_schema.sql`, `002_game_ratings.sql`
- Seeds executados: `top10_seed.sql`, `review_shackleton_base.sql`
- **Pendentes em produção:** `patch_shackleton_image.sql`, `review_parks_second_edition.sql`, `top10_party_games_seed.sql`

### ✅ Responsividade e Favicon — CONCLUÍDOS (sessão 9)
Todas as páginas responsivas via classes CSS em `app/globals.css`.
Favicon: `app/favicon.ico` (ICO multi-size) + `app/icon.png` (512×512px).

### ✅ Comportamento global
- Tema sempre claro ao abrir (sem localStorage)
- Locale padrão PT sem redirecionamento (`localeDetection: false`)
- Botão EN desabilitado no Header

### ⚠️ Atenção técnica — null bytes
Alguns arquivos `.tsx` têm null bytes embebidos (herança da criação original). Não afetam o build, mas corrompem edições em Python. Ao editar via script: **sempre usar `git show HEAD:arquivo | tr -d '\000'`** como fonte.

Arquivos com null bytes conhecidos:
- `app/[locale]/artigos/page.tsx`
- `app/layout.tsx`

### 💡 Convenção de imagens
- Sempre usar imagens de `cf.geekdo-images.com`
- Preferir variante **quadrada 445×445** (`opengraph_left` no path) — evita cropping na sidebar e nos cards
- Exemplo: `https://cf.geekdo-images.com/XE4S_nXyHVvld2BOrDmA7Q__opengraph_left/img/.../pic7897060.jpg`

## Próximo passo sugerido
Criar a **terceira review** — UUIDs reservados: game `000...0032`, post `100...0032`, review `300...0003`.
