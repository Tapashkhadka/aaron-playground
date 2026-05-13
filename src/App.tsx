import { useState } from 'react'
import './App.css'

type GameKey = 'math' | 'science' | 'memory' | 'patterns' | 'spelling' | 'colors' | 'counting'

const mathQuestions = [
  { prompt: '1 + 1 = ?', answers: ['2', '3', '1'], correct: '2' },
  { prompt: '1 + 2 = ?', answers: ['3', '4', '2'], correct: '3' },
  { prompt: '1 + 3 = ?', answers: ['4', '5', '3'], correct: '4' },
  { prompt: '1 + 4 = ?', answers: ['5', '6', '4'], correct: '5' },
  { prompt: '1 + 5 = ?', answers: ['6', '7', '5'], correct: '6' },
  { prompt: '2 + 1 = ?', answers: ['3', '4', '2'], correct: '3' },
  { prompt: '2 + 2 = ?', answers: ['4', '5', '3'], correct: '4' },
  { prompt: '2 + 3 = ?', answers: ['5', '6', '4'], correct: '5' },
  { prompt: '2 + 4 = ?', answers: ['6', '7', '5'], correct: '6' },
  { prompt: '2 + 5 = ?', answers: ['7', '8', '6'], correct: '7' },
  { prompt: '3 + 1 = ?', answers: ['4', '5', '3'], correct: '4' },
  { prompt: '3 + 2 = ?', answers: ['5', '6', '4'], correct: '5' },
  { prompt: '3 + 3 = ?', answers: ['6', '7', '5'], correct: '6' },
  { prompt: '3 + 4 = ?', answers: ['7', '8', '6'], correct: '7' },
  { prompt: '3 + 5 = ?', answers: ['8', '9', '7'], correct: '8' },
  { prompt: '4 + 1 = ?', answers: ['5', '6', '4'], correct: '5' },
  { prompt: '4 + 2 = ?', answers: ['6', '7', '5'], correct: '6' },
  { prompt: '4 + 3 = ?', answers: ['7', '8', '6'], correct: '7' },
  { prompt: '4 + 4 = ?', answers: ['8', '9', '7'], correct: '8' },
  { prompt: '4 + 5 = ?', answers: ['9', '10', '8'], correct: '9' },
  { prompt: '5 + 1 = ?', answers: ['6', '7', '5'], correct: '6' },
  { prompt: '5 + 2 = ?', answers: ['7', '8', '6'], correct: '7' },
  { prompt: '5 + 3 = ?', answers: ['8', '9', '7'], correct: '8' },
  { prompt: '5 + 4 = ?', answers: ['9', '10', '8'], correct: '9' },
  { prompt: '5 + 5 = ?', answers: ['10', '11', '9'], correct: '10' },
  { prompt: '6 + 1 = ?', answers: ['7', '8', '6'], correct: '7' },
  { prompt: '6 + 2 = ?', answers: ['8', '9', '7'], correct: '8' },
  { prompt: '6 + 3 = ?', answers: ['9', '10', '8'], correct: '9' },
  { prompt: '6 + 4 = ?', answers: ['10', '11', '9'], correct: '10' },
  { prompt: '6 + 5 = ?', answers: ['11', '12', '10'], correct: '11' },
  { prompt: '7 + 1 = ?', answers: ['8', '9', '7'], correct: '8' },
  { prompt: '7 + 2 = ?', answers: ['9', '10', '8'], correct: '9' },
  { prompt: '7 + 3 = ?', answers: ['10', '11', '9'], correct: '10' },
  { prompt: '7 + 4 = ?', answers: ['11', '12', '10'], correct: '11' },
  { prompt: '7 + 5 = ?', answers: ['12', '13', '11'], correct: '12' },
  { prompt: '8 + 1 = ?', answers: ['9', '10', '8'], correct: '9' },
  { prompt: '8 + 2 = ?', answers: ['10', '11', '9'], correct: '10' },
  { prompt: '8 + 3 = ?', answers: ['11', '12', '10'], correct: '11' },
  { prompt: '8 + 4 = ?', answers: ['12', '13', '11'], correct: '12' },
  { prompt: '8 + 5 = ?', answers: ['13', '14', '12'], correct: '13' },
  { prompt: '9 + 1 = ?', answers: ['10', '11', '9'], correct: '10' },
  { prompt: '9 + 2 = ?', answers: ['11', '12', '10'], correct: '11' },
  { prompt: '9 + 3 = ?', answers: ['12', '13', '11'], correct: '12' },
  { prompt: '9 + 4 = ?', answers: ['13', '14', '12'], correct: '13' },
  { prompt: '9 + 5 = ?', answers: ['14', '15', '13'], correct: '14' },
  { prompt: '10 + 1 = ?', answers: ['11', '12', '10'], correct: '11' },
  { prompt: '10 + 2 = ?', answers: ['12', '13', '11'], correct: '12' },
  { prompt: '10 + 3 = ?', answers: ['13', '14', '12'], correct: '13' },
  { prompt: '10 + 4 = ?', answers: ['14', '15', '13'], correct: '14' },
  { prompt: '10 + 5 = ?', answers: ['15', '16', '14'], correct: '15' },
  { prompt: '11 + 1 = ?', answers: ['12', '13', '11'], correct: '12' },
  { prompt: '11 + 2 = ?', answers: ['13', '14', '12'], correct: '13' },
  { prompt: '11 + 3 = ?', answers: ['14', '15', '13'], correct: '14' },
  { prompt: '11 + 4 = ?', answers: ['15', '16', '14'], correct: '15' },
  { prompt: '11 + 5 = ?', answers: ['16', '17', '15'], correct: '16' },
  { prompt: '12 + 1 = ?', answers: ['13', '14', '12'], correct: '13' },
  { prompt: '12 + 2 = ?', answers: ['14', '15', '13'], correct: '14' },
  { prompt: '12 + 3 = ?', answers: ['15', '16', '14'], correct: '15' },
  { prompt: '12 + 4 = ?', answers: ['16', '17', '15'], correct: '16' },
  { prompt: '12 + 5 = ?', answers: ['17', '18', '16'], correct: '17' },
  { prompt: '13 + 1 = ?', answers: ['14', '15', '13'], correct: '14' },
  { prompt: '13 + 2 = ?', answers: ['15', '16', '14'], correct: '15' },
  { prompt: '13 + 3 = ?', answers: ['16', '17', '15'], correct: '16' },
  { prompt: '13 + 4 = ?', answers: ['17', '18', '16'], correct: '17' },
  { prompt: '13 + 5 = ?', answers: ['18', '19', '17'], correct: '18' },
  { prompt: '14 + 1 = ?', answers: ['15', '16', '14'], correct: '15' },
  { prompt: '14 + 2 = ?', answers: ['16', '17', '15'], correct: '16' },
  { prompt: '14 + 3 = ?', answers: ['17', '18', '16'], correct: '17' },
  { prompt: '14 + 4 = ?', answers: ['18', '19', '17'], correct: '18' },
  { prompt: '14 + 5 = ?', answers: ['19', '20', '18'], correct: '19' },
  { prompt: '15 + 1 = ?', answers: ['16', '17', '15'], correct: '16' },
  { prompt: '15 + 2 = ?', answers: ['17', '18', '16'], correct: '17' },
  { prompt: '15 + 3 = ?', answers: ['18', '19', '17'], correct: '18' },
  { prompt: '15 + 4 = ?', answers: ['19', '20', '18'], correct: '19' },
  { prompt: '15 + 5 = ?', answers: ['20', '21', '19'], correct: '20' },
  { prompt: '16 + 1 = ?', answers: ['17', '18', '16'], correct: '17' },
  { prompt: '16 + 2 = ?', answers: ['18', '19', '17'], correct: '18' },
  { prompt: '16 + 3 = ?', answers: ['19', '20', '18'], correct: '19' },
  { prompt: '16 + 4 = ?', answers: ['20', '21', '19'], correct: '20' },
  { prompt: '16 + 5 = ?', answers: ['21', '22', '20'], correct: '21' },
  { prompt: '17 + 1 = ?', answers: ['18', '19', '17'], correct: '18' },
  { prompt: '17 + 2 = ?', answers: ['19', '20', '18'], correct: '19' },
  { prompt: '17 + 3 = ?', answers: ['20', '21', '19'], correct: '20' },
  { prompt: '17 + 4 = ?', answers: ['21', '22', '20'], correct: '21' },
  { prompt: '17 + 5 = ?', answers: ['22', '23', '21'], correct: '22' },
  { prompt: '18 + 1 = ?', answers: ['19', '20', '18'], correct: '19' },
  { prompt: '18 + 2 = ?', answers: ['20', '21', '19'], correct: '20' },
  { prompt: '18 + 3 = ?', answers: ['21', '22', '20'], correct: '21' },
  { prompt: '18 + 4 = ?', answers: ['22', '23', '21'], correct: '22' },
  { prompt: '18 + 5 = ?', answers: ['23', '24', '22'], correct: '23' },
  { prompt: '19 + 1 = ?', answers: ['20', '21', '19'], correct: '20' },
  { prompt: '19 + 2 = ?', answers: ['21', '22', '20'], correct: '21' },
  { prompt: '19 + 3 = ?', answers: ['22', '23', '21'], correct: '22' },
  { prompt: '19 + 4 = ?', answers: ['23', '24', '22'], correct: '23' },
  { prompt: '19 + 5 = ?', answers: ['24', '25', '23'], correct: '24' },
  { prompt: '20 + 1 = ?', answers: ['21', '22', '20'], correct: '21' },
  { prompt: '20 + 2 = ?', answers: ['22', '23', '21'], correct: '22' },
  { prompt: '20 + 3 = ?', answers: ['23', '24', '22'], correct: '23' },
  { prompt: '20 + 4 = ?', answers: ['24', '25', '23'], correct: '24' },
  { prompt: '20 + 5 = ?', answers: ['25', '26', '24'], correct: '25' },
  { prompt: '6 - 1 = ?', answers: ['5', '6', '4'], correct: '5' },
  { prompt: '6 - 2 = ?', answers: ['4', '5', '3'], correct: '4' },
  { prompt: '6 - 3 = ?', answers: ['3', '4', '2'], correct: '3' },
  { prompt: '6 - 4 = ?', answers: ['2', '3', '1'], correct: '2' },
  { prompt: '7 - 1 = ?', answers: ['6', '7', '5'], correct: '6' },
  { prompt: '7 - 2 = ?', answers: ['5', '6', '4'], correct: '5' },
  { prompt: '7 - 3 = ?', answers: ['4', '5', '3'], correct: '4' },
  { prompt: '7 - 4 = ?', answers: ['3', '4', '2'], correct: '3' },
  { prompt: '8 - 1 = ?', answers: ['7', '8', '6'], correct: '7' },
  { prompt: '8 - 2 = ?', answers: ['6', '7', '5'], correct: '6' },
  { prompt: '8 - 3 = ?', answers: ['5', '6', '4'], correct: '5' },
  { prompt: '8 - 4 = ?', answers: ['4', '5', '3'], correct: '4' },
  { prompt: '9 - 1 = ?', answers: ['8', '9', '7'], correct: '8' },
  { prompt: '9 - 2 = ?', answers: ['7', '8', '6'], correct: '7' },
  { prompt: '9 - 3 = ?', answers: ['6', '7', '5'], correct: '6' },
  { prompt: '9 - 4 = ?', answers: ['5', '6', '4'], correct: '5' },
  { prompt: '10 - 1 = ?', answers: ['9', '10', '8'], correct: '9' },
  { prompt: '10 - 2 = ?', answers: ['8', '9', '7'], correct: '8' },
  { prompt: '10 - 3 = ?', answers: ['7', '8', '6'], correct: '7' },
  { prompt: '10 - 4 = ?', answers: ['6', '7', '5'], correct: '6' },
  { prompt: '11 - 1 = ?', answers: ['10', '11', '9'], correct: '10' },
  { prompt: '11 - 2 = ?', answers: ['9', '10', '8'], correct: '9' },
  { prompt: '11 - 3 = ?', answers: ['8', '9', '7'], correct: '8' },
  { prompt: '11 - 4 = ?', answers: ['7', '8', '6'], correct: '7' },
  { prompt: '12 - 1 = ?', answers: ['11', '12', '10'], correct: '11' },
  { prompt: '12 - 2 = ?', answers: ['10', '11', '9'], correct: '10' },
  { prompt: '12 - 3 = ?', answers: ['9', '10', '8'], correct: '9' },
  { prompt: '12 - 4 = ?', answers: ['8', '9', '7'], correct: '8' },
  { prompt: '13 - 1 = ?', answers: ['12', '13', '11'], correct: '12' },
  { prompt: '13 - 2 = ?', answers: ['11', '12', '10'], correct: '11' },
  { prompt: '13 - 3 = ?', answers: ['10', '11', '9'], correct: '10' },
  { prompt: '13 - 4 = ?', answers: ['9', '10', '8'], correct: '9' },
  { prompt: '14 - 1 = ?', answers: ['13', '14', '12'], correct: '13' },
  { prompt: '14 - 2 = ?', answers: ['12', '13', '11'], correct: '12' },
  { prompt: '14 - 3 = ?', answers: ['11', '12', '10'], correct: '11' },
  { prompt: '14 - 4 = ?', answers: ['10', '11', '9'], correct: '10' },
  { prompt: '15 - 1 = ?', answers: ['14', '15', '13'], correct: '14' },
  { prompt: '15 - 2 = ?', answers: ['13', '14', '12'], correct: '13' },
  { prompt: '15 - 3 = ?', answers: ['12', '13', '11'], correct: '12' },
  { prompt: '15 - 4 = ?', answers: ['11', '12', '10'], correct: '11' },
]

const scienceQuestions = [
  { prompt: 'Which planet is known as the Red Planet?', answers: ['Mars', 'Venus', 'Jupiter'], correct: 'Mars' },
  { prompt: 'What do plants need to make food?', answers: ['Moonlight', 'Sunlight', 'Plastic'], correct: 'Sunlight' },
  { prompt: 'Water can be solid, liquid, and...', answers: ['Gas', 'Rock', 'Metal'], correct: 'Gas' },
]

const shuffledCards = ['🌟', '🚀', '🧠', '🦕', '🌈', '🔬', '🧠', '🌈', '🚀', '🔬', '🦕', '🌟']

const spellingRounds = [
  { emoji: '🐱', word: 'CAT', choices: ['CAT', 'CAR', 'CUP'] },
  { emoji: '☀️', word: 'SUN', choices: ['SON', 'SUN', 'FUN'] },
  { emoji: '🐶', word: 'DOG', choices: ['DIG', 'DOG', 'DOT'] },
  { emoji: '🌳', word: 'TREE', choices: ['TREE', 'FREE', 'THREE'] },
  { emoji: '📚', word: 'BOOK', choices: ['LOOK', 'BOOK', 'COOK'] },
]

const colorRounds = [
  { prompt: 'Tap the color of the apple 🍎', answer: 'Red', choices: ['Red', 'Blue', 'Green'] },
  { prompt: 'Tap the color of the banana 🍌', answer: 'Yellow', choices: ['Purple', 'Yellow', 'Brown'] },
  { prompt: 'Tap the color of grass 🌱', answer: 'Green', choices: ['Orange', 'Green', 'Pink'] },
  { prompt: 'Tap the color of the sky ☁️', answer: 'Blue', choices: ['Blue', 'Black', 'Red'] },
]

const countingRounds = [
  { items: '⭐ ⭐ ⭐', answer: '3', choices: ['2', '3', '4'] },
  { items: '🚗 🚗 🚗 🚗', answer: '4', choices: ['4', '5', '6'] },
  { items: '🍎 🍎 🍎 🍎 🍎', answer: '5', choices: ['3', '5', '7'] },
  { items: '🦖 🦖 🦖 🦖 🦖 🦖', answer: '6', choices: ['6', '8', '9'] },
]

const patternRounds = [
  { pattern: ['🔴', '🔵', '🔴', '🔵'], answer: '🔴', choices: ['🔴', '🟢', '🟡'] },
  { pattern: ['⭐', '⭐', '🌙', '⭐', '⭐', '🌙'], answer: '⭐', choices: ['☀️', '⭐', '☁️'] },
  { pattern: ['1', '2', '4', '8'], answer: '16', choices: ['10', '12', '16'] },
]

function App() {
  const [selectedGame, setSelectedGame] = useState<GameKey>('math')
  const [mathIndex, setMathIndex] = useState(0)
  const [scienceIndex, setScienceIndex] = useState(0)
  const [message, setMessage] = useState('Pick a game and start playing!')
  const [matched, setMatched] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [patternIndex, setPatternIndex] = useState(0)
  const [spellingIndex, setSpellingIndex] = useState(0)
  const [colorIndex, setColorIndex] = useState(0)
  const [countingIndex, setCountingIndex] = useState(0)

  function checkQuiz(answer: string, type: 'math' | 'science') {
    const questions = type === 'math' ? mathQuestions : scienceQuestions
    const index = type === 'math' ? mathIndex : scienceIndex
    const correct = questions[index].correct === answer

    setMessage(correct ? 'Nice work! 🎉' : `Almost! The answer was ${questions[index].correct}. Try the next one.`)

    if (type === 'math') setMathIndex((index + 1) % questions.length)
    if (type === 'science') setScienceIndex((index + 1) % questions.length)
  }

  function flipCard(index: number) {
    if (flipped.includes(index) || matched.includes(`${index}`) || flipped.length === 2) return

    const nextFlipped = [...flipped, index]
    setFlipped(nextFlipped)

    if (nextFlipped.length === 2) {
      const [first, second] = nextFlipped
      if (shuffledCards[first] === shuffledCards[second]) {
        setMatched((current) => [...current, `${first}`, `${second}`])
        setMessage('You found a match! 🧩')
        setFlipped([])
      } else {
        setMessage('Good try — remember those spots!')
        window.setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  function checkPattern(choice: string) {
    const round = patternRounds[patternIndex]
    setMessage(choice === round.answer ? 'Pattern master! ✨' : `Close! The next one was ${round.answer}.`)
    setPatternIndex((patternIndex + 1) % patternRounds.length)
  }

  function checkSimpleGame(choice: string, answer: string, next: () => void) {
    setMessage(choice === answer ? 'Awesome answer! 🌟' : `Good try! The answer was ${answer}.`)
    next()
  }

  const currentMath = mathQuestions[mathIndex]
  const currentScience = scienceQuestions[scienceIndex]
  const currentPattern = patternRounds[patternIndex]
  const currentSpelling = spellingRounds[spellingIndex]
  const currentColor = colorRounds[colorIndex]
  const currentCounting = countingRounds[countingIndex]

  return (
    <main>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Aaron Playground</p>
          <h1 id="page-title">Fun brain games for curious kids.</h1>
          <p className="intro">
            Play quick math, science, memory, and pattern games built for phones, tablets, and desktops.
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
        {([
          ['math', 'Math Quest', 'Solve speedy number puzzles.'],
          ['science', 'Science Lab', 'Explore facts about the world.'],
          ['memory', 'Memory Match', 'Find matching cards.'],
          ['patterns', 'Pattern Pop', 'Guess what comes next.'],
          ['spelling', 'Word Builder', 'Match pictures to words.'],
          ['colors', 'Color Quest', 'Practice everyday colors.'],
          ['counting', 'Counting Stars', 'Count fun objects.'],
        ] as const).map(([key, title, description]) => (
          <button
            key={key}
            className={selectedGame === key ? 'game-tab active' : 'game-tab'}
            onClick={() => setSelectedGame(key)}
            type="button"
          >
            <strong>{title}</strong>
            <span>{description}</span>
          </button>
        ))}
      </section>

      <p className="status" role="status">{message}</p>

      <section className="play-panel">
        {selectedGame === 'math' && (
          <article className="challenge-card">
            <h2>Math Quest</h2>
            <p className="question">{currentMath.prompt}</p>
            <div className="answer-grid">
              {currentMath.answers.map((answer) => (
                <button key={answer} onClick={() => checkQuiz(answer, 'math')} type="button">{answer}</button>
              ))}
            </div>
          </article>
        )}

        {selectedGame === 'science' && (
          <article className="challenge-card science">
            <h2>Science Lab</h2>
            <p className="question">{currentScience.prompt}</p>
            <div className="answer-grid">
              {currentScience.answers.map((answer) => (
                <button key={answer} onClick={() => checkQuiz(answer, 'science')} type="button">{answer}</button>
              ))}
            </div>
          </article>
        )}

        {selectedGame === 'memory' && (
          <article className="challenge-card">
            <h2>Memory Match</h2>
            <div className="memory-grid">
              {shuffledCards.map((card, index) => {
                const isVisible = flipped.includes(index) || matched.includes(`${index}`)
                return (
                  <button key={`${card}-${index}`} className="memory-card" onClick={() => flipCard(index)} type="button">
                    {isVisible ? card : '?'}
                  </button>
                )
              })}
            </div>
          </article>
        )}

        {selectedGame === 'patterns' && (
          <article className="challenge-card patterns">
            <h2>Pattern Pop</h2>
            <div className="pattern-row" aria-label="Pattern sequence">
              {currentPattern.pattern.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
              <span>?</span>
            </div>
            <div className="answer-grid">
              {currentPattern.choices.map((choice) => (
                <button key={choice} onClick={() => checkPattern(choice)} type="button">{choice}</button>
              ))}
            </div>
          </article>
        )}

        {selectedGame === 'spelling' && (
          <article className="challenge-card spelling">
            <h2>Word Builder</h2>
            <p className="big-emoji">{currentSpelling.emoji}</p>
            <p className="question">Which word matches?</p>
            <div className="answer-grid">
              {currentSpelling.choices.map((choice) => (
                <button key={choice} onClick={() => checkSimpleGame(choice, currentSpelling.word, () => setSpellingIndex((spellingIndex + 1) % spellingRounds.length))} type="button">{choice}</button>
              ))}
            </div>
          </article>
        )}

        {selectedGame === 'colors' && (
          <article className="challenge-card colors">
            <h2>Color Quest</h2>
            <p className="question">{currentColor.prompt}</p>
            <div className="answer-grid">
              {currentColor.choices.map((choice) => (
                <button key={choice} onClick={() => checkSimpleGame(choice, currentColor.answer, () => setColorIndex((colorIndex + 1) % colorRounds.length))} type="button">{choice}</button>
              ))}
            </div>
          </article>
        )}

        {selectedGame === 'counting' && (
          <article className="challenge-card counting">
            <h2>Counting Stars</h2>
            <p className="counting-items">{currentCounting.items}</p>
            <p className="question">How many do you see?</p>
            <div className="answer-grid">
              {currentCounting.choices.map((choice) => (
                <button key={choice} onClick={() => checkSimpleGame(choice, currentCounting.answer, () => setCountingIndex((countingIndex + 1) % countingRounds.length))} type="button">{choice}</button>
              ))}
            </div>
          </article>
        )}
      </section>
    </main>
  )
}

export default App
