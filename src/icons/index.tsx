import { type JSX } from 'react'

// ===== ICON SIZE =====
type IconProps = { size?: number; className?: string }

function viewBox(size = 24) {
  return `0 0 ${size} ${size}`
}

// ===== SVG ICON COMPONENTS =====
export function IconStar({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
    </svg>
  )
}

export function IconSparkle({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 2l1.53 4.47L18 8l-4.47 1.53L12 14l-1.53-4.47L6 8l4.47-1.53L12 2zm-6 8l.77 2.23L9 13l-2.23.77L6 16l-.77-2.23L3 13l2.23-.77L6 10zm12 0l.77 2.23L21 13l-2.23.77L18 16l-.77-2.23L15 13l2.23-.77L18 10z" fill="currentColor" />
    </svg>
  )
}

export function IconFlame({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 23c-4.97 0-9-3.58-9-8 0-3 2-6 4-8l1-1c1-1 2-3 4-5 0 3 1 5 2 7 .5 1 1 2 1.5 2.5C16.5 11 17 12 17 13.5c0 1.66-1.12 3-2.5 3.5C13.12 17.5 12 16.66 12 15c0-1 .5-2 1-3-.5-1-1-2-2-3 0 2-.5 4-1.5 5-.5.5-1 1-1 2 0 1.1.9 2 2 2s2-.9 2-2c0-.5-.2-1-.5-1.5.3 0 .5.3.5.5 0 1.66-1.34 3-3 3s-3-1.34-3-3c0-1.66 1.34-3 3-3h1c-1-1-2-2-2-4 0-2 1-4 2-5-1.5 1.5-3 3.5-4 5.5C5 13 5 16 7 18s4 3 5 3c2 0 4-1 5-3s2-4 2-6c0-2-1-4-2-5 1 1 2 3 2 5 0 4-3 8-7 8z" fill="currentColor" />
    </svg>
  )
}

export function IconRocket({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 2c-3 0-6 2-7 8 0 3 1 6 2 8l5 4 5-4c1-2 2-5 2-8-1-6-4-8-7-8zm0 2c2 0 4 1.5 5 6 .5 2 0 4-1 6l-4 3-4-3c-1-2-1.5-4-1-6C8 5.5 10 4 12 4zm0 4a2 2 0 100 4 2 2 0 000-4z" fill="currentColor" />
      <path d="M4 14l-2 4 3 1 1-3-2-2zm16 0l2 4-3 1-1-3 2-2z" fill="currentColor" />
    </svg>
  )
}

export function IconRainbow({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 5a13 13 0 00-13 9h3a10 10 0 0120 0h3a13 13 0 00-13-9zm0 4a9 9 0 00-9 5h3a6 6 0 0112 0h3a9 9 0 00-9-5zm0 4a5 5 0 00-5 3h3a2 2 0 014 0h3a5 5 0 00-5-3z" fill="currentColor" />
    </svg>
  )
}

export function IconTrophy({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 2c-2 0-4 2-4 4v2c0 1-.5 2-1.5 3C5 12 4 13.5 4 15v1h5v1l3 3 3-3v-1h5v-1c0-1.5-1-3-2.5-4C16.5 10 16 9 16 8V6c0-2-2-4-4-4zm0 2c1 0 2 1 2 2v2c0 1.5.8 2.8 2 4 .8.8 1.5 1.5 1.8 2H6.2c.3-.5 1-1.2 1.8-2 1.2-1.2 2-2.5 2-4V6c0-1 1-2 2-2z" fill="currentColor" />
      <path d="M7 17v1l5 3 5-3v-1H7z" fill="currentColor" />
    </svg>
  )
}

export function IconCelebration({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M2 22l4-12 4 8 3-6 3 6 4-8 2 12H2z" fill="currentColor" />
    </svg>
  )
}

export function IconGamepad({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M7 5a5 5 0 00-5 5v4a5 5 0 0010 0v-1h4v1a5 5 0 0010 0v-4a5 5 0 00-5-5h-2l-1 2h-2l-1-2H7zm0 2h2l1 2h4l1-2h2a3 3 0 013 3v4a3 3 0 01-6 0v-1H8v1a3 3 0 01-6 0v-4a3 3 0 013-3zm1 3v2H6v-2h2zm10 0h2v2h-2v-2z" fill="currentColor" />
    </svg>
  )
}

export function IconBook({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M4 5v14a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2zm2 0h12v14H6V5zm2 2v2h8V7H8zm0 4v2h6v-2H8z" fill="currentColor" />
    </svg>
  )
}

export function IconPalette({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.3-.5-.8-.5-1.3 0-1.1.9-2 2-2h2c4.42 0 6-3.58 6-6 0-4.42-3.58-8-8-8zm0 2a6 6 0 016 6c0 1.5-.6 2-2 2h-2c-2.21 0-4 1.79-4 4 0 1 .4 2 1 2.68.3.28.5.7.5 1.32 0 .55-.45 1-1 1-4.42 0-8-3.58-8-8s3.58-8 8-8zM7.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm3-4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor" />
    </svg>
  )
}

export function IconBrain({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 2a5 5 0 00-4.5 2.7A4 4 0 003 8.5a4 4 0 001.5 3.1A4 4 0 003 14.5a4 4 0 003 3.9V20a2 2 0 002 2h1l1-2 1 2h2l1-2 1 2h1a2 2 0 002-2v-1.6a4 4 0 003-3.9 4 4 0 00-1.5-2.9A4 4 0 0021 8.5a4 4 0 00-4.5-3.8A5 5 0 0012 2zm0 2a3 3 0 013 3v.5l.5-.1a2 2 0 012.5 2.3l-.2.5.4.3a2 2 0 010 3.1l-.4.3.2.5a2 2 0 01-2 2.4l-.5-.1-.1.5A2 2 0 0114 18h-4a2 2 0 01-1.9-1.7l-.1-.5-.5.1a2 2 0 01-2-2.4l.2-.5-.4-.3a2 2 0 010-3.1l.4-.3-.2-.5a2 2 0 012.5-2.3l.5.1V7a3 3 0 013-3z" fill="currentColor" />
    </svg>
  )
}

export function IconPuzzle({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M20 12a4 4 0 01-4 4h-3a2 2 0 00-2 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2h.5a2.5 2.5 0 000-5H5a2 2 0 01-2-2V5a2 2 0 012-2h4a2 2 0 012 2v.5a2.5 2.5 0 005 0V5a2 2 0 012-2h4a2 2 0 012 2v7z" fill="currentColor" />
    </svg>
  )
}

export function IconMicroscope({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M8 2a4 4 0 014 4v2a4 4 0 01-3 3.87V14h5a4 4 0 014 4v2h2v2H4v-2h2v-2a4 4 0 014-4h1v-2.13A4 4 0 018 8V6a4 4 0 014-4 4 4 0 014 4h-2a2 2 0 00-4 0v2a2 2 0 004 0h2a4 4 0 01-3 3.87V14h5a4 4 0 014 4v2h2v2H4v-2h2v-2a4 4 0 014-4h1v-2.13A4 4 0 018 8V6a2 2 0 012-2 2 2 0 012 2v2a2 2 0 01-4 0V6a4 4 0 014-4z" fill="currentColor" />
    </svg>
  )
}

export function IconNumbers({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z" fill="currentColor" />
    </svg>
  )
}

export function IconSnake({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M4 2h14a4 4 0 014 4v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v4a2 2 0 002 2h2a4 4 0 014 4v2a2 2 0 01-2 2H6a4 4 0 01-4-4v-2a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2V16a2 2 0 00-2-2H8a4 4 0 01-4-4V6a4 4 0 014-4z" fill="currentColor" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function IconBubbles({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <circle cx="8" cy="8" r="5" fill="currentColor" />
      <circle cx="18" cy="10" r="4" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="18" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="6" cy="17" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export function IconTriangle({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 3L3 20h18L12 3z" fill="currentColor" />
    </svg>
  )
}

export function IconPaw({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <ellipse cx="8" cy="14" rx="3" ry="4" fill="currentColor" />
      <ellipse cx="16" cy="14" rx="3" ry="4" fill="currentColor" />
      <circle cx="7" cy="7" r="2.5" fill="currentColor" />
      <circle cx="17" cy="7" r="2.5" fill="currentColor" />
      <circle cx="12" cy="5" r="2.5" fill="currentColor" />
    </svg>
  )
}

export function IconNotepad({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z" fill="currentColor" />
    </svg>
  )
}

export function IconDiamond({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 2L2 12l10 10 10-10L12 2z" fill="currentColor" />
    </svg>
  )
}

export function IconThinking({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" />
      <path d="M8 14c.5 2 2 3 4 3s3.5-1 4-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function IconRuler({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M4 4h16v2h-2v2h2v2h-2v2h2v2h-2v2h2v2H4v-2h2v-2H4v-2h2v-2H4V8h2V6H4V4z" fill="currentColor" />
    </svg>
  )
}

export function IconPencil({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M15.5 3.5a2.12 2.12 0 013 3L7 18l-4 1 1-4 11.5-11.5z" fill="currentColor" />
    </svg>
  )
}

export function IconKeyboard({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="5" y="9" width="3" height="2" fill="currentColor" rx="0.5" />
      <rect x="10.5" y="9" width="3" height="2" fill="currentColor" rx="0.5" />
      <rect x="16" y="9" width="3" height="2" fill="currentColor" rx="0.5" />
      <rect x="7.75" y="14" width="8.5" height="2" fill="currentColor" rx="0.5" />
    </svg>
  )
}

export function IconCard({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconTarget({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

export function IconGem({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 2l4 7h-3l-1-5-1 5H8l4-7z" fill="currentColor" />
      <path d="M12 9l5 7h-3l-2-4-2 4H7l5-7z" fill="currentColor" />
      <path d="M7 16l2 6 3-4-2-2H7z" fill="currentColor" />
      <path d="M17 16l-2 6-3-4 2-2h3z" fill="currentColor" />
    </svg>
  )
}

export function IconAbacus({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <circle cx="16" cy="8" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="6" cy="16" r="2" fill="currentColor" />
      <circle cx="18" cy="16" r="2" fill="currentColor" />
    </svg>
  )
}

export function IconLightbulb({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M10 22h4v-2h-4v2zm1-20a6 6 0 00-3 11.1c1 .7 2 2 2 3.9h4c0-1.9 1-3.2 2-3.9A6 6 0 0011 2zm0 2a4 4 0 012 7.3c-.7.5-1.5 1.4-1.7 2.7h-.6c-.2-1.3-1-2.2-1.7-2.7A4 4 0 0111 4z" fill="currentColor" />
    </svg>
  )
}

export function IconArrowRight({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function IconMoon({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <path d="M12 3a9 9 0 100 18 7 7 0 01-7-9 7 7 0 017-9z" fill="currentColor" />
    </svg>
  )
}

// ===== EMOJI TO ICON MAP =====

const iconMap = {
  '🌟': IconSparkle,
  '⭐': IconStar,
  '🌙': IconMoon,
  '🔥': IconFlame,
  '🚀': IconRocket,
  '🌈': IconRainbow,
  '🏆': IconTrophy,
  '🎉': IconCelebration,
  '🎮': IconGamepad,
  '📚': IconBook,
  '🎨': IconPalette,
  '🧠': IconBrain,
  '🧩': IconPuzzle,
  '🔬': IconMicroscope,
  '🔢': IconNumbers,
  '🐍': IconSnake,
  '🫧': IconBubbles,
  '🔺': IconTriangle,
  '🐾': IconPaw,
  '📝': IconNotepad,
  '🔷': IconDiamond,
  '🤔': IconThinking,
  '📏': IconRuler,
  '✏️': IconPencil,
  '⌨️': IconKeyboard,
  '📇': IconCard,
  '🎯': IconTarget,
  '💎': IconGem,
  '🧮': IconAbacus,
  '💡': IconLightbulb,
  '✨': IconSparkle,
  'X': TicTacX,
  'O': TicTacO,
}

// Fallback for emojis that don't have a mapped icon
function IconFallback({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox(size)} width={size} height={size} fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" fill="none" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  )
}

// ===== EMOJI ICON WRAPPER (replaces emoji text with styled container) =====
export function EmojiIcon({ emoji, size = 36, className = '' }: { emoji: string; size?: number; className?: string }) {
  return (
    <span className={`emoji-icon ${className}`} style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      fontSize: size * 0.6,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      userSelect: 'none',
    }} role="img">
      {emoji}
    </span>
  )
}

// ===== TIC-TAC-TOE X & O ICONS =====
// Bold, thick X and O — big enough to fill the cell

export function TicTacX({ size = 52, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" width={size} height={size} className={className}>
      <defs>
        <filter id="xShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(255,107,107,0.35)"/>
        </filter>
      </defs>
      {/* X — two thick crossing lines */}
      <line x1="80" y1="80" x2="440" y2="440" stroke="#FF6B6B" strokeWidth="64" strokeLinecap="round" filter="url(#xShadow)"/>
      <line x1="440" y1="80" x2="80" y2="440" stroke="#FF6B6B" strokeWidth="64" strokeLinecap="round" filter="url(#xShadow)"/>
    </svg>
  )
}

export function TicTacO({ size = 52, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" width={size} height={size} className={className}>
      <defs>
        <filter id="oShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(107,203,119,0.35)"/>
        </filter>
      </defs>
      {/* O — a thick circle */}
      <circle cx="260" cy="260" r="170" fill="none" stroke="#6BCB77" strokeWidth="64" filter="url(#oShadow)"/>
    </svg>
  )
}

// ===== MAIN ICON COMPONENT =====
export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const Component = (iconMap as Record<string, ((props: IconProps) => JSX.Element) | undefined>)[name] || IconFallback
  return <Component size={size} className={className} />
}

// ===== HELPER: render icon for emoji from game data =====
export function iconForEmoji(emoji: string, size = 24) {
  // Strip variation selectors (e.g. \uFE0F)
  const clean = emoji.replace(/\uFE0F/g, '')
  const Component = (iconMap as Record<string, ((props: IconProps) => JSX.Element) | undefined>)[clean] || IconFallback
  return <Component size={size} />
}
