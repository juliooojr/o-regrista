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

## Estado atual (2026-06-19, sessão 9)

### ✅ Páginas concluídas
- **Homepage** — featured post + sidebar recentes + grid reviews + como-jogar
- **Reviews** — listagem com escala de scores + detalhe com sub-scores em estrelas, markdown, ficha técnica
- **Artigos** — bloqueada com página "Em breve 🚧"
- **Como Jogar** — listagem com featured guide + detalhe
- **Sobre** — bio completa, avatar Supabase Storage, stats dinâmicos, botão WhatsApp
- **Top 10** — lista principal (10 jogos reais) + sidebar + páginas dinâmicas por slug
- **Primeira review publicada** — Shackleton Base, nota 10.0, markdown completo

### ✅ Responsividade — CONCLUÍDA (sessão 9)
Todas as páginas adaptadas para mobile/tablet via classes CSS em `app/globals.css`.
Estratégia: inline styles mantidos para cores/visual, layout extraído para classes com media queries.

**Breakpoints:** ≤768px (tablet) e ≤480px (mobile estreito)

**Classes criadas:**
| Classe | Uso |
|--------|-----|
| `.home-main-grid` | Grid 1fr+300px da homepage → 1 coluna no mobile |
| `.page-sidebar-grid` | Grid 1fr+280-320px com sidebar → 1 coluna no mobile |
| `.sidebar-sticky` | `position: sticky` → `static` no mobile |
| `.card-grid-3` | Grid 3 colunas → 2 colunas tablet, 1 mobile |
| `.card-grid-4` | Grid 4 colunas → 2 colunas tablet, 1 mobile |
| `.featured-row` | Flex row do destaque → coluna no mobile |
| `.featured-cover` | Capa 260×260 → 100% largura no mobile |
| `.featured-guide-row` | Flex row do featured guide → coluna no mobile |
| `.featured-cover-sm` | Capa 160px → 100% largura no mobile |
| `.top10-item` | Flex row do item do top10 → wrap no mobile (infos abaixo) |
| `.top10-info` | Texto do item top10 → flex-basis 100% no mobile |
| `.stats-grid` | Grid 4 stats → 2 colunas no mobile estreito |
| `.header-inner` | Header wrapper → wrap no mobile |
| `.header-nav` | Nav → segunda linha scrollável horizontal no mobile |

**Arquivos alterados:**
- `app/globals.css` (250 linhas)
- `app/[locale]/page.tsx`
- `app/[locale]/top10/page.tsx`
- `app/[locale]/reviews/page.tsx`
- `app/[locale]/reviews/[slug]/page.tsx`
- `app/[locale]/como-jogar/page.tsx`
- `app/[locale]/como-jogar/[slug]/page.tsx`
- `app/[locale]/sobre/page.tsx`
- `components/layout/Header.tsx`

### ✅ Favicon — CONCLUÍDO (sessão 9)
- Fonte: `favicon.png` na raiz (meeple amarelo lendo livro, 1024×1536px)
- `app/favicon.ico` — ICO multi-size (16/32/48px), gerado com Pillow
- `app/icon.png` — 512×512px PNG, servido automaticamente pelo Next.js App Router
- Nenhuma configuração adicional necessária

### ✅ Comportamento global
- Tema sempre claro ao abrir (sem localStorage — apenas toggle por sessão)
- Locale padrão PT sem redirecionamento (`localeDetection: false`)
- Botão EN desabilitado no Header (span cinza, cursor `not-allowed`, tooltip "Em breve")

### ✅ Banco de dados (Supabase)
- Projeto ID: `zvuwwlzlmnpzlwxfzfrd`, região `sa-east-1`
- Migrations executadas: `001_initial_schema.sql`, `002_game_ratings.sql`
- Seeds executados: `top10_seed.sql`, `review_shackleton_base.sql`

### ⚠️ Atenção técnica
Vários arquivos `.tsx` do projeto têm **null bytes embebidos** em comentários — herança de como foram criados originalmente. Isso não afeta o build do Next.js/Vercel mas causa erros no `tsc --noEmit`. Ao editar esses arquivos via script Python, **sempre usar `git show HEAD:arquivo | tr -d '\000'`** como fonte para evitar truncamento — nunca ler o arquivo do disco e fazer replace direto em Python, pois null bytes podem corromper o resultado.

Arquivos com null bytes conhecidos (pré-existentes, não causam problema no build):
- `app/[locale]/artigos/page.tsx`
- `app/[locale]/como-jogar/page.tsx` (limpo na sessão 9)
- `app/[locale]/sobre/page.tsx` (limpo na sessão 9)
- `app/layout.tsx`

## Próximo passo sugerido
Retomar o **Top 10 Party Games** (definir jogos com Julio) ou atacar o **backlog de analytics**.
