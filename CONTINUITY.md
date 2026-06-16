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

## Estado atual (2026-06-16, sessão 6)

### ✅ Páginas concluídas
- **Homepage** — featured post + sidebar + reviews + como-jogar
- **Reviews** — listagem + detalhe com sub-scores e ficha técnica
- **Artigos** — listagem + detalhe
- **Como Jogar** — listagem + detalhe
- **Sobre** — bio completa (7 parágrafos), avatar via Supabase Storage, stats dinâmicos (reviews/guias do DB, 11 anos no hobby, 75 jogos na coleção), botão WhatsApp verde
- **Top 10 de Todos os Tempos** — totalmente funcional com 10 jogos reais, badges BGG e Ludopedia com links, notas reais buscadas diretamente nos sites

### ✅ Banco de dados (Supabase)
- Projeto ID: `zvuwwlzlmnpzlwxfzfrd`, região `sa-east-1`
- Migration `001_initial_schema.sql` — executada
- Migration `002_game_ratings.sql` — adiciona `bgg_rating`, `ludopedia_rating`, `ludopedia_url` à tabela `games`
- `top10_seed.sql` — seed completo do Top 10 de Todos os Tempos (re-executar se dados antigos estiverem errados — o ON CONFLICT atualiza nomes e ratings)

### ✅ Dados reais do Top 10 (notas buscadas em 2026-06-16)
| Jogo | ID BGG | BGG | Ludopedia | Ludopedia URL |
|------|--------|-----|-----------|---------------|
| Terraforming Mars | 167791 | 8.3 | 9.0 | /jogo/terraforming-mars |
| Gloomhaven | 174430 | 8.5 | 9.0 | /jogo/gloomhaven |
| Brass: Birmingham | 224517 | 8.6 | 9.0 | /jogo/brass-birmingham |
| Dune: Imperium – Uprising | 397598 | 8.7 | 8.8 | /jogo/dune-imperium-uprising |
| Ark Nova | 342942 | 8.5 | 9.0 | /jogo/ark-nova |
| SETI: Search for Extraterrestrial Intelligence | 418059 | 8.4 | 8.9 | /jogo/seti-search-for-extraterrestrial-intelligence |
| Age of Innovation | 383179 | 8.4 | 8.8 | /jogo/age-of-innovation |
| La Granja: Deluxe Master Set | 341945 | 8.2 | 8.6 | /jogo/la-granja-deluxe-master-set |
| Nucleum | 396790 | 8.1 | 8.5 | /jogo/nucleum |
| Shackleton Base: A Journey to the Moon | 408180 | 8.0 | 8.1 | /jogo/shackleton-base-a-journey-to-the-moon |

### ✅ Arquitetura relevante
- `lib/content.ts` — `getTop10BySlug()`, `getSiteStats()`, `getPostsByType()` usando `cache()` + `createPublicClient()`
- `components/content/shared.tsx` — `GameCover` usa `objectFit: 'cover'` (preenche o quadrado, sem tarjas)
- `app/[locale]/top10/page.tsx` — lista featured (slug `meu-top-10-de-todos-os-tempos`) + sidebar outras listas
- `app/[locale]/top10/[slug]/page.tsx` — página dinâmica para qualquer lista Top 10
- Imagens: URLs do BGG CDN (`cf.geekdo-images.com/__opengraph/`) landscape 1200×630, cortadas no centro com cover

### ⚠️ BGG API
Retorna 401 (exige Bearer auth) — não usar. Ratings e imagens são salvas no banco. Para buscar dados, usar Chrome MCP nas páginas do BGG e Ludopedia.

## 🔜 Próximas tarefas (por prioridade)

### [AMANHÃ — sessão 7]
1. **Top 10 Party Games** — Julio vai definir os jogos. Fluxo: buscar no BGG/Ludopedia via Chrome MCP → inserir no banco via `top10_seed.sql`
2. **Favicon** — `favicon.png` já existe na raiz do projeto. Converter para `.ico` e colocar em `app/favicon.ico` (substituir o atual genérico)

### [Futuro]
3. Deploy na Vercel com variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Analytics — pesquisar opções (Plausible, Umami, Vercel Analytics, Google Analytics) considerando privacidade e custo
5. Markdown renderizado nas páginas de detalhe (`/como-jogar/[slug]` e `/artigos/[slug]`)
6. Admin/CMS básico para publicar posts sem precisar do Supabase Studio
7. PT/EN switcher funcional no Header

## Comandos
```bash
# Dev local
cd "C:\Users\Julio Jr\Desktop\o-regrista"
npm run dev
# → http://localhost:3000

# Git (rodar no terminal Windows — o sandbox Linux não consegue escrever no .git)
cd "C:\Users\Julio Jr\Desktop\o-regrista"
git add .
git commit -m "mensagem"
git push
```

## SQL — ordem de execução se o banco precisar ser refeito
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_game_ratings.sql`
3. `supabase/seed.sql`
4. `supabase/top10_seed.sql`
