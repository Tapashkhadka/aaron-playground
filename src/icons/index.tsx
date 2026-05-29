// ===== ICON SYSTEM — all visual icons from Iconify CDN, no keyboard emoji =====

/** Map game/category keys to Iconify icon names and background colors */
const gameIcons: Record<string, { icon: string; bg: string; label: string }> = {
  // Games
  math:       { icon: 'mdi:calculator-variant', bg: '#FF6B6B', label: 'Math' },
  science:    { icon: 'mdi:flask', bg: '#6BCB77', label: 'Science' },
  memory:     { icon: 'mdi:brain', bg: '#AA96DA', label: 'Memory' },
  snake:      { icon: 'mdi:snake', bg: '#30D5C8', label: 'Snake' },
  puzzles:    { icon: 'mdi:puzzle', bg: '#FF9500', label: 'Puzzles' },
  bubbles:    { icon: 'mdi:chart-bubble', bg: '#4A90D9', label: 'Bubbles' },
  colors:     { icon: 'mdi:palette-swatch', bg: '#FF69B4', label: 'Colors' },
  shapes:     { icon: 'mdi:shape', bg: '#FF6B6B', label: 'Shapes' },
  animals:    { icon: 'mdi:paw', bg: '#6BCB77', label: 'Animals' },
  spelling:   { icon: 'mdi:alphabetical-variant', bg: '#AA96DA', label: 'Spelling' },
  counting:   { icon: 'mdi:numeric', bg: '#30D5C8', label: 'Counting' },
  patterns:   { icon: 'mdi:rhombus-split', bg: '#FF9500', label: 'Patterns' },
  riddles:    { icon: 'mdi:head-question', bg: '#4A90D9', label: 'Riddles' },
  bigger:     { icon: 'mdi:compare', bg: '#FF69B4', label: 'Compare' },
  tictactoe:  { icon: 'mdi:grid', bg: '#FF6B6B', label: 'Tic-Tac-Toe' },
  drawing:    { icon: 'mdi:draw', bg: '#6BCB77', label: 'Drawing' },
  typing:     { icon: 'mdi:keyboard', bg: '#AA96DA', label: 'Typing' },
  flashcards: { icon: 'mdi:card-text', bg: '#30D5C8', label: 'Flash Cards' },
  guesswho:   { icon: 'mdi:account-question', bg: '#FF9500', label: 'Guess Who' },
  // Categories
  play:       { icon: 'mdi:gamepad-variant', bg: '#FF6B6B', label: 'Play' },
  study:      { icon: 'mdi:book-open-page-variant', bg: '#6BCB77', label: 'Study' },
  create:     { icon: 'mdi:brush', bg: '#AA96DA', label: 'Create' },
  braingames: { icon: 'mdi:brain', bg: '#FFD93D', label: 'Brain Games' },
}

/** Special purpose icons (streak, milestone, etc.) */
const specialIcons: Record<string, { icon: string; bg: string }> = {
  stars:      { icon: 'mdi:star', bg: '#FFD93D' },
  fire:       { icon: 'mdi:fire', bg: '#FF6B6B' },
  trophy:     { icon: 'mdi:trophy', bg: '#FFD93D' },
  sparkle:    { icon: 'mdi:star-four-points', bg: '#FFD93D' },
  rocket:     { icon: 'mdi:rocket-launch', bg: '#FF6B6B' },
  rainbow:    { icon: 'mdi:weather-rainbow', bg: '#6BCB77' },
  celebration:{ icon: 'mdi:party-popper', bg: '#AA96DA' },
  reload:     { icon: 'mdi:refresh', bg: '#555' },
  back:       { icon: 'mdi:arrow-left', bg: '#FF6B6B' },
  gamepad:    { icon: 'mdi:gamepad-variant', bg: '#FF6B6B' },
  palette:    { icon: 'mdi:palette', bg: '#AA96DA' },
  gem:        { icon: 'mdi:diamond', bg: '#AA96DA' },
  lightbulb:  { icon: 'mdi:lightbulb-on', bg: '#FFD93D' },
  check:      { icon: 'mdi:check', bg: '#6BCB77' },
  close:      { icon: 'mdi:close', bg: '#FF6B6B' },
}

function getIconInfo(key: string) {
  return gameIcons[key] || specialIcons[key] || null
}

function iconifyUrl(name: string, color: string = 'white'): string {
  return `https://api.iconify.design/${name}.svg?color=${encodeURIComponent(color)}`
}

// ===== GAME ICON COMPONENT =====
// Renders a colored circle with an Iconify SVG inside
export function GameIcon({ name, size = 44 }: { name: string; size?: number }) {
  const info = getIconInfo(name)
  if (!info) {
    // Fallback: render a gray circle with a question mark
    const fallbackUrl = iconifyUrl('mdi:help-circle', 'white')
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: '#999',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img src={fallbackUrl} alt="" width={Math.round(size * 0.55)} height={Math.round(size * 0.55)} style={{ display: 'block' }} />
      </div>
    )
  }

  const svgSize = Math.round(size * 0.55)
  const url = iconifyUrl(info.icon, 'white')

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: info.bg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <img src={url} alt={info.label || ''} width={svgSize} height={svgSize} style={{ display: 'block' }} />
    </div>
  )
}

// ===== SIMPLE INLINE ICON (no background circle) =====
export function IconifyIcon({ name, size = 24 }: { name: string; size?: number }) {
  const info = getIconInfo(name)
  let iconName: string
  if (info) {
    iconName = info.icon
  } else if (name.includes(':')) {
    // Already an Iconify icon name like 'mdi:lion'
    iconName = name
  } else {
    iconName = 'mdi:help-circle'
  }
  const url = iconifyUrl(iconName, 'currentColor')
  return (
    <img src={url} alt="" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
  )
}

// ===== Legacy Icon (kept for backward compat in existing code that calls Icon()) =====
// Now delegates to GameIcon for game keys or renders IconifyIcon for others
export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const info = getIconInfo(name)
  if (info) {
    const svgSize = Math.round(size * 0.55)
    const url = iconifyUrl(info.icon, 'white')
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          borderRadius: '50%',
          background: info.bg,
          flexShrink: 0,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        }}
      >
        <img src={url} alt={info.label || ''} width={svgSize} height={svgSize} style={{ display: 'block' }} />
      </span>
    )
  }

  // If the name matches an iconify pattern directly
  if (name.includes(':')) {
    const url = iconifyUrl(name, 'currentColor')
    return <img src={url} alt="" width={size} height={size} className={className} style={{ display: 'inline-block' }} />
  }

  // Fallback: try to find a matching special icon by key
  const special = specialIcons[name]
  if (special) {
    const svgSize = Math.round(size * 0.55)
    const url = iconifyUrl(special.icon, 'white')
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          borderRadius: '50%',
          background: special.bg,
          flexShrink: 0,
        }}
      >
        <img src={url} alt="" width={svgSize} height={svgSize} style={{ display: 'block' }} />
      </span>
    )
  }

  // Absolute fallback: show nothing
  return null
}

// ===== TIC-TAC-TOE X & O — keep as inline SVGs =====
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
