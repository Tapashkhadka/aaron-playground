import { useRef, useState } from 'react'
import './App.css'

type GameKey =
  | 'math'
  | 'science'
  | 'memory'
  | 'patterns'
  | 'spelling'
  | 'colors'
  | 'counting'
  | 'shapes'
  | 'animals'
  | 'bigger'
  | 'riddles'
  | 'puzzles'
  | 'snake'

type ChoiceGameKey = Exclude<GameKey, 'memory' | 'snake' | 'puzzles'>

type ChoiceRound = {
  prompt: string
  answers: string[]
  correct: string
  helper?: string
}

type GameInfo = {
  key: GameKey
  title: string
  description: string
}

const gameInfo: GameInfo[] = [
  { key: 'math', title: 'Math Quest', description: '100+ number puzzles.' },
  { key: 'science', title: 'Science Lab', description: '100+ curious facts.' },
  { key: 'memory', title: 'Memory Match', description: '100+ matching boards.' },
  { key: 'patterns', title: 'Pattern Pop', description: '100+ pattern rounds.' },
  { key: 'spelling', title: 'Word Builder', description: '100+ picture words.' },
  { key: 'colors', title: 'Color Quest', description: '100+ color taps.' },
  { key: 'counting', title: 'Counting Stars', description: '100+ count games.' },
  { key: 'shapes', title: 'Shape Safari', description: 'Easy shape practice.' },
  { key: 'animals', title: 'Animal Sounds', description: 'Match animals and sounds.' },
  { key: 'bigger', title: 'Bigger or Smaller', description: 'Compare friendly objects.' },
  { key: 'riddles', title: 'Riddle Rocket', description: 'Brain teasers for all ages.' },
  { key: 'puzzles', title: 'Puzzle Portal', description: 'Logic and clue puzzles.' },
  { key: 'snake', title: 'Rainbow Snake', description: 'Slither, collect gems, grow.' },
]

function numberChoices(correct: number): string[] {
  const wrongOne = correct + 1
  const wrongTwo = Math.max(0, correct - 1)
  return [correct, wrongOne, wrongTwo].map(String)
}

const mathQuestions: ChoiceRound[] = [
  ...Array.from({ length: 60 }, (_, index) => {
    const a = (index % 20) + 1
    const b = (index % 6) + 1
    const correct = a + b
    return { prompt: `${a} + ${b} = ?`, answers: numberChoices(correct), correct: String(correct) }
  }),
  ...Array.from({ length: 60 }, (_, index) => {
    const b = (index % 8) + 1
    const correct = (index % 20) + 1
    const a = correct + b
    return { prompt: `${a} - ${b} = ?`, answers: numberChoices(correct), correct: String(correct) }
  }),
  ...Array.from({ length: 40 }, (_, index) => {
    const a = (index % 9) + 2
    const b = (index % 5) + 2
    const correct = a * b
    return { prompt: `${a} × ${b} = ?`, answers: [String(correct), String(correct + a), String(Math.max(1, correct - b))], correct: String(correct) }
  }),
]

const scienceFacts: [string, string, string[]][] = [
  ['Which planet is known as the Red Planet?', 'Mars', ['Mars', 'Venus', 'Jupiter']],
  ['What do plants need to make food?', 'Sunlight', ['Sunlight', 'Moon rocks', 'Plastic']],
  ['Water can be solid, liquid, and...', 'Gas', ['Gas', 'Metal', 'Wood']],
  ['What animal is known for black and white stripes?', 'Zebra', ['Zebra', 'Lion', 'Frog']],
  ['Which part of a plant takes in water?', 'Roots', ['Roots', 'Petals', 'Clouds']],
  ['What do bees make?', 'Honey', ['Honey', 'Milk', 'Bread']],
  ['Which star gives Earth light?', 'The Sun', ['The Sun', 'Sirius', 'Polaris']],
  ['What do lungs help us do?', 'Breathe', ['Breathe', 'Paint', 'Jump rope']],
  ['Which sense uses your ears?', 'Hearing', ['Hearing', 'Taste', 'Touch']],
  ['What does ice become when it melts?', 'Water', ['Water', 'Sand', 'Smoke']],
  ['Which animal lays eggs?', 'Chicken', ['Chicken', 'Cat', 'Horse']],
  ['What do magnets stick to best?', 'Metal', ['Metal', 'Paper', 'Air']],
  ['What shape is planet Earth most like?', 'Sphere', ['Sphere', 'Cube', 'Triangle']],
  ['What do fish use to breathe underwater?', 'Gills', ['Gills', 'Wings', 'Paws']],
  ['What season is usually cold and snowy?', 'Winter', ['Winter', 'Summer', 'Spring']],
  ['Which tool helps us see tiny things?', 'Microscope', ['Microscope', 'Fork', 'Backpack']],
  ['What falls from clouds as rain or snow?', 'Water', ['Water', 'Leaves', 'Rocks']],
  ['Which animal can change into a butterfly?', 'Caterpillar', ['Caterpillar', 'Puppy', 'Penguin']],
  ['What do birds use to fly?', 'Wings', ['Wings', 'Fins', 'Hands']],
  ['What force pulls things down?', 'Gravity', ['Gravity', 'Glitter', 'Music']],
  ['Which object helps you measure temperature?', 'Thermometer', ['Thermometer', 'Ruler', 'Crayon']],
  ['What do cows make that people drink?', 'Milk', ['Milk', 'Juice', 'Tea']],
  ['Which natural object orbits Earth?', 'The Moon', ['The Moon', 'A tree', 'A cloud']],
  ['What do we call baby frogs?', 'Tadpoles', ['Tadpoles', 'Kittens', 'Calves']],
  ['Which gas do people breathe in to live?', 'Oxygen', ['Oxygen', 'Helium', 'Smoke']],
]

const scienceQuestions: ChoiceRound[] = Array.from({ length: 125 }, (_, index) => {
  const [prompt, correct, answers] = scienceFacts[index % scienceFacts.length]
  return { prompt, answers, correct, helper: `Science round ${index + 1} of 125` }
})

const words = [
  ['🐱', 'CAT'], ['🐶', 'DOG'], ['☀️', 'SUN'], ['🌳', 'TREE'], ['📚', 'BOOK'], ['🚗', 'CAR'], ['🏠', 'HOME'], ['🐟', 'FISH'], ['🐦', 'BIRD'], ['⭐', 'STAR'],
  ['🌙', 'MOON'], ['🍎', 'APPLE'], ['🎂', 'CAKE'], ['⚽', 'BALL'], ['🚌', 'BUS'], ['🚂', 'TRAIN'], ['🐸', 'FROG'], ['🦆', 'DUCK'], ['🐝', 'BEE'], ['🌸', 'FLOWER'],
]

const spellingRounds: ChoiceRound[] = Array.from({ length: 120 }, (_, index) => {
  const [emoji, word] = words[index % words.length]
  const wrongOne = words[(index + 3) % words.length][1]
  const wrongTwo = words[(index + 7) % words.length][1]
  return { prompt: `${emoji} Which word matches?`, answers: [word, wrongOne, wrongTwo], correct: word, helper: `Word round ${index + 1} of 120` }
})

const colorObjects = [
  ['apple 🍎', 'Red'], ['banana 🍌', 'Yellow'], ['grass 🌱', 'Green'], ['sky ☁️', 'Blue'], ['pumpkin 🎃', 'Orange'],
  ['grape 🍇', 'Purple'], ['snowman ⛄', 'White'], ['chocolate 🍫', 'Brown'], ['heart 💗', 'Pink'], ['night sky 🌌', 'Black'],
]
const colorChoices = ['Red', 'Yellow', 'Green', 'Blue', 'Orange', 'Purple', 'White', 'Brown', 'Pink', 'Black']
const colorRounds: ChoiceRound[] = Array.from({ length: 120 }, (_, index) => {
  const [thing, correct] = colorObjects[index % colorObjects.length]
  return {
    prompt: `Tap the color of the ${thing}`,
    answers: [correct, colorChoices[(index + 2) % colorChoices.length], colorChoices[(index + 5) % colorChoices.length]],
    correct,
    helper: `Color round ${index + 1} of 120`,
  }
})

const countEmojis = ['⭐', '🚗', '🍎', '🦖', '🧸', '🎈', '🐠', '🌼', '🚀', '🦋']
const countingRounds: ChoiceRound[] = Array.from({ length: 120 }, (_, index) => {
  const count = (index % 10) + 1
  const emoji = countEmojis[index % countEmojis.length]
  return {
    prompt: `${Array.from({ length: count }, () => emoji).join(' ')}\nHow many do you see?`,
    answers: numberChoices(count),
    correct: String(count),
    helper: `Counting round ${index + 1} of 120`,
  }
})

const shapeItems = [
  ['⚪', 'Circle'], ['🟦', 'Square'], ['🔺', 'Triangle'], ['⭐', 'Star'], ['❤️', 'Heart'], ['💎', 'Diamond'], ['🥚', 'Oval'], ['▭', 'Rectangle'],
]
const shapeRounds: ChoiceRound[] = Array.from({ length: 120 }, (_, index) => {
  const [shape, correct] = shapeItems[index % shapeItems.length]
  return {
    prompt: `${shape} What shape is this?`,
    answers: [correct, shapeItems[(index + 2) % shapeItems.length][1], shapeItems[(index + 5) % shapeItems.length][1]],
    correct,
    helper: `Shape round ${index + 1} of 120`,
  }
})

const animalSounds = [
  ['🐶', 'Woof'], ['🐱', 'Meow'], ['🐮', 'Moo'], ['🐷', 'Oink'], ['🐸', 'Ribbit'], ['🐥', 'Chirp'], ['🦁', 'Roar'], ['🐴', 'Neigh'], ['🐍', 'Hiss'], ['🐑', 'Baa'],
]
const animalRounds: ChoiceRound[] = Array.from({ length: 120 }, (_, index) => {
  const [animal, correct] = animalSounds[index % animalSounds.length]
  return {
    prompt: `${animal} Which sound does this animal make?`,
    answers: [correct, animalSounds[(index + 3) % animalSounds.length][1], animalSounds[(index + 6) % animalSounds.length][1]],
    correct,
    helper: `Animal round ${index + 1} of 120`,
  }
})

const biggerRounds: ChoiceRound[] = Array.from({ length: 120 }, (_, index) => {
  const left = (index % 12) + 1
  const right = ((index * 3) % 12) + 1
  const prompt = `Which number is bigger: ${left} or ${right}?`
  const correct = String(Math.max(left, right))
  return { prompt, answers: [String(left), String(right), 'Same'], correct: left === right ? 'Same' : correct, helper: `Compare round ${index + 1} of 120` }
})

const patternRounds: ChoiceRound[] = Array.from({ length: 120 }, (_, index) => {
  if (index % 3 === 0) {
    const pair = index % 2 === 0 ? ['🔴', '🔵'] : ['🟢', '🟡']
    return { prompt: `${pair[0]} ${pair[1]} ${pair[0]} ${pair[1]} ?`, answers: [pair[0], pair[1], '⭐'], correct: pair[0], helper: `Pattern round ${index + 1} of 120` }
  }
  if (index % 3 === 1) {
    const start = (index % 8) + 1
    return { prompt: `${start}, ${start + 2}, ${start + 4}, ?`, answers: [String(start + 6), String(start + 5), String(start + 8)], correct: String(start + 6), helper: `Pattern round ${index + 1} of 120` }
  }
  return { prompt: `⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ?`, answers: ['⭐', '🌙', '☀️'], correct: '⭐', helper: `Pattern round ${index + 1} of 120` }
})

const memorySymbols = ['🌟', '🚀', '🧠', '🦕', '🌈', '🔬', '🎈', '🧸', '🐠', '🍎', '🦋', '⚽']
const memoryBoards = Array.from({ length: 120 }, (_, index) => {
  const symbols = Array.from({ length: 6 }, (_, offset) => memorySymbols[(index + offset) % memorySymbols.length])
  return [...symbols, ...symbols].map((_, cardIndex, cards) => cards[(cardIndex * 5 + index) % cards.length])
})

const riddleBank: [string, string, string[]][] = [
  ['What has hands but cannot clap?', 'Clock', ['Clock', 'Dog', 'Cloud']],
  ['What gets wetter as it dries?', 'Towel', ['Towel', 'Pencil', 'Moon']],
  ['What has a face and two hands but no arms?', 'Clock', ['Clock', 'Chair', 'Tree']],
  ['What has keys but no locks?', 'Piano', ['Piano', 'Shoe', 'Bottle']],
  ['What can you catch but not throw?', 'Cold', ['Cold', 'Star', 'Book']],
  ['What has words but never speaks?', 'Book', ['Book', 'Ball', 'Lamp']],
  ['What goes up but never comes down?', 'Age', ['Age', 'Rain', 'Kite']],
  ['What has many teeth but cannot bite?', 'Comb', ['Comb', 'Fish', 'Robot']],
  ['What room has no doors?', 'Mushroom', ['Mushroom', 'Bedroom', 'Classroom']],
  ['What has one eye but cannot see?', 'Needle', ['Needle', 'Tiger', 'Phone']],
  ['What has legs but does not walk?', 'Table', ['Table', 'Rabbit', 'Duck']],
  ['What is full of holes but holds water?', 'Sponge', ['Sponge', 'Cup', 'Leaf']],
]

const riddleRounds: ChoiceRound[] = Array.from({ length: 120 }, (_, index) => {
  const [prompt, correct, answers] = riddleBank[index % riddleBank.length]
  return { prompt, answers, correct, helper: `Riddle ${index + 1} of 120` }
})

function getRounds(key: ChoiceGameKey): ChoiceRound[] {
  const rounds: Record<ChoiceGameKey, ChoiceRound[]> = {
    math: mathQuestions,
    science: scienceQuestions,
    patterns: patternRounds,
    spelling: spellingRounds,
    colors: colorRounds,
    counting: countingRounds,
    shapes: shapeRounds,
    animals: animalRounds,
    bigger: biggerRounds,
    riddles: riddleRounds,
  }
  return rounds[key as ChoiceGameKey]
}

function randomIndex(max: number): number {
  const values = new Uint32Array(1)
  globalThis.crypto.getRandomValues(values)
  return values[0] % max
}

function shuffleAnswers(answers: string[]): string[] {
  const shuffled = [...answers]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1)
    const temp = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = temp
  }
  return shuffled
}

function App() {
  const [selectedGame, setSelectedGame] = useState<GameKey>('math')
  const [mathStartIndex] = useState(() => randomIndex(mathQuestions.length))
  const [roundIndexes, setRoundIndexes] = useState<Record<ChoiceGameKey, number>>(() => ({
    math: mathStartIndex,
    science: 0,
    patterns: 0,
    spelling: 0,
    colors: 0,
    counting: 0,
    shapes: 0,
    animals: 0,
    bigger: 0,
    riddles: 0,
  }))
  const [answerOrders, setAnswerOrders] = useState<Record<ChoiceGameKey, string[]>>(() => ({
    math: shuffleAnswers(mathQuestions[mathStartIndex].answers),
    science: shuffleAnswers(scienceQuestions[0].answers),
    patterns: shuffleAnswers(patternRounds[0].answers),
    spelling: shuffleAnswers(spellingRounds[0].answers),
    colors: shuffleAnswers(colorRounds[0].answers),
    counting: shuffleAnswers(countingRounds[0].answers),
    shapes: shuffleAnswers(shapeRounds[0].answers),
    animals: shuffleAnswers(animalRounds[0].answers),
    bigger: shuffleAnswers(biggerRounds[0].answers),
    riddles: shuffleAnswers(riddleRounds[0].answers),
  }))
  const [memoryBoardIndex, setMemoryBoardIndex] = useState(0)
  const [message, setMessage] = useState('Pick a game and start playing!')
  const [hasParentAgreement, setHasParentAgreement] = useState(false)
  const [agreementMessage, setAgreementMessage] = useState('')
  const [matched, setMatched] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [snakeCells, setSnakeCells] = useState([112, 111, 110])
  const [snakeDirection, setSnakeDirection] = useState(1)
  const [snakeGem, setSnakeGem] = useState(57)
  const [snakeScore, setSnakeScore] = useState(0)
  const [fullScreenGame, setFullScreenGame] = useState<GameKey | null>(null)
  const [puzzleTiles, setPuzzleTiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0])
  const [puzzleMoves, setPuzzleMoves] = useState(0)
  const playPanelRef = useRef<HTMLElement | null>(null)

  const currentBoard = memoryBoards[memoryBoardIndex]
  const currentInfo = gameInfo.find((game) => game.key === selectedGame) ?? gameInfo[0]

  function gameCardClass(game: GameKey, extraClass = '') {
    return `challenge-card ${game} ${extraClass} ${fullScreenGame === game ? 'game-fullscreen' : ''}`.trim()
  }

  function renderFullScreenButton(game: GameKey) {
    const isFullScreen = fullScreenGame === game
    return (
      <button type="button" className="fullscreen-toggle" onClick={() => setFullScreenGame(isFullScreen ? null : game)}>
        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
      </button>
    )
  }

  function chooseGame(game: GameKey) {
    setSelectedGame(game)
    setFullScreenGame(null)
    window.setTimeout(() => {
      playPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  function answerRound(game: ChoiceGameKey, choice: string) {
    const rounds = getRounds(game)
    const index = roundIndexes[game]
    const current = rounds[index]
    let nextIndex = (index + 1) % rounds.length

    if (game === 'math') {
      nextIndex = randomIndex(rounds.length)
      if (rounds.length > 1 && nextIndex === index) nextIndex = (nextIndex + 1) % rounds.length
    }

    setMessage(choice === current.correct ? 'Awesome answer! 🌟' : `Good try! The answer was ${current.correct}.`)
    setRoundIndexes((currentIndexes) => ({ ...currentIndexes, [game]: nextIndex }))
    setAnswerOrders((currentOrders) => ({ ...currentOrders, [game]: shuffleAnswers(rounds[nextIndex].answers) }))
  }

  function flipCard(index: number) {
    if (flipped.includes(index) || matched.includes(`${index}`) || flipped.length === 2) return

    const nextFlipped = [...flipped, index]
    setFlipped(nextFlipped)

    if (nextFlipped.length === 2) {
      const [first, second] = nextFlipped
      if (currentBoard[first] === currentBoard[second]) {
        const nextMatched = [...matched, `${first}`, `${second}`]
        setMatched(nextMatched)
        setFlipped([])
        if (nextMatched.length === currentBoard.length) {
          setMessage('Board cleared! New memory board unlocked! 🧩')
          setMemoryBoardIndex((memoryBoardIndex + 1) % memoryBoards.length)
          setMatched([])
        } else {
          setMessage('You found a match! 🧩')
        }
      } else {
        setMessage('Good try — remember those spots!')
        window.setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  function moveSnake(direction: number) {
    setSnakeDirection(direction)
    const nextGem = randomIndex(225)
    setSnakeCells((currentSnake) => {
      const head = currentSnake[0]
      const nextHead = head + direction
      const hitWall = nextHead < 0 || nextHead >= 225 || (head % 15 === 0 && direction === -1) || (head % 15 === 14 && direction === 1)
      if (hitWall || currentSnake.includes(nextHead)) {
        setSnakeScore(0)
        setSnakeGem(nextGem)
        setMessage('Rainbow Snake restarted — try another path! 🐍')
        return [112, 111, 110]
      }

      const nextSnake = [nextHead, ...currentSnake]
      if (nextHead === snakeGem) {
        setSnakeScore((score) => score + 1)
        setSnakeGem(nextGem)
        setMessage('Yum! You collected a gem! 💎')
        return nextSnake
      }

      return nextSnake.slice(0, currentSnake.length)
    })
  }

  function movePuzzleTile(tileIndex: number) {
    const blankIndex = puzzleTiles.indexOf(0)
    const canMove = [blankIndex - 3, blankIndex + 3].includes(tileIndex) ||
      (Math.floor(blankIndex / 3) === Math.floor(tileIndex / 3) && [blankIndex - 1, blankIndex + 1].includes(tileIndex))

    if (!canMove) return

    const nextTiles = [...puzzleTiles]
    nextTiles[blankIndex] = nextTiles[tileIndex]
    nextTiles[tileIndex] = 0
    setPuzzleTiles(nextTiles)
    setPuzzleMoves((moves) => moves + 1)
    setMessage(nextTiles.join(',') === '1,2,3,4,5,6,7,8,0' ? 'Puzzle solved! Beautiful work! 🧩' : 'Nice move — keep solving!')
  }

  function shufflePuzzle() {
    let nextTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]
    for (let move = 0; move < 80; move += 1) {
      const blankIndex = nextTiles.indexOf(0)
      const possibleMoves = [blankIndex - 3, blankIndex + 3, blankIndex - 1, blankIndex + 1].filter((tileIndex) =>
        tileIndex >= 0 &&
        tileIndex < 9 &&
        (Math.abs(tileIndex - blankIndex) === 3 || Math.floor(tileIndex / 3) === Math.floor(blankIndex / 3)),
      )
      const tileIndex = possibleMoves[randomIndex(possibleMoves.length)]
      const copy = [...nextTiles]
      copy[blankIndex] = copy[tileIndex]
      copy[tileIndex] = 0
      nextTiles = copy
    }
    setPuzzleTiles(nextTiles)
    setPuzzleMoves(0)
    setMessage('Puzzle shuffled — slide the numbers back in order!')
  }

  function renderPuzzleGame() {
    return (
      <article className={gameCardClass('puzzles')}>
        <div className="game-card-topbar">
          <div>
            <p className="round-count">Moves: {puzzleMoves}</p>
            <h2>Puzzle Portal</h2>
          </div>
          {renderFullScreenButton('puzzles')}
        </div>
        <p className="snake-help">Slide tiles into the empty space until the board reads 1 to 8.</p>
        <div className="tile-puzzle" aria-label="Sliding tile puzzle">
          {puzzleTiles.map((tile, index) => (
            <button
              key={`${tile}-${index}`}
              type="button"
              className={tile === 0 ? 'tile empty' : 'tile'}
              onClick={() => movePuzzleTile(index)}
              aria-label={tile === 0 ? 'Empty puzzle space' : `Move tile ${tile}`}
            >
              {tile !== 0 ? tile : ''}
            </button>
          ))}
        </div>
        <div className="puzzle-actions">
          <button type="button" onClick={shufflePuzzle}>Shuffle Puzzle</button>
          <button type="button" onClick={() => { setPuzzleTiles([1, 2, 3, 4, 5, 6, 7, 8, 0]); setPuzzleMoves(0); setMessage('Puzzle reset!') }}>Reset</button>
        </div>
      </article>
    )
  }

  function renderChoiceGame(game: ChoiceGameKey) {
    const rounds = getRounds(game)
    const round = rounds[roundIndexes[game]]
    return (
      <article className={gameCardClass(game)}>
        <div className="game-card-topbar">
          <div>
            <p className="round-count">{round.helper ?? `${currentInfo.title} round ${roundIndexes[game] + 1} of ${rounds.length}`}</p>
            <h2>{currentInfo.title}</h2>
          </div>
          {renderFullScreenButton(game)}
        </div>
        <p className={game === 'counting' ? 'question counting-question' : 'question'}>{round.prompt}</p>
        <div className="answer-grid">
          {(answerOrders[game] ?? round.answers).map((answer) => (
            <button key={answer} onClick={() => answerRound(game, answer)} type="button">{answer}</button>
          ))}
        </div>
      </article>
    )
  }

  return (
    <main className={hasParentAgreement ? '' : 'locked'}>
      {!hasParentAgreement && (
        <section className="supervision-gate" aria-labelledby="supervision-title" role="dialog" aria-modal="true">
          <div className="supervision-card">
            <img src="/aaron-playground/parent-supervision.jpg" alt="Aaron Playground welcome image" />
            <div className="supervision-copy">
              <p className="eyebrow">Before You Play</p>
              <h2 id="supervision-title">Parent supervision required</h2>
              <p>
                Aaron Playground is made for kids. Please play with parent or guardian supervision.
                You can only enter the games if you agree to play safely with supervision.
              </p>
              {agreementMessage && <p className="agreement-warning" role="alert">{agreementMessage}</p>}
              <div className="agreement-actions">
                <button type="button" onClick={() => setHasParentAgreement(true)}>I agree — let me play</button>
                <button
                  type="button"
                  className="reject"
                  onClick={() => setAgreementMessage('You need parent or guardian supervision to play Aaron Playground.')}
                >
                  I do not agree
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Aaron Playground</p>
          <h1 id="page-title">Fun brain games for curious kids.</h1>
          <p className="intro">
            Play simple tap-friendly games with 100+ rounds in every category. Built for phones, tablets, and desktops.
          </p>
          <a className="primary-action" href="#games">Start playing</a>
        </div>
        <div className="hero-card" aria-hidden="true">
          <span>🧮</span>
          <span>🔬</span>
          <span>🎮</span>
          <span>🧠</span>
        </div>
      </section>

      <section className="game-picker" id="games" aria-label="Choose a game">
        {gameInfo.map((game) => (
          <button
            key={game.key}
            className={selectedGame === game.key ? 'game-tab active' : 'game-tab'}
            onClick={() => chooseGame(game.key)}
            type="button"
          >
            <strong>{game.title}</strong>
            <span>{game.description}</span>
          </button>
        ))}
      </section>

      <p className="status" role="status">{message}</p>

      <section className="play-panel" ref={playPanelRef}>
        {selectedGame === 'snake' ? (
          <article className={gameCardClass('snake', 'snake-fullscreen-ready')}>
            <div className="snake-topbar game-card-topbar">
              <div>
                <p className="round-count">Score: {snakeScore}</p>
                <h2>Rainbow Snake</h2>
              </div>
              {renderFullScreenButton('snake')}
            </div>
            <p className="snake-help">Swipe-style controls: collect gems, grow longer, avoid walls. Designed to feel like a mobile app.</p>
            <div className="snake-game-shell">
              <div className="snake-board" aria-label="Rainbow Snake game board">
                {Array.from({ length: 225 }, (_, index) => {
                  const isHead = snakeCells[0] === index
                  const isBody = snakeCells.includes(index)
                  const isGem = snakeGem === index
                  return <span key={index} className={isHead ? 'snake-head' : isBody ? 'snake-body' : isGem ? 'snake-gem' : ''}>{isGem ? '💎' : ''}</span>
                })}
              </div>
              <div className="snake-controls">
                <button type="button" onClick={() => moveSnake(-15)} disabled={snakeDirection === 15}>↑</button>
                <button type="button" onClick={() => moveSnake(-1)} disabled={snakeDirection === 1}>←</button>
                <button type="button" onClick={() => moveSnake(1)} disabled={snakeDirection === -1}>→</button>
                <button type="button" onClick={() => moveSnake(15)} disabled={snakeDirection === -15}>↓</button>
              </div>
            </div>
          </article>
        ) : selectedGame === 'puzzles' ? (
          renderPuzzleGame()
        ) : selectedGame === 'memory' ? (
          <article className={gameCardClass('memory')}>
            <div className="game-card-topbar">
              <div>
                <p className="round-count">Memory board {memoryBoardIndex + 1} of {memoryBoards.length}</p>
                <h2>Memory Match</h2>
              </div>
              {renderFullScreenButton('memory')}
            </div>
            <div className="memory-grid">
              {currentBoard.map((card, index) => {
                const isVisible = flipped.includes(index) || matched.includes(`${index}`)
                return (
                  <button key={`${memoryBoardIndex}-${card}-${index}`} className="memory-card" onClick={() => flipCard(index)} type="button">
                    {isVisible ? card : '?'}
                  </button>
                )
              })}
            </div>
          </article>
        ) : (
          renderChoiceGame(selectedGame)
        )}
      </section>
    </main>
  )
}

export default App
