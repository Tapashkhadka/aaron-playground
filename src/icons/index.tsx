// ===== ICON SYSTEM — all visual icons loaded from asset files, no keyboard emoji =====
// Game content emoji (flashcard data, spelling words) still use EmojiIcon component

// ===== EMOJI → FILE MAPPING =====
const emojiToFile: Record<string, string> = {
  '🌟': 'sparkle', '⭐': 'star', '🌙': 'moon', '🔥': 'fire',
  '🚀': 'rocket', '🌈': 'rainbow', '🏆': 'trophy', '🎉': 'celebration',
  '🎮': 'gamepad', '📚': 'book', '🎨': 'palette', '🧠': 'brain',
  '🧩': 'puzzle', '🔬': 'microscope', '🔢': 'numbers', '🐍': 'snake',
  '🫧': 'bubbles', '🔺': 'triangle', '🐾': 'paw', '📝': 'notepad',
  '🔷': 'diamond', '🤔': 'thinking', '📏': 'ruler', '✏️': 'pencil',
  '⌨️': 'keyboard', '📇': 'card', '🎯': 'target', '💎': 'gem',
  '🧮': 'abacus', '💡': 'lightbulb', '✨': 'sparkle',
  '🔄': 'reload', '👆': 'point-up',
  '2players': 'two-players', 'robot': 'robot',
}

export function iconPath(emoji: string): string {
  const name = emojiToFile[emoji]
  if (name) return `/aaron-playground/icons/${name}.svg`
  // Return empty string for unrecognized — caller handles fallback
  return ''
}

// ===== MAIN ICON COMPONENT =====
// Renders an <img> loading from the file-based icon asset
export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const path = iconPath(name)
  if (!path) {
    // Fallback for unmapped icons — render as styled emoji text
    return (
      <span style={{ fontSize: size, lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
        {name}
      </span>
    )
  }
  return <img src={path} alt="" width={size} height={size} className={className} style={{ display: 'block' }} />
}

// ===== EMOJI ICON WRAPPER =====
// For game content emoji (flashcards, spelling words) — styled container, keeps the emoji
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

// ===== TIC-TAC-TOE X & O =====
// Keep these as inline SVGs because they're special colored game graphics
export function TicTacX({ size = 52 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" width={size} height={size}>
      <defs><filter id="xShadow"><feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(255,107,107,0.35)"/></filter></defs>
      <line x1="80" y1="80" x2="440" y2="440" stroke="#FF6B6B" strokeWidth="64" strokeLinecap="round" filter="url(#xShadow)"/>
      <line x1="440" y1="80" x2="80" y2="440" stroke="#FF6B6B" strokeWidth="64" strokeLinecap="round" filter="url(#xShadow)"/>
    </svg>
  )
}

export function TicTacO({ size = 52 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" width={size} height={size}>
      <defs><filter id="oShadow"><feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(107,203,119,0.35)"/></filter></defs>
      <circle cx="260" cy="260" r="170" fill="none" stroke="#6BCB77" strokeWidth="64" filter="url(#oShadow)"/>
    </svg>
  )
}
