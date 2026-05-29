import { useRef, useState, useEffect } from 'react'
import './App.css'
import { Icon, EmojiIcon } from './icons'

// ===== TYPE DEFINITIONS =====
type GameKey =
  | 'math' | 'science' | 'memory' | 'patterns' | 'spelling' | 'colors'
  | 'counting' | 'shapes' | 'animals' | 'bigger' | 'riddles' | 'puzzles'
  | 'snake' | 'bubbles' | 'tictactoe' | 'drawing' | 'typing' | 'flashcards'

type ChoiceGameKey = Exclude<GameKey, 'memory' | 'snake' | 'puzzles' | 'bubbles' | 'tictactoe' | 'drawing' | 'typing' | 'flashcards'>

type ChoiceRound = {
  prompt: string
  answers: string[]
  correct: string
  helper?: string
}

type Category = 'play' | 'study' | 'create' | 'braingames'

// ===== GAME DEFINITIONS =====
const allGames = [
  // Play games (existing)
  { key: 'math' as GameKey, title: 'Math Quest', description: 'Add, subtract, multiply!', icon: '🔢', level: '5+' } as const,
  { key: 'science' as GameKey, title: 'Science Lab', description: 'Explore fun facts!', icon: '🔬', level: '6+' } as const,
  { key: 'memory' as GameKey, title: 'Memory Match', description: 'Find matching pairs!', icon: '🧠', level: '3+' } as const,
  { key: 'snake' as GameKey, title: 'Rainbow Snake', description: 'Collect gems & grow!', icon: '🐍', level: 'All' } as const,
  { key: 'puzzles' as GameKey, title: 'Puzzle Portal', description: 'Slide tiles in order!', icon: '🧩', level: '6+' } as const,
  { key: 'bubbles' as GameKey, title: 'Bubble Pop', description: 'Pop the right count!', icon: '🫧', level: '2+' } as const,
  { key: 'colors' as GameKey, title: 'Color Quest', description: 'Match the colors!', icon: '🎨', level: '2+' } as const,
  { key: 'shapes' as GameKey, title: 'Shape Wizard', description: 'Learn your shapes!', icon: '🔺', level: '2+' } as const,
  { key: 'animals' as GameKey, title: 'Animal Sounds', description: 'What do they say?', icon: '🐾', level: '2+' } as const,
  { key: 'spelling' as GameKey, title: 'Spelling Bee', description: 'Match the word!', icon: '📝', level: '5+' } as const,
  { key: 'counting' as GameKey, title: 'Counting Stars', description: 'Count the emojis!', icon: '🔢', level: '2+' } as const,
  { key: 'patterns' as GameKey, title: 'Pattern Puzzles', description: 'Find what comes next!', icon: '🔷', level: '4+' } as const,
  { key: 'riddles' as GameKey, title: 'Riddle Me', description: 'Solve fun riddles!', icon: '🤔', level: '6+' } as const,
  { key: 'bigger' as GameKey, title: 'Bigger or Smaller', description: 'Compare numbers!', icon: '📏', level: '3+' } as const,
  // New brain games
  { key: 'tictactoe' as GameKey, title: 'Tic-Tac-Toe', description: 'Star vs Moon battle!', icon: '⭐', level: '4+' } as const,
  // New study
  { key: 'flashcards' as GameKey, title: 'Flash Cards', description: 'Learn cool facts!', icon: '📇', level: '3+' } as const,
  // Create
  { key: 'drawing' as GameKey, title: 'Drawing Pad', description: 'Draw anything!', icon: '✏️', level: '2+' } as const,
  // Brain games
  { key: 'typing' as GameKey, title: 'Quick Typing', description: 'Type letters & words!', icon: '⌨️', level: '6+' } as const,
]

const gamesByCategory: Record<Category, GameKey[]> = {
  play: ['math', 'science', 'memory', 'snake', 'puzzles', 'bubbles', 'colors', 'shapes', 'animals', 'spelling', 'counting', 'patterns', 'riddles', 'bigger'],
  study: ['flashcards'],
  create: ['drawing'],
  braingames: ['tictactoe', 'typing'],
}

const categoryInfo: Record<Category, { label: string; icon: string }> = {
  play: { label: 'Play', icon: '🎮' } as const,
  study: { label: 'Study', icon: '📚' } as const,
  create: { label: 'Create', icon: '🎨' } as const,
  braingames: { label: 'Brain Games', icon: '🧠' } as const,
}

// ===== EXISTING GAME DATA (preserved) =====
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
const colorChoicesList = ['Red', 'Yellow', 'Green', 'Blue', 'Orange', 'Purple', 'White', 'Brown', 'Pink', 'Black']
const colorRounds: ChoiceRound[] = Array.from({ length: 120 }, (_, index) => {
  const [thing, correct] = colorObjects[index % colorObjects.length]
  return {
    prompt: `Tap the color of the ${thing}`,
    answers: [correct, colorChoicesList[(index + 2) % colorChoicesList.length], colorChoicesList[(index + 5) % colorChoicesList.length]],
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

// ===== NEW: FLASHCARD DATA =====
const flashcardCategories = {
  Animals: [
    { emoji: '🦁', title: 'Lion', fact: 'A group of lions is called a pride. Lions are the only cats that live in groups!' },
    { emoji: '🐘', title: 'Elephant', fact: 'Elephants are the largest land animals. They can weigh up to 6,000 kg!' },
    { emoji: '🐬', title: 'Dolphin', fact: 'Dolphins sleep with one eye open! They rest half their brain at a time.' },
    { emoji: '🦋', title: 'Butterfly', fact: 'Butterflies taste with their feet! They have sensors on their legs.' },
    { emoji: '🦉', title: 'Owl', fact: 'Owls can rotate their heads 270 degrees! They have 14 neck bones.' },
    { emoji: '🐧', title: 'Penguin', fact: 'Penguins can jump up to 6 feet high! They are excellent swimmers.' },
    { emoji: '🦎', title: 'Chameleon', fact: 'Chameleons can move their eyes in two different directions at once!' },
    { emoji: '🐝', title: 'Honey Bee', fact: 'A honey bee can fly at 15 miles per hour and visits up to 100 flowers per trip!' },
  ],
  Planets: [
    { emoji: '☀️', title: 'The Sun', fact: 'The Sun is a star! It is 109 times wider than Earth and 4.6 billion years old.' },
    { emoji: '🌍', title: 'Earth', fact: 'Earth is the only planet known to have life. About 71% is covered in water!' },
    { emoji: '🌙', title: 'The Moon', fact: 'The Moon is slowly moving away from Earth — about 3.8 cm every year!' },
    { emoji: '🔴', title: 'Mars', fact: 'Mars is called the Red Planet because of iron oxide (rust) on its surface.' },
    { emoji: '🪐', title: 'Saturn', fact: 'Saturn\'s rings are made of ice and rock. It\'s the least dense planet — it could float in water!' },
    { emoji: '🌊', title: 'Neptune', fact: 'Neptune has the strongest winds in the solar system — up to 2,100 km/h!' },
    { emoji: '☄️', title: 'Jupiter', fact: 'Jupiter is the largest planet. Its Great Red Spot is a storm bigger than Earth!' },
    { emoji: '🌕', title: 'Pluto', fact: 'Pluto is a dwarf planet. One year on Pluto is 248 Earth years long!' },
  ],
  'Human Body': [
    { emoji: '🫀', title: 'Heart', fact: 'Your heart beats about 100,000 times a day! That\'s 35 million times a year.' },
    { emoji: '🧠', title: 'Brain', fact: 'Your brain sends signals at 268 miles per hour! It uses 20% of your body\'s energy.' },
    { emoji: '🦴', title: 'Bones', fact: 'Babies are born with 300 bones, but adults have 206. Some bones fuse together as you grow!' },
    { emoji: '👁️', title: 'Eyes', fact: 'Your eyes can distinguish about 10 million different colors! They blink 15-20 times per minute.' },
    { emoji: '👅', title: 'Tongue', fact: 'Your tongue has about 10,000 taste buds! They renew every 10-14 days.' },
    { emoji: '🫁', title: 'Lungs', fact: 'Your lungs have about 300 million tiny air sacs! They can hold about 6 liters of air.' },
    { emoji: '💪', title: 'Muscles', fact: 'You have over 600 muscles in your body! The strongest is the masseter (jaw muscle).' },
    { emoji: '🩸', title: 'Blood', fact: 'Your body has about 5 liters of blood! Red blood cells travel through your body in 20 seconds.' },
  ],
  'Fun Facts': [
    { emoji: '🌈', title: 'Rainbows', fact: 'No two people see the same rainbow! Each person sees a different set of colors from their own angle.' },
    { emoji: '🍿', title: 'Popcorn', fact: 'Popcorn has been around for thousands of years! It was discovered by ancient Aztecs.' },
    { emoji: '🍌', title: 'Bananas', fact: 'Bananas are berries! But strawberries are not actually berries.' },
    { emoji: '🐙', title: 'Octopus', fact: 'Octopuses have three hearts! Two pump blood to the gills, one to the rest of the body.' },
    { emoji: '🌊', title: 'Ocean', fact: 'We have explored less than 5% of the ocean! More people have been to the Moon than the deep sea.' },
    { emoji: '🍯', title: 'Honey', fact: 'Honey never spoils! Archaeologists found 3,000-year-old honey that was still edible.' },
    { emoji: '❄️', title: 'Snowflakes', fact: 'Every snowflake is unique! They form differently based on temperature and humidity.' },
    { emoji: '🌋', title: 'Volcanoes', fact: 'There are about 1,500 active volcanoes on Earth! Most are underwater.' },
  ],
}

const funFactsList = [
  'A day on Venus is longer than a year on Venus!',
  'Octopuses have three hearts and blue blood!',
  'Honey never spoils — ever!',
  'A group of flamingos is called a "flamboyance"!',
  'Bananas are berries, but strawberries aren\'t!',
  'The Eiffel Tower grows 6 inches taller in the summer!',
  'There are more trees on Earth than stars in the Milky Way!',
  'The world\'s largest pizza was 13,580 square feet!',
  'A Jiffy is an actual unit of time — 1/100th of a second!',
  'The first oranges weren\'t orange — they were green!',
  'Butterflies taste with their feet!',
  'A day on Mars is only 37 minutes longer than Earth\'s!',
  'The Moon is moving away from Earth at 3.8 cm per year!',
  'There are more possible chess games than atoms in the universe!',
  'Your nose can remember 50,000 different scents!',
  'Cows have best friends and get stressed when separated!',
  'A cloud can weigh over a million pounds!',
  'Sloths can hold their breath longer than dolphins!',
]

const dailyChallengeIdeas = [
  { emoji: '🧮', title: 'Math Blitz', desc: 'Solve as many math problems as you can!' },
  { emoji: '🧠', title: 'Memory Master', desc: 'Beat the memory matching game!' },
  { emoji: '🔬', title: 'Science Explorer', desc: 'Answer science quiz questions!' },
  { emoji: '🐍', title: 'Snake Champion', desc: 'Collect 5 gems in Rainbow Snake!' },
  { emoji: '🧩', title: 'Puzzle Solver', desc: 'Solve the sliding puzzle!' },
  { emoji: '📝', title: 'Spelling Star', desc: 'Practice your spelling words!' },
  { emoji: '🤔', title: 'Riddle Master', desc: 'Solve tricky riddles!' },
  { emoji: '📏', title: 'Number Compare', desc: 'Master bigger vs smaller!' },
  { emoji: '🔷', title: 'Pattern Pro', desc: 'Complete the patterns!' },
  { emoji: '✏️', title: 'Creative Creator', desc: 'Draw something amazing!' },
]

const typingLetterSets = {
  letters: [
    { display: 'A', input: 'a' }, { display: 'B', input: 'b' }, { display: 'C', input: 'c' },
    { display: 'D', input: 'd' }, { display: 'E', input: 'e' }, { display: 'F', input: 'f' },
    { display: 'G', input: 'g' }, { display: 'H', input: 'h' }, { display: 'I', input: 'i' },
    { display: 'J', input: 'j' }, { display: 'K', input: 'k' }, { display: 'L', input: 'l' },
    { display: 'M', input: 'm' }, { display: 'N', input: 'n' }, { display: 'O', input: 'o' },
    { display: 'P', input: 'p' }, { display: 'Q', input: 'q' }, { display: 'R', input: 'r' },
    { display: 'S', input: 's' }, { display: 'T', input: 't' }, { display: 'U', input: 'u' },
    { display: 'V', input: 'v' }, { display: 'W', input: 'w' }, { display: 'X', input: 'x' },
    { display: 'Y', input: 'y' }, { display: 'Z', input: 'z' },
  ],
  words: ['CAT', 'DOG', 'SUN', 'FISH', 'BIRD', 'STAR', 'MOON', 'BALL', 'TREE', 'BOOK', 'APPLE', 'HAPPY', 'SMILE', 'WATER', 'PLAY'],
}

// ===== HELPER FUNCTIONS =====
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
  return rounds[key]
}

function getDailySeed(): number {
  const now = new Date()
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
}

function getDailyChallenge() {
  const seed = getDailySeed()
  return dailyChallengeIdeas[seed % dailyChallengeIdeas.length]
}

// ===== STREAK TRACKING =====
function getStreakData(): { count: number; lastDate: string } {
  try {
    const raw = localStorage.getItem('aaron-streak')
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { count: 0, lastDate: '' }
}

function updateStreak(): number {
  const today = new Date().toISOString().slice(0, 10)
  const data = getStreakData()
  if (data.lastDate === today) return data.count
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const newCount = data.lastDate === yesterday ? data.count + 1 : 1
  localStorage.setItem('aaron-streak', JSON.stringify({ count: newCount, lastDate: today }))
  return newCount
}

// ===== DRAWING COLORS =====
const drawColors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#AA96DA', '#2D3436', '#FF9500', '#30D5C8', '#FF69B4', '#4A90D9', '#000000']
const drawSizes = [3, 6, 10, 16]

// ===== MAIN APP COMPONENT =====
function App() {
  // State
  const [hasParentAgreement, setHasParentAgreement] = useState(false)
  const [agreementMessage, setAgreementMessage] = useState('')
  const [category, setCategory] = useState<Category>('play')
  const [activeGame, setActiveGame] = useState<GameKey | null>(null)
  const [message, setMessage] = useState('Welcome to Aaron Playground! Pick something fun!')

  // Star / Achievement state
  const [starScore, setStarScore] = useState(() => {
    try { return Number(localStorage.getItem('aaron-stars')) || 0 } catch { return 0 }
  })
  const [dailyStreak, setDailyStreak] = useState(0)
  const [showMilestone, setShowMilestone] = useState<string | null>(null)
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string }[]>([])

  // Fun facts carousel
  const [funFactIndex, setFunFactIndex] = useState(0)

  // Existing game state
  const [mathStartIndex] = useState(() => randomIndex(mathQuestions.length))
  const [roundIndexes, setRoundIndexes] = useState<Record<ChoiceGameKey, number>>(() => ({
    math: mathStartIndex, science: 0, patterns: 0, spelling: 0, colors: 0,
    counting: 0, shapes: 0, animals: 0, bigger: 0, riddles: 0,
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
  const [matched, setMatched] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [snakeCells, setSnakeCells] = useState([112, 111, 110])
  const [snakeDirection, setSnakeDirection] = useState(1)
  const [snakeGem, setSnakeGem] = useState(57)
  const [snakeScore, setSnakeScore] = useState(0)
  const [puzzleTiles, setPuzzleTiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0])
  const [puzzleMoves, setPuzzleMoves] = useState(0)
  const [bubbleTarget, setBubbleTarget] = useState(5)
  const [poppedBubbles, setPoppedBubbles] = useState<number[]>([])

  // Tic-Tac-Toe state
  const [tttBoard, setTttBoard] = useState<string[]>(Array(9).fill(''))
  const [tttTurn, setTttTurn] = useState<'X' | 'O'>('X')
  const [tttWinner, setTttWinner] = useState<string | null>(null)
  const [tttWinningLine, setTttWinningLine] = useState<number[]>([])
  const [tttMode, setTttMode] = useState<'1p' | '2p'>('2p')
  const [tttBotThinking, setTttBotThinking] = useState(false)

  // Drawing state
  const [drawColor, setDrawColor] = useState('#FF6B6B')
  const [drawSize, setDrawSize] = useState(6)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const drawHistoryRef = useRef<ImageData[]>([])

  // Typing state
  const [typingMode, setTypingMode] = useState<'letters' | 'words'>('letters')
  const [typingTarget, setTypingTarget] = useState('')
  const [typingCorrect, setTypingCorrect] = useState(0)
  const [typingTotal, setTypingTotal] = useState(0)
  const [typingInput, setTypingInput] = useState('')
  const [typingResult, setTypingResult] = useState<'idle' | 'correct' | 'incorrect'>('idle')

  // Flashcards state
  const [flashcardCat, setFlashcardCat] = useState('Animals')
  const [flashcardIdx, setFlashcardIdx] = useState(0)
  const [flashcardFlipped, setFlashcardFlipped] = useState(false)

  // Refs
  const panelRef = useRef<HTMLDivElement>(null)

  // ===== INIT EFFECTS =====
  useEffect(() => {
    setDailyStreak(updateStreak())
    // Pick random typing target
    pickTypingTarget('letters')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('aaron-stars', String(starScore))
    // Check milestones
    const milestones = [10, 25, 50, 100, 200, 500]
    for (const m of milestones) {
      if (starScore >= m && starScore - 1 < m) {
        triggerMilestone(m)
        break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starScore])

  // ===== STAR / ACHIEVEMENT =====
  function addStars(amount: number) {
    setStarScore((s) => s + amount)
    if (amount > 0) {
      triggerConfetti()
    }
  }

  function triggerMilestone(count: number) {
    setShowMilestone(`Amazing! You've earned ${count} stars!`)
    triggerConfetti()
  }

  function triggerConfetti() {
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#AA96DA', '#FF9500', '#30D5C8', '#FF69B4']
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: colors[i % colors.length],
    }))
    setConfetti(pieces)
    setTimeout(() => setConfetti([]), 3000)
  }

  // ===== EXISTING GAME LOGIC =====
  function answerRound(game: ChoiceGameKey, choice: string) {
    const rounds = getRounds(game)
    const index = roundIndexes[game]
    const current = rounds[index]
    let nextIndex = (index + 1) % rounds.length

    if (game === 'math') {
      nextIndex = randomIndex(rounds.length)
      if (rounds.length > 1 && nextIndex === index) nextIndex = (nextIndex + 1) % rounds.length
    }

    if (choice === current.correct) {
      addStars(1)
      setMessage('Awesome answer!')
    } else {
      setMessage(`Good try! The answer was ${current.correct}.`)
    }
    setRoundIndexes((currentIndexes) => ({ ...currentIndexes, [game]: nextIndex }))
    setAnswerOrders((currentOrders) => ({ ...currentOrders, [game]: shuffleAnswers(rounds[nextIndex].answers) }))
  }

  function flipCard(index: number) {
    if (flipped.includes(index) || matched.includes(`${index}`) || flipped.length === 2) return

    const nextFlipped = [...flipped, index]
    setFlipped(nextFlipped)

    if (nextFlipped.length === 2) {
      const [first, second] = nextFlipped
      const currentBoard = memoryBoards[memoryBoardIndex]
      if (currentBoard[first] === currentBoard[second]) {
        const nextMatched = [...matched, `${first}`, `${second}`]
        setMatched(nextMatched)
        setFlipped([])
        if (nextMatched.length === currentBoard.length) {
          addStars(3)
          setMessage('Board cleared! New memory board unlocked!')
          setMemoryBoardIndex((memoryBoardIndex + 1) % memoryBoards.length)
          setMatched([])
        } else {
          setMessage('You found a match!')
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
        setMessage('Rainbow Snake restarted — try another path!')
        return [112, 111, 110]
      }
      const nextSnake = [nextHead, ...currentSnake]
      if (nextHead === snakeGem) {
        setSnakeScore((score) => score + 1)
        setSnakeGem(nextGem)
        addStars(1)
        setMessage('Yum! You collected a gem!')
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
    if (nextTiles.join(',') === '1,2,3,4,5,6,7,8,0') {
      addStars(5)
      setMessage('Puzzle solved! Beautiful work!')
    } else {
      setMessage('Nice move — keep solving!')
    }
  }

  function shufflePuzzle() {
    let nextTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]
    for (let move = 0; move < 80; move += 1) {
      const blankIndex = nextTiles.indexOf(0)
      const possibleMoves = [blankIndex - 3, blankIndex + 3, blankIndex - 1, blankIndex + 1].filter((tileIndex) =>
        tileIndex >= 0 && tileIndex < 9 &&
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

  function popBubble(index: number) {
    if (poppedBubbles.includes(index)) return
    const nextPopped = [...poppedBubbles, index]
    setPoppedBubbles(nextPopped)
    if (nextPopped.length === bubbleTarget) {
      addStars(2)
      setMessage(`Perfect! You popped exactly ${bubbleTarget} bubbles!`)
      window.setTimeout(() => {
        setPoppedBubbles([])
        setBubbleTarget(randomIndex(8) + 1)
      }, 650)
    } else if (nextPopped.length > bubbleTarget) {
      setMessage(`Oops — that was more than ${bubbleTarget}. Try again!`)
      window.setTimeout(() => setPoppedBubbles([]), 650)
    } else {
      setMessage(`${bubbleTarget - nextPopped.length} more to pop!`)
    }
  }

  // ===== TIC-TAC-TOE LOGIC =====
  const tttWinPatterns: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]

  function checkWinner(board: string[]): string | null {
    for (const pattern of tttWinPatterns) {
      const [a, b, c] = pattern
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
    }
    return null
  }

  /**
   * Minimax with alpha-beta pruning — makes the bot unbeatable
   */
  function minimax(
    board: string[],
    isMaximizing: boolean,
    alpha: number,
    beta: number,
    bot: string,
    human: string,
  ): number {
    const winner = checkWinner(board)
    if (winner === bot) return 10
    if (winner === human) return -10
    if (board.every((c) => c !== '')) return 0

    if (isMaximizing) {
      let best = -Infinity
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = bot
          best = Math.max(best, minimax(board, false, alpha, beta, bot, human))
          board[i] = ''
          alpha = Math.max(alpha, best)
          if (beta <= alpha) break
        }
      }
      return best
    } else {
      let best = Infinity
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = human
          best = Math.min(best, minimax(board, true, alpha, beta, bot, human))
          board[i] = ''
          beta = Math.min(beta, best)
          if (beta <= alpha) break
        }
      }
      return best
    }
  }

  function findBestMove(board: string[], bot: string, human: string): number {
    let bestScore = -Infinity
    let bestMove = -1
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = bot
        const score = minimax(board, false, -Infinity, Infinity, bot, human)
        board[i] = ''
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }
    return bestMove
  }

  function tttMove(index: number) {
    if (tttBoard[index] || tttWinner || tttBotThinking) return
    // In 1P mode, the human always plays 'P' (first)
    if (tttMode === '1p' && tttTurn !== 'X') return

    const newBoard = [...tttBoard]
    newBoard[index] = tttTurn
    setTttBoard(newBoard)

    // Check winner
    const winner = checkWinner(newBoard)
    if (winner) {
      setTttWinner(winner)
      setTttWinningLine(tttWinPatterns.find((p) => newBoard[p[0]] === winner && newBoard[p[1]] === winner && newBoard[p[2]] === winner) || [])
      addStars(3)
      setMessage(`${winner === 'X' ? 'X' : 'O'} wins! Amazing!`)
      return
    }

    if (newBoard.every((c) => c !== '')) {
      setTttWinner('draw')
      setMessage("It's a draw! Great game!")
      return
    }

    setTttTurn(tttTurn === 'X' ? 'O' : 'X')
  }

  // Auto-bot move in 1P mode
  useEffect(() => {
    if (tttMode === '1p' && tttTurn === 'O' && !tttWinner && activeGame === 'tictactoe' && !tttBotThinking) {
      setTttBotThinking(true)
      const timer = setTimeout(() => {
        const bestMove = findBestMove([...tttBoard], 'O', 'X')
        if (bestMove >= 0) {
          const newBoard = [...tttBoard]
          newBoard[bestMove] = 'O'
          setTttBoard(newBoard)
          const winner = checkWinner(newBoard)
          if (winner) {
            setTttWinner(winner)
            setTttWinningLine(tttWinPatterns.find((p) => newBoard[p[0]] === winner && newBoard[p[1]] === winner && newBoard[p[2]] === winner) || [])
            addStars(1)
            setMessage('O wins! The bot got you!')
          } else if (newBoard.every((c) => c !== '')) {
            setTttWinner('draw')
            setMessage("It's a draw! Nice defense!")
          } else {
            setTttTurn('X')
          }
        }
        setTttBotThinking(false)
      }, 500)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tttTurn, tttMode, tttWinner, activeGame, tttBoard])

  function tttReset() {
    setTttBoard(Array(9).fill(''))
    setTttTurn('X')
    setTttWinner(null)
    setTttWinningLine([])
    setTttBotThinking(false)
    setMessage('Tic-Tac-Toe!')
  }

  function tttSetMode(mode: '1p' | '2p') {
    setTttMode(mode)
    tttReset()
    setMessage(mode === '1p' ? '1 Player — you are X, bot is O!' : '2 Players — X vs O!')
  }

  // ===== DRAWING LOGIC (Pointer Events — unified touch+mouse, accurate on all devices) =====
  function initCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, rect.width, rect.height)
    restoreCtxProps(ctx)
    drawHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)]
  }

  function restoreCtxProps(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = drawColor
    ctx.lineWidth = drawSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  // ResizeObserver — reinit canvas on orientation change / resize
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (activeGame === 'drawing') {
      const timer = window.setTimeout(initCanvas, 50)
      // Watch for resize (orientation change, mobile keyboard, etc.)
      const canvas = canvasRef.current
      if (canvas && canvas.parentElement) {
        resizeObserverRef.current?.disconnect()
        const ro = new ResizeObserver(() => {
          // Debounce: wait for layout to settle
          clearTimeout(timer)
          window.setTimeout(initCanvas, 100)
        })
        ro.observe(canvas.parentElement)
        resizeObserverRef.current = ro
      }
      return () => {
        clearTimeout(timer)
        resizeObserverRef.current?.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGame])

  function getCanvasPos(e: React.PointerEvent): { x: number; y: number } | null {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function drawStart(e: React.PointerEvent) {
    e.preventDefault()
    const pos = getCanvasPos(e)
    if (!pos) return
    setIsDrawing(true)
    lastPosRef.current = pos
    // Capture pointer so we don't lose events if finger leaves canvas
    const canvas = canvasRef.current
    if (canvas) canvas.setPointerCapture(e.pointerId)
  }

  function drawMove(e: React.PointerEvent) {
    if (!isDrawing) return
    const pos = getCanvasPos(e)
    if (!pos || !lastPosRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = drawColor
    ctx.lineWidth = drawSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    lastPosRef.current = pos
  }

  function drawEnd(e: React.PointerEvent) {
    setIsDrawing(false)
    lastPosRef.current = null
    const canvas = canvasRef.current
    if (!canvas) return
    try { canvas.releasePointerCapture(e.pointerId) } catch { /* ignore */ }
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawHistoryRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
  }

  function clearCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = 'white'
    const rect = canvas.getBoundingClientRect()
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
    restoreCtxProps(ctx)
    drawHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)]
    setMessage('Canvas cleared! Start a new masterpiece!')
  }

  function undoDrawing() {
    if (drawHistoryRef.current.length <= 1) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawHistoryRef.current.pop()
    ctx.putImageData(drawHistoryRef.current[drawHistoryRef.current.length - 1], 0, 0)
    restoreCtxProps(ctx)
    setMessage('Undone!')
  }

  // ===== TYPING LOGIC =====
  function pickTypingTarget(mode: 'letters' | 'words') {
    if (mode === 'letters') {
      const set = typingLetterSets.letters
      setTypingTarget(set[randomIndex(set.length)].display)
      setTypingMode('letters')
    } else {
      const set = typingLetterSets.words
      setTypingTarget(set[randomIndex(set.length)])
      setTypingMode('words')
    }
    setTypingInput('')
    setTypingResult('idle')
  }

  function handleTypingInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toUpperCase()
    if (val.length > typingTarget.length) return
    setTypingInput(val)

    if (val.length === typingTarget.length) {
      setTypingTotal((t) => t + 1)
      if (val === typingTarget) {
        setTypingCorrect((c) => c + 1)
        setTypingResult('correct')
        setMessage(`Correct! ${typingTarget}!`)
        addStars(1)
        setTimeout(() => {
          pickTypingTarget(typingMode)
        }, 600)
      } else {
        setTypingResult('incorrect')
        setMessage(`Almost! Target was ${typingTarget}`)
        setTimeout(() => {
          setTypingInput('')
          setTypingResult('idle')
        }, 800)
      }
    }
  }

  function switchTypingMode(mode: 'letters' | 'words') {
    pickTypingTarget(mode)
    setTypingCorrect(0)
    setTypingTotal(0)
  }

  // ===== FLASHCARD LOGIC =====
  const currentCards = flashcardCategories[flashcardCat as keyof typeof flashcardCategories] || flashcardCategories.Animals
  const currentCard = currentCards[flashcardIdx]

  function toggleFlashcard() {
    setFlashcardFlipped(!flashcardFlipped)
  }

  function nextFlashcard() {
    setFlashcardFlipped(false)
    setFlashcardIdx((flashcardIdx + 1) % currentCards.length)
  }

  function prevFlashcard() {
    setFlashcardFlipped(false)
    setFlashcardIdx((flashcardIdx - 1 + currentCards.length) % currentCards.length)
  }

  function switchFlashcardCat(cat: string) {
    setFlashcardCat(cat)
    setFlashcardIdx(0)
    setFlashcardFlipped(false)
  }

  // ===== GAME NAVIGATION =====
  function openGame(game: GameKey) {
    setActiveGame(game)
    setMessage(`Let's play ${allGames.find(g => g.key === game)?.title || game}!`)
    if (game === 'tictactoe') {
      tttReset()
      setMessage('Tic-Tac-Toe!')
    }
    if (game === 'typing') {
      pickTypingTarget(typingMode)
    }
  }

  function closeGame() {
    setActiveGame(null)
    updateStreak()
    setDailyStreak(getStreakData().count)
  }

  // ===== RENDER: CHOICE GAME (existing) =====
  function renderChoiceVisual(game: ChoiceGameKey, answer: string) {
    if (game === 'colors') return <span className={`choice-swatch swatch-${answer.toLowerCase()}`}></span>
    if (game === 'shapes') return <span className={`choice-shape shape-${answer.toLowerCase()}`}></span>
    if (game === 'counting') return <span className="choice-number-tower">{Array.from({ length: Math.min(Number(answer) || 1, 8) }, (_, index) => <i key={index}></i>)}</span>
    if (game === 'bigger') return <span className="choice-stack">{Array.from({ length: answer === 'Same' ? 2 : Math.min(Number(answer) || 1, 8) }, (_, index) => <i key={index}></i>)}</span>
    if (game === 'animals') return <span className="choice-paw"><i></i><i></i><i></i><i></i></span>
    if (game === 'science') return <span className="choice-flask"><i></i></span>
    if (game === 'spelling') return <span className="choice-letter-card">Aa</span>
    if (game === 'math') return <span className="choice-number-card">#</span>
    return null
  }

  function renderChoiceGame(game: ChoiceGameKey) {
    const rounds = getRounds(game)
    const round = rounds[roundIndexes[game]]
    return (
      <div className="challenge-card">
        <div className="game-card-topbar">
          <div>
            <p className="round-count">{round.helper ?? `${allGames.find(g => g.key === game)?.title || game} round ${roundIndexes[game] + 1} of ${rounds.length}`}</p>
            <h2>{allGames.find(g => g.key === game)?.title || game}</h2>
          </div>
        </div>
        <div className={`custom-game-art art-${game === 'riddles' ? 'riddles' : game}`} aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        <p className={game === 'counting' ? 'question counting-question' : 'question'}>{round.prompt}</p>
        <div className={`answer-grid visual-grid ${game}-grid`}>
          {(answerOrders[game] ?? round.answers).map((answer) => (
            <button key={answer} className="visual-answer" onClick={() => answerRound(game, answer)} type="button" aria-label={`Answer: ${answer}`}>
              {renderChoiceVisual(game, answer)}
              <span>{answer}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ===== RENDER: ACTIVE GAME PANEL =====
  function renderActiveGame() {
    if (!activeGame) return null
    const gameInfo = allGames.find(g => g.key === activeGame)!

    return (
      <div className="game-panel-overlay">
        <div className="game-panel-header">
          <button className="game-panel-back" onClick={closeGame} type="button" aria-label="Back to game menu">
            ← Back
          </button>
          <span className="game-panel-title"><Icon name={gameInfo.icon} size={22} /> {gameInfo.title}</span>
          <span className="game-panel-stars"><Icon name="⭐" size={16} /> {starScore}</span>
        </div>
        <div className="game-panel-content" ref={panelRef}>
          {/* CHOICE GAMES */}
          {(['math', 'science', 'patterns', 'spelling', 'colors', 'counting', 'shapes', 'animals', 'bigger', 'riddles'] as GameKey[]).includes(activeGame) && (
            renderChoiceGame(activeGame as ChoiceGameKey)
          )}

          {/* MEMORY GAME */}
          {activeGame === 'memory' && (
            <div className="challenge-card">
              <div className="game-card-topbar">
                <div>
                  <p className="round-count">Memory board {memoryBoardIndex + 1} of {memoryBoards.length}</p>
                  <h2>Memory Match</h2>
                </div>
              </div>
              <div className="memory-grid">
                {memoryBoards[memoryBoardIndex].map((card: string, index: number) => {
                  const isVisible = flipped.includes(index) || matched.includes(`${index}`)
                  return (
                    <button key={`${memoryBoardIndex}-${card}-${index}`}
                      className={`memory-card ${matched.includes(`${index}`) ? 'matched' : ''}`}
                      onClick={() => flipCard(index)} type="button" aria-label={isVisible ? card : 'Hidden card'}>
                      {isVisible ? card : '?'}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* SNAKE GAME */}
          {activeGame === 'snake' && (
            <div className="challenge-card">
              <div className="snake-topbar game-card-topbar">
                <div>
                  <p className="round-count">Score: {snakeScore}</p>
                  <h2>Rainbow Snake</h2>
                </div>
              </div>
              <p className="snake-help">Collect gems, grow longer, avoid walls!</p>
              <div className="snake-game-shell">
                <div className="snake-board" aria-label="Rainbow Snake game board">
                  {Array.from({ length: 225 }, (_, index) => {
                    const isHead = snakeCells[0] === index
                    const isBody = snakeCells.includes(index)
                    const isGem = snakeGem === index
                    return <span key={index} className={isHead ? 'snake-head' : isBody ? 'snake-body' : isGem ? 'snake-gem' : ''}>{isGem ? <Icon name="💎" size={18} /> : ''}</span>
                  })}
                </div>
                <div className="snake-controls">
                  <button type="button" onClick={() => moveSnake(-15)} disabled={snakeDirection === 15} aria-label="Move up">↑</button>
                  <button type="button" onClick={() => moveSnake(-1)} disabled={snakeDirection === 1} aria-label="Move left">←</button>
                  <button type="button" onClick={() => moveSnake(1)} disabled={snakeDirection === -1} aria-label="Move right">→</button>
                  <button type="button" onClick={() => moveSnake(15)} disabled={snakeDirection === -15} aria-label="Move down">↓</button>
                </div>
              </div>
            </div>
          )}

          {/* PUZZLE GAME */}
          {activeGame === 'puzzles' && (
            <div className="challenge-card">
              <div className="game-card-topbar">
                <div>
                  <p className="round-count">Moves: {puzzleMoves}</p>
                  <h2>Puzzle Portal</h2>
                </div>
              </div>
              <p className="snake-help">Slide tiles into the empty space until the board reads 1 to 8.</p>
              <div className="tile-puzzle" aria-label="Sliding tile puzzle">
                {puzzleTiles.map((tile: number, index: number) => (
                  <button key={`${tile}-${index}`}
                    className={tile === 0 ? 'tile empty' : 'tile'}
                    onClick={() => movePuzzleTile(index)}
                    type="button"
                    aria-label={tile === 0 ? 'Empty puzzle space' : `Move tile ${tile}`}>
                    {tile !== 0 ? tile : ''}
                  </button>
                ))}
              </div>
              <div className="puzzle-actions">
                <button type="button" onClick={shufflePuzzle}>Shuffle</button>
                <button type="button" onClick={() => { setPuzzleTiles([1, 2, 3, 4, 5, 6, 7, 8, 0]); setPuzzleMoves(0); setMessage('Puzzle reset!') }}>Reset</button>
              </div>
            </div>
          )}

          {/* BUBBLE POP */}
          {activeGame === 'bubbles' && (
            <div className="challenge-card">
              <div className="game-card-topbar">
                <div>
                  <p className="round-count">Stars: {starScore}</p>
                  <h2>Bubble Pop</h2>
                </div>
              </div>
              <div className={`custom-game-art art-bubbles`} aria-hidden="true"><span></span><span></span><span></span><span></span></div>
              <p className="question bubble-instruction">Pop exactly <strong>{bubbleTarget}</strong> bubbles</p>
              <div className="bubble-board" aria-label={`Pop exactly ${bubbleTarget} bubbles`}>
                {Array.from({ length: 12 }, (_, index) => (
                  <button key={index} type="button"
                    className={poppedBubbles.includes(index) ? 'bubble popped' : 'bubble'}
                    onClick={() => popBubble(index)}
                    aria-label={`Bubble ${index + 1}`}>
                    <span></span>
                  </button>
                ))}
              </div>
              <div className="bubble-progress" aria-hidden="true">
                <span style={{ width: `${Math.min(100, (poppedBubbles.length / bubbleTarget) * 100)}%` }}></span>
              </div>
            </div>
          )}

          {/* TIC-TAC-TOE */}
          {activeGame === 'tictactoe' && (
            <div className="challenge-card">
              <div className="game-card-topbar">
                <div>
                  <p className="round-count"><Icon name="X" size={18} /> vs <Icon name="O" size={18} /></p>
                  <h2>Tic-Tac-Toe</h2>
                </div>
              </div>

              {/* Mode selector */}
              <div className="ttt-mode-selector">
                <button type="button"
                  className={`ttt-mode-btn ${tttMode === '2p' ? 'active' : ''}`}
                  onClick={() => tttSetMode('2p')}
                  aria-label="Two player mode">
                  <img src="/aaron-playground/icon-two-players.svg" alt="" className="ttt-mode-img" />
                  <span className="ttt-mode-label">2 Players</span>
                </button>
                <button type="button"
                  className={`ttt-mode-btn ${tttMode === '1p' ? 'active' : ''}`}
                  onClick={() => tttSetMode('1p')}
                  aria-label="Play vs bot">
                  <img src="/aaron-playground/icon-robot.svg" alt="" className="ttt-mode-img" />
                  <span className="ttt-mode-label">vs Bot</span>
                </button>
              </div>

              <p className="tictactoe-status">
                {tttBotThinking ? <span className="bot-thinking">Bot thinking<span className="thinking-dots"><span>.</span><span>.</span><span>.</span></span></span> :
                 tttWinner === 'draw' ? "It's a draw! Great game!" :
                 tttWinner ? <><Icon name={tttWinner} size={32} /> wins!</> :
                 <><Icon name={tttTurn} size={32} />'s turn</>}
              </p>
              <div className="tictactoe-board">
                {tttBoard.map((cell, i) => (
                  <button key={i} type="button"
                    className={`tictactoe-cell ${cell ? 'taken' : ''} ${tttWinningLine.includes(i) ? 'winning' : ''}`}
                    onClick={() => tttMove(i)}
                    aria-label={cell === 'X' ? 'X' : cell === 'O' ? 'O' : `Empty cell ${i + 1}`}
                    disabled={!!cell || !!tttWinner || tttBotThinking}>
                    {cell === 'X' ? <Icon name="X" size={64} /> : cell === 'O' ? <Icon name="O" size={64} /> : ''}
                  </button>
                ))}
              </div>
              <button className="tictactoe-reset" onClick={tttReset} type="button" aria-label="Reset game">🔄 New Game</button>
            </div>
          )}

          {/* DRAWING PAD */}
          {activeGame === 'drawing' && (
            <div className="challenge-card">
              <div className="game-card-topbar">
                <div>
                  <h2><Icon name="✏️" size={20} /> Drawing Pad</h2>
                </div>
              </div>
              <div className="drawing-container">
                <div className="drawing-canvas-wrapper">
                  <canvas ref={canvasRef} className="drawing-canvas"
                    onPointerDown={drawStart} onPointerMove={drawMove} onPointerUp={drawEnd} onPointerLeave={drawEnd}
                    aria-label="Drawing canvas" />
                </div>
                <div className="drawing-tools">
                  {drawColors.map((c) => (
                    <button key={c} type="button"
                      className={`drawing-color-btn ${drawColor === c ? 'active' : ''}`}
                      style={{ background: c }}
                      onClick={() => setDrawColor(c)}
                      aria-label={`Color ${c}`} />
                  ))}
                </div>
                <div className="drawing-tools">
                  {drawSizes.map((s) => (
                    <button key={s} type="button"
                      className={`drawing-size-btn ${drawSize === s ? 'active' : ''}`}
                      onClick={() => setDrawSize(s)}
                      aria-label={`Brush size ${s}`}>
                      {s}px
                    </button>
                  ))}
                  <button className="drawing-action-btn undo" onClick={undoDrawing} type="button" aria-label="Undo last stroke">↩ Undo</button>
                  <button className="drawing-action-btn clear" onClick={clearCanvas} type="button" aria-label="Clear canvas">Clear</button>
                </div>
              </div>
            </div>
          )}

          {/* TYPING PRACTICE */}
          {activeGame === 'typing' && (
            <div className="challenge-card">
              <div className="game-card-topbar">
                <div>
                  <h2><Icon name="⌨️" size={20} /> Quick Typing</h2>
                </div>
              </div>
              <div className="typing-container">
                <div className="typing-mode-toggle">
                  <button type="button"
                    className={`typing-mode-btn ${typingMode === 'letters' ? 'active' : ''}`}
                    onClick={() => switchTypingMode('letters')}
                    aria-label="Letter mode">Letters</button>
                  <button type="button"
                    className={`typing-mode-btn ${typingMode === 'words' ? 'active' : ''}`}
                    onClick={() => switchTypingMode('words')}
                    aria-label="Word mode">Words</button>
                </div>
                <div className="typing-display" aria-live="assertive">
                  {typingTarget.split('').map((char, i) => (
                    <span key={i} style={{
                      color: i < typingInput.length
                        ? typingInput[i] === char ? 'var(--teal)' : 'var(--coral)'
                        : 'var(--navy)',
                      opacity: i < typingInput.length ? 1 : 0.5,
                    }}>{char}</span>
                  ))}
                </div>
                <input type="text" className={`typing-input ${typingResult}`}
                  value={typingInput}
                  onChange={handleTypingInput}
                  placeholder="Type here..."
                  aria-label="Typing input"
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false" />
                <div className="typing-stats">
                  <div className="typing-stat">
                    <div className="typing-stat-value">{typingCorrect}</div>
                    <div className="typing-stat-label">Correct</div>
                  </div>
                  <div className="typing-stat">
                    <div className="typing-stat-value">{typingTotal}</div>
                    <div className="typing-stat-label">Total</div>
                  </div>
                  <div className="typing-stat">
                    <div className="typing-stat-value">{typingTotal > 0 ? Math.round((typingCorrect / typingTotal) * 100) : 0}%</div>
                    <div className="typing-stat-label">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FLASHCARDS */}
          {activeGame === 'flashcards' && (
            <div className="challenge-card">
              <div className="game-card-topbar">
                <div>
                  <h2><Icon name="📇" size={20} /> Flash Cards</h2>
                </div>
              </div>
              <div className="flashcards-container">
                <div className="flashcard-category-tabs">
                  {Object.keys(flashcardCategories).map((cat) => (
                    <button key={cat} type="button"
                      className={`flashcard-cat-btn ${flashcardCat === cat ? 'active' : ''}`}
                      onClick={() => switchFlashcardCat(cat)}
                      aria-label={`Category: ${cat}`}>
                      {cat}
                    </button>
                  ))}
                </div>
                {currentCard && (
                  <div className={`flashcard ${flashcardFlipped ? 'flipped' : ''}`} onClick={toggleFlashcard} role="button" tabIndex={0} aria-label="Tap to flip card" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleFlashcard() }}>
                    <div className="flashcard-inner">
                      <div className="flashcard-front">
                        <div className="flashcard-emoji"><EmojiIcon emoji={currentCard.emoji} size={56} /></div>
                        <div className="flashcard-label">{flashcardCat}</div>
                        <div className="flashcard-title">{currentCard.title}</div>
                      </div>
                      <div className="flashcard-back">
                        <div className="flashcard-fact">{currentCard.fact}</div>
                        <div className="flashcard-hint">👆 Tap to flip back</div>
                      </div>
                    </div>
                  </div>
                )}
                <p className="flashcard-tap-hint">👆 Tap card to flip</p>
                <div className="flashcard-nav">
                  <button type="button" onClick={prevFlashcard} aria-label="Previous card">← Previous</button>
                  <span className="flashcard-counter">{flashcardIdx + 1} / {currentCards.length}</span>
                  <button type="button" onClick={nextFlashcard} aria-label="Next card">Next →</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ===== RENDER: GAME GRID =====
  function renderGameGrid() {
    const games = gamesByCategory[category]
    return (
      <section aria-label={`${categoryInfo[category].label} games`}>
        <div className="section-header">
          <h2><Icon name={categoryInfo[category].icon} size={22} /> {categoryInfo[category].label}</h2>
        </div>
        <div className="game-grid">
          {games.map((key) => {
            const info = allGames.find(g => g.key === key)!
            const isNew = ['tictactoe', 'drawing', 'typing', 'flashcards'].includes(key)
            return (
              <button key={key} type="button"
                className={`game-card ${isNew ? 'new-badge' : ''}`}
                onClick={() => openGame(key)}
                aria-label={`Play ${info.title}`}>
                <span className="game-card-icon"><Icon name={info.icon} size={32} /></span>
                <span className="game-card-title">{info.title}</span>
                <span className="game-card-desc">{info.description}</span>
                <span className="game-card-badge">{info.level}</span>
              </button>
            )
          })}
        </div>
      </section>
    )
  }

  // ===== MAIN RENDER =====
  return (
    <div className={hasParentAgreement ? 'app-container' : 'app-container locked'}>
      {/* Parent Supervision Gate */}
      {!hasParentAgreement && (
        <section className="supervision-gate" aria-labelledby="supervision-title" role="dialog" aria-modal="true">
          <div className="supervision-card">
            <img src="/aaron-playground/parent-supervision.jpg" alt="Aaron Playground welcome" />
            <div className="supervision-copy">
              <p className="eyebrow">Before You Play</p>
              <h2 id="supervision-title">Parent supervision required</h2>
              <p>
                Aaron Playground is made for kids. Please play with parent or guardian supervision.
                You can only enter the games if you agree to play safely with supervision.
              </p>
              {agreementMessage && <p className="agreement-warning" role="alert">{agreementMessage}</p>}
              <div className="agreement-actions">
                <button type="button" onClick={() => setHasParentAgreement(true)}><Icon name="🎮" size={18} /> I agree — let me play!</button>
                <button type="button" className="reject"
                  onClick={() => setAgreementMessage('You need parent or guardian supervision to play Aaron Playground.')}>
                  I do not agree
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <span className="header-logo-icon"><Icon name="🌈" size={28} /></span>
          <h1>Aaron <span>Playground</span></h1>
        </div>
        <div className="header-stats">
          <span className="stat-badge stars" aria-label={`${starScore} stars earned`}>
            <span className="stat-badge-icon"><Icon name="⭐" size={16} /></span> {starScore}
          </span>
          <span className="stat-badge streak" aria-label={`${dailyStreak} day streak`}>
            <span className="stat-badge-icon"><Icon name="🔥" size={16} /></span> {dailyStreak}
          </span>
        </div>
      </header>

      {/* Fun Facts Carousel */}
      <div className="fun-facts-bar">
        <span className="fun-fact-text">{funFactsList[funFactIndex]}</span>
        <div className="fun-fact-nav">
          <button type="button" onClick={() => setFunFactIndex((funFactIndex - 1 + funFactsList.length) % funFactsList.length)} aria-label="Previous fun fact">‹</button>
          <button type="button" onClick={() => setFunFactIndex((funFactIndex + 1) % funFactsList.length)} aria-label="Next fun fact">›</button>
        </div>
      </div>

      {/* Daily Brain Challenge */}
      <div className="daily-challenge" onClick={() => {
        const dc = getDailyChallenge()
        const targetMap: Record<string, GameKey> = {
          'Math Blitz': 'math', 'Memory Master': 'memory', 'Science Explorer': 'science',
          'Snake Champion': 'snake', 'Puzzle Solver': 'puzzles', 'Spelling Star': 'spelling',
          'Riddle Master': 'riddles', 'Number Compare': 'bigger', 'Pattern Pro': 'patterns',
          'Creative Creator': 'drawing',
        }
        const target = targetMap[dc.title] || 'math'
        openGame(target)
      }} role="button" tabIndex={0} aria-label="Daily Brain Challenge" onKeyDown={(e) => { if (e.key === 'Enter') { openGame('math') }}}>
        <span className="daily-challenge-icon"><EmojiIcon emoji={getDailyChallenge().emoji} size={44} /></span>
        <div className="daily-challenge-text">
          <div className="daily-label"><Icon name="🌟" size={14} /> Daily Brain Challenge</div>
          <div className="daily-title">{getDailyChallenge().title}</div>
          <div className="daily-desc">{getDailyChallenge().desc}</div>
        </div>
        <span className="daily-challenge-arrow">→</span>
      </div>

      {/* Hero */}
      <section className="hero" aria-labelledby="main-title">
        <div className="hero-mascots"><Icon name="🚀" size={36} /><Icon name="🌈" size={36} /><Icon name="🎨" size={36} /><Icon name="🧠" size={36} /><Icon name="✨" size={36} /></div>
        <h2 id="main-title">Welcome to <span>Aaron Playground</span>!</h2>
        <p>Where learning meets fun! Explore games, study cool facts, create art, and challenge your brain. Every day is a new adventure!</p>
      </section>

      {/* Category Tabs */}
      <nav className="category-tabs" aria-label="Game categories">
        {(Object.keys(categoryInfo) as Category[]).map((cat) => (
          <button key={cat} type="button"
            className={`category-tab ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
            aria-label={`${categoryInfo[cat].label} games`}
            aria-current={category === cat ? 'page' : undefined}>
            <span className="tab-icon">{categoryInfo[cat].icon}</span>
            <span className="tab-label">{categoryInfo[cat].label}</span>
          </button>
        ))}
      </nav>

      {/* Status Message */}
      <p className="status-message" role="status" aria-live="polite">{message}</p>

      {/* Game Grid */}
      {renderGameGrid()}

      {/* Footer */}
      <footer className="footer">
        <span className="footer-emoji"><Icon name="🌟" size={16} /></span> Made with love for curious kids everywhere! <span className="footer-emoji"><Icon name="🌈" size={16} /></span>
        <br />Keep playing, keep learning, keep shining!
      </footer>

      {/* Active Game Panel */}
      {activeGame && renderActiveGame()}

      {/* Milestone Popup */}
      {showMilestone && (
        <div className="milestone-popup" role="dialog" aria-modal="true" aria-label="Achievement milestone">
          <div className="milestone-card">
            <div className="milestone-icon"><Icon name="🏆" size={48} /></div>
            <div className="milestone-title">Milestone Reached!</div>
            <div className="milestone-desc">{showMilestone}</div>
            <button className="milestone-close" onClick={() => setShowMilestone(null)} type="button" aria-label="Close milestone"><Icon name="🎉" size={18} /> Awesome!</button>
          </div>
        </div>
      )}

      {/* Confetti */}
      {confetti.length > 0 && (
        <div className="confetti-container" aria-hidden="true">
          {confetti.map((piece) => (
            <div key={piece.id} className="confetti-piece"
              style={{
                left: `${piece.x}%`,
                background: piece.color,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
