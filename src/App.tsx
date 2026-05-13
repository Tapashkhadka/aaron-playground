import { useState } from 'react'
import './App.css'

type GameKey = 'math' | 'science' | 'memory' | 'patterns'

const mathQuestions = [
  { prompt: '8 + 7 = ?', answers: ['13', '15', '16'], correct: '15' },
  { prompt: '12 - 5 = ?', answers: ['7', '6', '8'], correct: '7' },
  { prompt: '4 × 3 = ?', answers: ['9', '12', '14'], correct: '12' },
]

const scienceQuestions = [
  { prompt: 'Which planet is known as the Red Planet?', answers: ['Mars', 'Venus', 'Jupiter'], correct: 'Mars' },
  { prompt: 'What do plants need to make food?', answers: ['Moonlight', 'Sunlight', 'Plastic'], correct: 'Sunlight' },
  { prompt: 'Water can be solid, liquid, and...', answers: ['Gas', 'Rock', 'Metal'], correct: 'Gas' },
]

const shuffledCards = ['🌟', '🚀', '🧠', '🦕', '🌈', '🔬', '🧠', '🌈', '🚀', '🔬', '🦕', '🌟']
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

  const currentMath = mathQuestions[mathIndex]
  const currentScience = scienceQuestions[scienceIndex]
  const currentPattern = patternRounds[patternIndex]

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
      </section>
    </main>
  )
}

export default App
