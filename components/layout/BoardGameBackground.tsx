// Decorative board-game icons scattered in the side margins.
// Opacity is very low — purely atmospheric, never interferes with content.

function DiceIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect x="2" y="2" width="28" height="28" rx="5" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="10" cy="10" r="2" fill="currentColor"/>
      <circle cx="22" cy="10" r="2" fill="currentColor"/>
      <circle cx="22" cy="22" r="2" fill="currentColor"/>
      <circle cx="10" cy="22" r="2" fill="currentColor"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
    </svg>
  )
}

function HexIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  )
}

function MeepleIcon() {
  return (
    <svg viewBox="0 0 32 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="16" cy="6" r="5"/>
      <path d="M4 17 C4 12 8 11 16 11 C24 11 28 12 28 17 L26 26 H6 Z"/>
      <rect x="5" y="25" width="8" height="9" rx="2"/>
      <rect x="19" y="25" width="8" height="9" rx="2"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <polygon
        points="16,2 19.5,12 30,12 21.5,18.5 24.5,29 16,23 7.5,29 10.5,18.5 2,12 12.5,12"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
      />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect x="2" y="2" width="20" height="30" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="6" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="6" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function TokenIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

type IconName = 'dice' | 'hex' | 'meeple' | 'star' | 'card' | 'token'

const ICON_MAP: Record<IconName, () => JSX.Element> = {
  dice: DiceIcon,
  hex: HexIcon,
  meeple: MeepleIcon,
  star: StarIcon,
  card: CardIcon,
  token: TokenIcon,
}

interface IconDef {
  icon: IconName
  // position from nearest edge, in px — always placed outside the 1200px content area
  side: 'left' | 'right'
  edgePx: number      // px from that side edge
  topVh: number       // vh from top
  size: number        // px
  rotation: number    // degrees
  opacity: number     // 0–1 (already multiplied by base 0.06)
}

const ICONS: IconDef[] = [
  // Left side
  { icon: 'dice',   side: 'left',  edgePx: 24,  topVh: 12,  size: 52, rotation: -15, opacity: 1 },
  { icon: 'hex',    side: 'left',  edgePx: 40,  topVh: 35,  size: 40, rotation: 10,  opacity: 0.8 },
  { icon: 'meeple', side: 'left',  edgePx: 16,  topVh: 58,  size: 44, rotation: 5,   opacity: 0.9 },
  { icon: 'token',  side: 'left',  edgePx: 48,  topVh: 78,  size: 36, rotation: -8,  opacity: 0.7 },
  { icon: 'card',   side: 'left',  edgePx: 20,  topVh: 90,  size: 38, rotation: 12,  opacity: 0.75 },
  // Right side
  { icon: 'star',   side: 'right', edgePx: 20,  topVh: 10,  size: 48, rotation: 18,  opacity: 0.9 },
  { icon: 'card',   side: 'right', edgePx: 44,  topVh: 30,  size: 42, rotation: -10, opacity: 0.8 },
  { icon: 'dice',   side: 'right', edgePx: 18,  topVh: 52,  size: 36, rotation: 8,   opacity: 0.75 },
  { icon: 'hex',    side: 'right', edgePx: 50,  topVh: 70,  size: 50, rotation: -5,  opacity: 1 },
  { icon: 'meeple', side: 'right', edgePx: 22,  topVh: 88,  size: 40, rotation: -14, opacity: 0.85 },
]

export default function BoardGameBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {ICONS.map((def, i) => {
        const Icon = ICON_MAP[def.icon]
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              [def.side]: def.edgePx,
              top: `${def.topVh}vh`,
              width: def.size,
              height: def.size,
              transform: `rotate(${def.rotation}deg)`,
              color: 'var(--foreground)',
              opacity: 0.055 * def.opacity,
            }}
          >
            <Icon />
          </div>
        )
      })}
    </div>
  )
}
