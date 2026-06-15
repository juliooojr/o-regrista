# O Regrista — TASKS

## Próximos passos prioritários

- [ ] Rodar `git init` + push inicial para `juliooojr/o-regrista` (ver comandos abaixo)
- [ ] Deploy na Vercel com env vars
- [ ] Imagens reais dos jogos (Supabase Storage ou API BGG)
- [ ] Admin/CMS para publicar conteúdo (Supabase Studio por ora)
- [ ] Markdown renderizado no corpo dos posts (biblioteca `marked` ou `remark`)
- [ ] Top10/página listing conectada ao banco — ✅ feito (sessão 4)

## Comandos git (rodar no terminal)

```bash
cd "C:\Users\Julio Jr\Desktop\o-regrista"
git init
git add .
git commit -m "feat: initial commit — scaffold completo + todas as páginas públicas"
git branch -M main
git remote add origin https://github.com/juliooojr/o-regrista.git
git push -u origin main
```

## Concluído

### 2026-06-14 (sessão 4)
- [x] `lib/i18n/navigation.ts` — criado com `createNavigation` do next-intl para navegação locale-aware
- [x] `components/layout/Header.tsx` — PT/EN switcher funcional via `useLocale` + `useRouter` do next-intl
- [x] `app/[locale]/artigos/[slug]/page.tsx` — página de detalhe com sidebar de artigos relacionados
- [x] `app/[locale]/como-jogar/[slug]/page.tsx` — página de detalhe com sidebar de outros guias
- [x] `app/[locale]/top10/[slug]/page.tsx` — ranking interativo com itens do banco (ChangeBadge, WeightBar)
- [x] `app/[locale]/top10/page.tsx` — migrado de mock data para dados reais do Supabase
- [x] `lib/content.ts` — adicionado `getHowToPlayBySlug`, `getArticleBySlug`, `getAllPublishedPosts`
- [x] `generateMetadata` em todas as rotas públicas (homepage, listagens e páginas de detalhe)
- [x] `app/sitemap.ts` — dinâmico a partir de `getAllPublishedPosts()` com changeFrequency e priority

### 2026-06-14 (sessão 3)
- [x] Diagnosticado e corrigido typo no `.env.local`: URL era `zvuvwwlzlmnpzlwxfzfrd` (errado) → `zvuwwlzlmnpzlwxfzfrd` (correto). Causa do ENOTFOUND.
- [x] Confirmado: Supabase conectado, projeto Healthy, banco populado com seed.

### 2026-06-14 (sessão 2)
- [x] Criado projeto Supabase, configurado `.env.local` com URL e anon key
- [x] `components/content/shared.tsx` migrado de `MockPost` para `Post`/`ReviewFull`
- [x] `app/[locale]/page.tsx` — homepage async, dados do Supabase
- [x] `app/[locale]/reviews/page.tsx` — async, `getReviews(50)`
- [x] `app/[locale]/reviews/[slug]/page.tsx` — async, `getReviewBySlug()`, sub-scores reais
- [x] `app/[locale]/artigos/page.tsx` — async, `getPostsByType('article')`
- [x] `app/[locale]/como-jogar/page.tsx` — async, `getHowToPlayGuides()`
- [x] `app/[locale]/sobre/page.tsx` — async, `getReviews(3)` na sidebar
- [x] Zero imports de `lib/mock` restantes no projeto

### 2026-06-14 (sessão 1)
- [x] Scaffold do projeto (Next.js 15, TypeScript, App Router)
- [x] Dependências instaladas: next-intl, @supabase/ssr, @fontsource/*, tailwindcss v4
- [x] Arquivos de documentação: BRAIN.md, DESIGN.md, AGENTS.md, CLAUDE.md, SCHEMA.md, TASKS.md
- [x] i18n configurado: `i18n/request.ts`, `lib/i18n/routing.ts`, `middleware.ts`
- [x] `messages/pt.json` e `messages/en.json`
- [x] Todos os componentes de layout e conteúdo criados
- [x] `lib/content.ts` — tipos TypeScript + queries Supabase iniciais
- [x] `supabase/migrations/001_initial_schema.sql` + `supabase/seed.sql`
- [x] `SCHEMA.md` — documentação de todas as tabelas
