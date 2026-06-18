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

## Estado atual (2026-06-18, sessão 8)

### ✅ Páginas concluídas
- **Homepage** — featured post (imagem `objectFit: cover`, sem tarjas) + sidebar 3 recentes + grid reviews + como-jogar (3 colunas, mesmo formato de reviews)
- **Reviews** — listagem com escala renomeada + detalhe com sub-scores em estrelas e ficha técnica; markdown via `react-markdown`
- **Artigos** — bloqueada com página "Em breve 🚧"
- **Como Jogar** — listagem + detalhe
- **Sobre** — bio com `textAlign: justify`, avatar via Supabase Storage, stats dinâmicos, botão WhatsApp
- **Top 10 de Todos os Tempos** — funcional com 10 jogos reais, badges BGG e Ludopedia
- **Primeira review publicada** — Shackleton Base, nota 10.0, sub-scores em estrelas, markdown completo

### ✅ Comportamento global
- Tema sempre claro ao abrir (sem localStorage — apenas toggle por sessão)
- Locale padrão PT sem redirecionamento (`localeDetection: false` em `lib/i18n/routing.ts`)
- Botão EN desabilitado no Header (span cinza, cursor `not-allowed`, tooltip "Em breve")

### ✅ Escala de scores em `/reviews`
| Label | Range |
|-------|-------|
| Obra-prima | = 10 |
| Excelente | ≥ 9 |
| Jogão | ≥ 8 |
| Honesto | ≥ 7 |
| Fraquinho | ≥ 6 |
| Passo | < 6 |

### ✅ Banco de dados (Supabase)
- Projeto ID: `zvuwwlzlmnpzlwxfzfrd`, região `sa-east-1`
- Migration `001_initial_schema.sql` — executada
- Migration `002_game_ratings.sql` — adiciona `bgg_rating`, `ludopedia_rating`, `ludopedia_url` à tabela `games`
- `top10_seed.sql` — seed completo do Top 10 de Todos os Tempos
- `review_shackleton_base.sql` — seed da review do Shackleton Base (re-executar para aplicar atualizações de conteúdo)

### ✅ Dados reais do Top 10 (notas buscadas em 2026-06-16)
| Jogo | ID BGG | BGG | Ludopedia |
|------|--------|-----|-----------|
| Terraforming Mars | 167791 | 8.3 | 9.0 |
| Gloomhaven | 174430 | 8.5 | 9.0 |
| Brass: Birmingham | 224517 | 8.6 | 9.0 |
| Dune: Imperium – Uprising | 397598 | 8.7 | 8.8 |
| Ark Nova | 342942 | 8.5 | 9.0 |
| SETI | 418059 | 8.4 | 8.9 |
| Age of Innovation | 383179 | 8.4 | 8.8 |
| La Granja: Deluxe Master Set | 341945 | 8.2 | 8.6 |
| Nucleum | 396790 | 8.1 | 8.5 |
| Shackleton Base | 408180 | 8.0 | 8.1 |

### ✅ Arquitetura relevante
- `lib/content.ts` — funções com `cache()` + `createPublicClient()`
- `components/content/shared.tsx` — `GameCover` com `objectFit: cover`
- `app/[locale]/page.tsx` — FeaturedPost com imagem `objectFit: cover` 260×260, sidebar `.slice(0, 3)`
- `app/[locale]/artigos/page.tsx` — página "Em breve", sem imports desnecessários
- `components/layout/Header.tsx` — EN desabilitado, sem localStorage
- `app/layout.tsx` — tema sempre light, sem localStorage

### ⚠️ BGG API
Retorna 401 — não usar. Ratings e imagens são salvas no banco. Para buscar dados usar Chrome MCP nas páginas do BGG e Ludopedia.

## 🔜 Backlog (por prioridade)

1. **Ajustar responsividade** — site ainda não está adaptado para mobile
2. **Top 10 Party Games** — Julio vai definir os jogos. Fluxo: buscar no BGG/Ludopedia via Chrome MCP → inserir no banco via SQL seed
3. **Favicon** — `favicon.png` já existe na raiz. Converter para `.ico` e colocar em `app/favicon.ico`
4. **Analytics** — pesquisar opções (Plausible, Umami, Vercel Analytics) considerando privacidade e custo
5. **Markdown nas páginas de detalhe** — `/como-jogar/[slug]` e `/artigos/[slug]`
6. **Admin/CMS básico** — publicar posts sem precisar do Supabase Studio
7. **Mais reviews** — escrever e publicar reviews dos jogos do Top 10
8. **PT/EN funcional** — traduzir conteúdo e reabilitar o switcher

## Comandos
```bash
# Dev local
cd "C:\Users\Julio Jr\Desktop\o-regrista"
npm run dev
# → http://localhost:3000

# Git (rodar no terminal Windows — o sandbox Linux não consegue escrever no .git)
cd "C:\Users\Julio Jr\Desktop\o-regrista"
git add -A
git commit -m "mensagem"
git push
```

## SQL — ordem de execução se o banco precisar ser refeito
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_game_ratings.sql`
3. `supabase/seed.sql`
4. `supabase/top10_seed.sql`
5. `supabase/review_shackleton_base.sql`
