# Regras para o Claude — O Regrista

## Leitura obrigatória antes de qualquer tarefa
1. **BRAIN.md** — visão, stack, tipos de conteúdo, regras de negócio, status atual
2. **DESIGN.md** — paleta, tipografia, componentes, escala de scores
3. **SCHEMA.md** — tabelas, relacionamentos, RLS
4. **TASKS.md** — o que está pendente e o que já foi feito

## Regras gerais
- Nunca remova arquivos de documentação (BRAIN, DESIGN, AGENTS, SCHEMA, TASKS) sem instrução explícita.
- Sempre que criar ou alterar uma tabela no Supabase, atualize SCHEMA.md.
- Sempre que concluir uma tarefa, marque como feita em TASKS.md com a data.
- Ao iniciar uma nova sessão de trabalho, atualize TASKS.md com o que for feito.

## Convenções de código
- TypeScript strict — sem `any` explícito.
- Componentes: PascalCase. Funções utilitárias: camelCase.
- Queries ao banco sempre em `lib/content.ts` — nunca diretamente no componente.
- Variáveis de ambiente com prefixo `NEXT_PUBLIC_` apenas para o que o browser precisa.
- Server Components por padrão; `'use client'` só quando necessário (hooks, interatividade).
- Estilos via `style={}` inline (sem classes Tailwind no JSX) por consistência com o padrão atual do projeto.

## Convenções de conteúdo
- Slugs: kebab-case, únicos por tipo de post.
- Score: número 0–10, uma casa decimal.
- Status de posts: `draft | published | archived` — nunca deletar, só arquivar.
- Conteúdo bilíngue: `*_pt` obrigatório, `*_en` opcional.

## Banco de dados
- Não fazer queries diretas a tabelas — usar as funções de `lib/content.ts`.
- Ao adicionar campos às tabelas, criar nova migration em `supabase/migrations/` com número sequencial.
- Nunca alterar `001_initial_schema.sql` depois de executado — criar `002_`, `003_`...

## Componentes reutilizáveis
Os seguintes componentes estão em `components/content/shared.tsx` e devem ser importados, não recriados:
- `TypeBadge`, `GameCover`, `ReviewCard`, `HowToPlayCard`, `PageHeader`
- `formatDate`, `scoreColor`, `sectionLabel`

## SEO
- Toda rota pública deve ter `generateMetadata` com título, descrição e og:image.
- Manter `sitemap.ts` atualizado ao adicionar novas rotas públicas.

## i18n
- Textos de interface: sempre via `useTranslations` do next-intl.
- Conteúdo de posts: via campos `*_pt` e `*_en` do banco, usando o helper `localizedTitle/Excerpt/Content` de `lib/content.ts`.
- PT-BR é o locale padrão (sem prefixo de URL). Inglês usa `/en/`.
