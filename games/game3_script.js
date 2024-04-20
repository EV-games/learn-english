const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const gridContainer = document.getElementById('grid');
const messageContainer = document.getElementById('message');

// Array of all available images
const allImages = [
'red',
'blue',
'yellow',
'green',
'purple',
'pink',
'gray',
'orange',
'white',
'black',
'brown',
'snake',
'eagle',
'sheep',
'crow',
'pigeon',
'frog',
'hamster',
'cat',
'dog',
'rabbit',
'goldfish',
'horse',
'fox',
'chicken',
'owl',
'deer',
'hedgehog',
'cow',
'dove',
'pig',
'tiger',
'bread',
'cereal',
'apple',
'becon',
'broccoli',
'butter',
'cabbage',
'cake',
'cheese',
'cucumber',
'eggs',
'grapes',
'honey',
'lemon',
'mango',
'milk',
'mushroom',
'pasta',
'peach',
'pepper',
'pizza',
'tomato',
'watermelon',
'badminton',
'aerobics',
'tennis_court',
'football_pitch',
'golf_course',
'running_track',
'squash_court',
'swimming_pool',
'stand',
'backgammon',
'chess',
'go',
'badminton_racquet',
'baseball_bat',
'cricket_bat',
'boxing_glove',
'fishing_rod',
'hockey_stick',
'american_football',
'archery',
'athletics',
'basketball',
'beach_volleyball',
'dominoes',
'baseball',
'cricket_ground',
'boxing_ring',
'cymbals',
'drum_kit',
'tambourine',
'bass_drum',
'recoreder',
'saxophone',
'bassoon',
'clarinet',
'flute',
'harmonica',
'oboe',
'piccolo',
'bagpipes',
'electric_guitar',
'cello',
'acoustic_guitar',
'banjo',
'bass_guitar',
'piano',
'grand_piano',
'organ',
'electronic_keyboard',
'accordeon',
'clock',
'pillow',
'wordrobe',
'armchair',
'bed',
'bookcase',
'carpet',
'coffee_table',
'curtains',
'desk',
'lamp',
'mirror',
'sofa'
];

startBtn.addEventListener('click', startGame);

function startGame() {
  startBtn.style.display = 'none';
  gameContainer.classList.remove('hidden');
  messageContainer.innerText = '';

  // Clear the grid of cards
  gridContainer.innerHTML = '';

  // Select 8 random images from allImages
  const selectedImages = selectRandomImages(allImages, 8);

  // Duplicate the selected images to create pairs
  const images = selectedImages.concat(selectedImages);

  // Shuffle images
  const shuffledImages = shuffle(images);

  // Create grid of cards
  for (let i = 0; i < shuffledImages.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardBack = document.createElement('div');
    cardBack.classList.add('face', 'card-back');

    const imgBack = document.createElement('img');
    imgBack.src = 'cover.png';
    cardBack.appendChild(imgBack);

    card.appendChild(cardBack);

    const cardFront = document.createElement('div');
    cardFront.classList.add('face', 'card-front');

    const imgFront = document.createElement('img');
    imgFront.src = 'images/' + shuffledImages[i] + '.jpeg';
    cardFront.appendChild(imgFront);

    card.appendChild(cardFront);

    gridContainer.appendChild(card);
    card.addEventListener('click', flipCard);
  }
}

let lockGrid = false;
let firstCard = null;
let pairsFound = 0;

function flipCard() {
  if (lockGrid || this === firstCard) return;

  this.classList.toggle('flip');

  if (!firstCard) {
    firstCard = this;
  } else {
    lockGrid = true;
    const secondCard = this;

    const firstImg = firstCard.querySelector('.card-front img').src;
    const secondImg = secondCard.querySelector('.card-front img').src;

    if (firstImg === secondImg) {
      setTimeout(() => {
        firstCard.style.visibility = 'hidden';
        secondCard.style.visibility = 'hidden';
        pairsFound++;
        if (pairsFound === 8) {
          showCongratulations();
        }
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
      }, 1000);
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
      }, 1000);
    }
  }
}

function resetBoard() {
  firstCard = null;
  lockGrid = false;
}

function selectRandomImages(imagesArray, count) {
  const selectedImages = [];
  const allImagesCopy = imagesArray.slice(); // Create a copy to avoid modifying the original array

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * allImagesCopy.length);
    selectedImages.push(allImagesCopy.splice(randomIndex, 1)[0]); // Remove the selected image from the copy
  }

  return selectedImages;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showCongratulations() {
  const congratulationsMsg = document.createElement('p');
  congratulationsMsg.textContent = 'Congratulations! \nYou have completed the game.';
  messageContainer.appendChild(congratulationsMsg);

  const playAgainBtn = document.createElement('button');
  playAgainBtn.textContent = 'Play Again';
  playAgainBtn.addEventListener('click', resetGame);
  messageContainer.appendChild(playAgainBtn);

  // Remove event listeners from all cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.removeEventListener('click', flipCard));

  // Reset pairsFound variable
  pairsFound = 0;
}

function resetGame() {
  // Clear the grid of cards
  gridContainer.innerHTML = '';

  // Reset message container
  messageContainer.innerHTML = '';

  // Show Start Game button
  startBtn.style.display = 'block';

  // Reset pairsFound variable
  pairsFound = 0;
}