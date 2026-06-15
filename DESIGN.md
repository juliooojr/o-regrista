# O Regrista — DESIGN

## Identidade visual
Light theme como padrão, dark theme como opção (toggle na navbar, salvo em localStorage). Layout magazine/editorial — coluna principal + sidebar com imagens dos jogos. Paleta limpa com acento âmbar/dourado remetendo a componentes premium de boardgame. Tipografia forte nos títulos (Bebas Neue) com corpo legível (Inter).

## Paleta de cores (CSS Variables — definidas em globals.css)

```css
/* Light theme — padrão */
:root {
  --background: #ffffff;
  --surface: #f7f6f3;
  --surface-elevated: #ffffff;
  --foreground: #1a1a1a;
  --muted: #6b6b6b;
  --muted-foreground: #999999;
  --accent: #c49a2a;        /* âmbar/dourado */
  --accent-foreground: #ffffff;
  --border: #e5e5e5;
  --border-subtle: #f0f0f0;
  --success: #2d8a55;
  --warning: #c47a15;
  --error: #c0392b;
}

/* Dark theme — warm brown, NUNCA preto puro */
[data-theme="dark"] {
  --background: #1e1b16;       /* warm dark brown */
  --surface: #272319;
  --surface-elevated: #312d23;
  --foreground: #f0ede8;
  --muted: #9a9490;
  --muted-foreground: #6b6662;
  --accent: #d4a843;
  --accent-foreground: #1e1b16;
  --border: #3a3529;
  --border-subtle: #2a2720;
  --success: #4caf79;
  --warning: #e8a030;
  --error: #e05555;
}
```

## Tipografia
| Uso | Fonte | Peso |
|-----|-------|------|
| Logo / títulos hero | Bebas Neue | 400 |
| Títulos de seção | Inter | 700 |
| Corpo de texto | Inter | 400–500 |
| Scores / notas | JetBrains Mono | 700 |
| Labels / badges | Inter | 600 |

## Escala de scores (scoreColor helper)
| Range | Cor CSS var | Significado |
|-------|-------------|-------------|
| ≥ 9.0 | `--success` verde | Obra-prima / Excelente |
| ≥ 7.5 | `--accent` âmbar | Muito bom |
| ≥ 6.0 | `--foreground` neutro | Bom |
| ≥ 4.0 | `--muted` cinza | Mediano |
| < 4.0 | `--error` vermelho | Fraco / Evitar |

## Type badges (TypeBadge)
| Tipo | Background | Texto |
|------|------------|-------|
| `review` | `#FAEEDA` | `#633806` |
| `article` | `#EAF3DE` | `#173404` |
| `top10` | `#E6F1FB` | `#042C53` |
| `how-to-play` | `#EEEDFE` | `#26215C` |

## Layout e espaçamento
- **Container:** max-width `1200px`, centrado, padding `0 24px`
- **Header:** sticky, height `56px`, z-index `50`
- **Grid homepage:** `1fr 300px` (principal + sidebar)
- **Grid reviews:** `repeat(3, 1fr)` desktop
- **Grid como-jogar:** `repeat(4, 1fr)` desktop
- **Footer:** sticky no fundo via flex-column `min-height: 100vh` + `flex: 1` no main

## Componentes visuais definidos
- **GameCover:** placeholder colorido com `cover_color` + label. Substituir por `<Image>` quando tiver imagens reais.
- **BoardGameBackground:** ícones SVG (dado, meeple, hexágono, estrela, carta, token) nos cantos laterais, `opacity: ~5%`, `position: fixed`, `z-index: 0`, `pointer-events: none`.
- **WeightBar (Top10):** barra de progresso 1–5 com cor gradiente verde→vermelho.
- **ChangeBadge (Top10):** ▲N verde (subiu), ▼N vermelho (caiu), — cinza (manteve), NOVO azul.
- **ScoreBar (Review detalhe):** barra horizontal para sub-scores.

## Imagens
- Durante desenvolvimento: placeholders coloridos (`cover_color` + `cover_label`)
- Produção: Supabase Storage para capas próprias, `cf.geekdo-images.com` para imagens do BGG
- Ambos já liberados em `next.config.ts` → `images.remotePatterns`

## Se quiser mudar a identidade
Altere os valores das CSS variables em `app/globals.css`. O Tailwind propaga via tokens do `tailwind.config.ts`.
