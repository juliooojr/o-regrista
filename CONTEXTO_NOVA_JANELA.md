# Prompt de continuidade — O Regrista
# Cole este bloco inteiro no início da nova conversa.

---

Estou desenvolvendo **O Regrista** — meu site pessoal de boardgames. Já temos sessões anteriores com todo o trabalho feito. Preciso que você leia os arquivos de documentação da pasta do projeto para retomar o contexto completo antes de qualquer trabalho.

**Pasta do projeto:** `C:\Users\Julio Jr\Desktop\o-regrista`

Leia nesta ordem:
1. `BRAIN.md` — visão, stack, tipos de conteúdo, status atual
2. `DESIGN.md` — paleta, tipografia, componentes visuais
3. `SCHEMA.md` — banco de dados completo
4. `TASKS.md` — o que está pendente e o que foi feito
5. `AGENTS.md` — regras de código e convenções

---

## Contexto rápido (para o Claude não precisar ler tudo antes de responder)

**Stack:** Next.js 15 + TypeScript + Tailwind CSS v4 + Supabase + next-intl v3

**O que está pronto:**
- Homepage completa com layout magazine (destaque + sidebar + Como Jogar + Últimas reviews)
- Páginas de listagem: `/reviews`, `/artigos`, `/top10` (ranking estilo BGG), `/como-jogar`, `/sobre`
- Página de detalhe: `/reviews/[slug]` completa com sub-scores e ficha técnica
- Componentes compartilhados: `TypeBadge`, `GameCover`, `ReviewCard`, `HowToPlayCard`, `PageHeader`
- Header com toggle dark/light + switcher PT|EN (visual)
- Background decorativo com ícones SVG de board game nos cantos
- Schema Supabase completo (`supabase/migrations/001_initial_schema.sql`) com 5 tabelas, RLS e índices
- Seed de desenvolvimento (`supabase/seed.sql`)
- Queries prontas em `lib/content.ts`

**O que ainda usa mock data (`lib/mock.ts`):**
- Todas as páginas — o banco ainda não foi conectado

---

## Próxima tarefa: Passo 5 — Conectar o Supabase

### O que o usuário precisa fazer manualmente
1. Acessar [supabase.com](https://supabase.com) → criar novo projeto
2. Pegar as chaves em: Project Settings → API
3. Copiar `.env.local.example` → `.env.local` e preencher:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. No Supabase → SQL Editor → executar `supabase/migrations/001_initial_schema.sql`
5. Em seguida executar `supabase/seed.sql` (dados de dev)
6. Reiniciar `npm run dev`

### O que o Claude faz após o banco estar criado
Substituir em cada página o import de `@/lib/mock` pelas funções de `@/lib/content.ts`:
- `getFeaturedPost()` → post com `featured=true` mais recente
- `getLatestPosts(n)` → posts recentes para a home
- `getPostsByType(type, n)` → listagens por seção
- `getReviews(n)` → reviews com join ao jogo
- `getReviewBySlug(slug)` → página de detalhe
- `getTop10BySlug(slug)` → ranking com todos os itens
- `getHowToPlayGuides(n)` → guias de regras

---

## Demais tarefas pendentes (em ordem de prioridade)
1. Conectar PT/EN switcher no Header (`useRouter` + `useLocale` do next-intl)
2. Páginas de detalhe: `/como-jogar/[slug]` e `/artigos/[slug]`
3. Página `/top10/[slug]` — ranking interativo com dados do banco
4. Admin/CMS para publicar conteúdo
5. `generateMetadata` em cada rota (SEO)
6. `app/sitemap.ts` dinâmico
7. Imagens reais dos jogos (Supabase Storage ou BGG API)
8. Deploy na Vercel
