document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('start-button');
  const gameContent = document.getElementById('game-content');
  const gameOverScreen = document.getElementById('game-over');
  const playAgainButton = document.getElementById('play-again-button');
  const wordDisplay = document.getElementById('word-display');
  const keyboard = document.getElementById('keyboard');
  const incorrectGuessesDisplay = document.getElementById('incorrect-count');
  const imageContainer = document.getElementById('image-container');
  let round = 1;
  let incorrectGuesses = 0;
  let currentWordIndex = 0;
  let currentWord = '';
  let guessedLetters = [];

  startButton.addEventListener('click', startGame);
  playAgainButton.addEventListener('click', resetGame);

  const wordImageMap = {
    red: 'red',
    blue: 'blue',
    yellow: 'yellow',
    green: 'green',
    purple: 'purple',
    pink: 'pink',
    gray: 'gray',
    orange: 'orange',
    white: 'white',
    black: 'black',
    brown: 'brown',
    snake: 'snake',
    eagle: 'eagle',
    sheep: 'sheep',
    crow: 'crow',
    pigeon: 'pigeon',
    frog: 'frog',
    hamster: 'hamster',
    cat: 'cat',
    dog: 'dog',
    rabbit: 'rabbit',
    goldfish: 'goldfish',
    horse: 'horse',
    fox: 'fox',
    chicken: 'chicken',
    owl: 'owl',
    deer: 'deer',
    hedgehog: 'hedgehog',
    cow: 'cow',
    dove: 'dove',
    pig: 'pig',
    tiger: 'tiger',
    bread: 'bread',
    cereal: 'cereal',
    apple: 'apple',
    becon: 'becon',
    broccoli: 'broccoli',
    butter: 'butter',
    cabbage: 'cabbage',
    cake: 'cake',
    cheese: 'cheese',
    cucumber: 'cucumber',
    eggs: 'eggs',
    grapes: 'grapes',
    honey: 'honey',
    lemon: 'lemon',
    mango: 'mango',
    milk: 'milk',
    mushroom: 'mushroom',
    pasta: 'pasta',
    peach: 'peach',
    pepper: 'pepper',
    pizza: 'pizza',
    tomato: 'tomato',
    watermelon: 'watermelon',
    badminton: 'badminton',
    aerobics: 'aerobics',
    tennis_court: 'tennis_court',
    football_pitch: 'football_pitch',
    golf_course: 'golf_course',
    running_track: 'running_track',
    squash_court: 'squash_court',
    swimming_pool: 'swimming_pool',
    stand: 'stand',
    backgammon: 'backgammon',
    chess: 'chess',
    go: 'go',
    badminton_racquet: 'badminton_racquet',
    baseball_bat: 'baseball_bat',
    cricket_bat: 'cricket_bat',
    boxing_glove: 'boxing_glove',
    fishing_rod: 'fishing_rod',
    hockey_stick: 'hockey_stick',
    american_football: 'american_football',
    archery: 'archery',
    athletics: 'athletics',
    basketball: 'basketball',
    beach_volleyball: 'beach_volleyball',
    dominoes: 'dominoes',
    baseball: 'baseball',
    cricket_ground: 'cricket_ground',
    boxing_ring: 'boxing_ring',
    cymbals: 'cymbals',
    drum_kit: 'drum_kit',
    tambourine: 'tambourine',
    bass_drum: 'bass_drum',
    recoreder: 'recoreder',
    saxophone: 'saxophone',
    bassoon: 'bassoon',
    clarinet: 'clarinet',
    flute: 'flute',
    harmonica: 'harmonica',
    oboe: 'oboe',
    piccolo: 'piccolo',
    bagpipes: 'bagpipes',
    electric_guitar: 'electric_guitar',
    cello: 'cello',
    acustic_guitar: 'acoustic_guitar',
    banjo: 'banjo',
    bass_guitar: 'bass_guitar',
    piano: 'piano',
    grand_piano: 'grand_piano',
    organ: 'organ',
    electronic_keyboard: 'electronic_keyboard',
    accordeon: 'accordeon',
    clock: 'clock',
    pillow: 'pillow',
    wordrobe: 'wordrobe',
    armchair: 'armchair',
    bed: 'bed',
    bookcase: 'bookcase',
    carpet: 'carpet',
    coffee_table: 'coffee_table',
    curtains: 'curtains',
    desk: 'desk',
    lamp: 'lamp',
    mirror: 'mirror',
    sofa: 'sofa'
  };

  const words = Object.keys(wordImageMap);

  function startGame() {
    startButton.style.display = 'none';
    gameContent.classList.remove('hidden');
    setupRound();
  }

  function resetGame() {
  window.location.reload(); // Reload the page
}


function setupRound() {
  guessedLetters = [];
  incorrectGuesses = 0; // Reset incorrect guesses count
  incorrectGuessesDisplay.textContent = incorrectGuesses; // Update display
  currentWordIndex = Math.floor(Math.random() * words.length);
  currentWord = words[currentWordIndex];
  wordDisplay.textContent = '_'.repeat(currentWord.length);
  renderKeyboard();
  displayWordImage(currentWord);
}

function renderKeyboard() {
  keyboard.innerHTML = '';
  const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  keyboardLayout.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('keyboard-row');
    row.forEach(letter => {
      const button = document.createElement('button');
      button.textContent = letter.toUpperCase();
      button.addEventListener('click', () => handleGuess(letter));
      rowDiv.appendChild(button);
    });
    keyboard.appendChild(rowDiv);
  });
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter)) return;
  guessedLetters.push(letter);
  if (!currentWord.includes(letter)) {
    incorrectGuesses++;
    incorrectGuessesDisplay.textContent = incorrectGuesses;
    markIncorrectLetter(letter);
    if (incorrectGuesses === 3) {
      endGame();
    }
  } else {
    updateWordDisplay(letter);
    if (wordDisplay.textContent === currentWord) {
      setTimeout(() => {
        if (round === 10) {
          endGame();
        } else {
          round++;
          setupRound();
          updateRoundInfo();
        }
      }, 1000);
    }
  }
}

function updateWordDisplay(letter) {
  const wordArray = wordDisplay.textContent.split('');
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      wordArray[i] = letter;
    }
  }
  wordDisplay.textContent = wordArray.join('');
}

function updateRoundInfo() {
  document.getElementById('round-count').textContent = round;
}

function endRound() {
  setTimeout(() => {
    setupRound();
  }, 1000);
}

function endGame() {
  gameContent.classList.add('hidden');
  gameOverScreen.classList.remove('hidden');
}

function markIncorrectLetter(letter) {
  const buttons = keyboard.querySelectorAll('button');
  for (let button of buttons) {
    if (button.textContent.toLowerCase() === letter) {
      button.classList.add('incorrect');
    }
  }
}

function displayWordImage(word) {
  const imagePath = wordImageMap[word];
  if (imagePath) {
    imageContainer.innerHTML = `<img src="images/${imagePath}.jpeg" alt="Image for ${word}">`;
  }
}
});
