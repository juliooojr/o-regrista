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

## Estado atual (2026-06-24, sessão 11)

### ✅ Páginas concluídas
- **Homepage** — featured post + sidebar recentes + grid reviews + como-jogar
- **Reviews** — listagem + detalhe com markdown, sub-scores em estrelas, ficha técnica, sidebar
- **Artigos** — bloqueada com "Em breve 🚧"
- **Como Jogar** — listagem + detalhe
- **Sobre** — bio, avatar, stats dinâmicos, WhatsApp
- **Top 10** — lista principal + páginas dinâmicas por slug (sidebar "Outras listas", ratings BGG+Ludo)
- **Primeira review** — Shackleton Base, nota 10.0, markdown completo

### ✅ Fix 500 em produção — RESOLVIDO (sessão 11)
Root cause identificado e corrigido: `[locale]/layout.tsx` precisava exportar `generateStaticParams` (padrão next-intl). Sem ele, o Next.js tentava pre-gerar rotas `[slug]` filhas sem contexto de locale → crash silencioso → 500 em produção. Em desenvolvimento (`next dev`) nunca se manifestava.

**Fix aplicado:** `app/[locale]/layout.tsx` agora exporta:
```ts
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
```
Commit `91bfa3d`, confirmado 200 em produção.

### ✅ Top 10 Party Games — CÓDIGO PRONTO (sessão 11)
- `app/[locale]/top10/[slug]/page.tsx` — reescrito sem null bytes, estilo idêntico ao page.tsx
- `supabase/top10_party_games_seed.sql` — gerado, **ainda não executado em produção**
- **Ação manual pendente:** executar o SQL no Supabase SQL Editor

**Jogos do seed (IDs `000...0022` a `000...0030`):**
| Pos | Jogo | BGG ID | ID DB |
|-----|------|--------|-------|
| 1 | Codenames | 178900 | 000...0012 |
| 2 | Passaporte Mundo | 413920 | 000...0022 |
| 3 | Flip 7 | 420087 | 000...0023 |
| 4 | Citadels | 478 | 000...0024 |
| 5 | Telestrations | 46213 | 000...0025 |
| 6 | Cabanga! (Snailed It!) | 394889 | 000...0026 |
| 7 | BANG! | 3955 | 000...0027 |
| 8 | Dobble (Spot it!) | 63268 | 000...0028 |
| 9 | Imagem & Ação | 13512 | 000...0029 |
| 10 | Exploding Kittens | 172225 | 000...0030 |

### ✅ Banco de dados (Supabase)
- Projeto ID: `zvuwwlzlmnpzlwxfzfrd`, região `sa-east-1`
- Migrations executadas: `001_initial_schema.sql`, `002_game_ratings.sql`
- Seeds executados: `top10_seed.sql`, `review_shackleton_base.sql`
- **Pendente em produção:** `top10_party_games_seed.sql`

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

(Os demais foram limpos em sessões anteriores.)

## Próximo passo sugerido
Criar a **segunda review** — definir o jogo com Julio, escrever o conteúdo em markdown, gerar o SQL seed e publicar.
