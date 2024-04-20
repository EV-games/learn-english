const categories = [
    { name: "Animals", images: [{ text: "Snake", file: "snake" }, { text: "Eagle", file: "eagle" }, { text: "Sheep", file: "sheep" }, 
    { text: "Crow", file: "crow" }, { text: "Pigeon", file: "pigeon" }, { text: "Frog", file: "frog" }, {text: "Hamster", file: "hamster"},
    {text: "Cat", file: "cat"}, {text: "Dog", file: "dog"}, {text: "Rabbit", file: "rabbit"}, {text: "Goldfish", file: "goldfish"}, {text: "Horse", file: "horse"},
    {text: "Fox", file: "fox"}, {text: "Chicken", file: "chicken"}, {text: "Owl", file: "owl"}, {text: "Deer", file: "deer"}, {text: "Hedgehog", file: "hedgehog"},
    {text: "Cow", file: "cow"}, {text: "Dove", file: "dove"}, {text: "Pig", file: "pig"}, {text: "Tiger", file: "tiger"} ]},
    
    { name: "Food", images: [{ text: "Bread", file: "bread" }, { text: "Cereal", file: "cereal" }, { text: "Apple", file: "apple" },
    { text: "Becon", file: "becon" }, { text: "Broccoli", file: "broccoli" }, { text: "Butter", file: "butter" }, {text: "Cabbage", file: "cabbage"},
    {text: "Cake", file: "cake"}, {text: "Cheese", file: "cheese"}, {text: "Cucumber", file: "cucumber"}, {text: "Eggs", file: "eggs"}, 
    {text: "Grapes", file: "grapes"}, {text: "Honey", file: "honey"}, {text: "Lemon", file: "lemon"}, {text: "Mango", file: "mango"}, 
    {text: "Milk", file: "milk"}, {text: "Mushroom", file: "mushroom"}, {text: "Pasta", file: "pasta"}, {text: "Peach", file: "peach"}, 
    {text: "Pepper", file: "pepper"}, {text: "Pizza", file: "pizza"}, {text: "Tomato", file: "tomato"}, {text: "Watermelon", file: "watermelon"} ]},
    
    { name: "Colors", images: [{ text: "Red", file: "red" }, { text: "Blue", file: "blue" }, { text: "Yellow", file: "yellow" }, 
    { text: "Green", file: "green" }, { text: "Purple", file: "purple" }, { text: "Pink", file: "pink" }, {text: "Gray", file: "gray"},
    {text: "Orange", file: "orange"}, {text: "White", file: "white"}, {text: "Black", file: "black"}, {text: "Brown", file: "brown"} ]},
    
    { name: "Sports", images: [{text: "Badminton", file: "badminton"}, {text: "Aerobics", file: "aerobics"}, {text: "Tennis court", file: "tennis_court"},
    {text: "Football pitch", file: "football_pitch"}, {text: "Golf course", file: "golf_course"}, {text: "Running track", file: "running_track"},
    {text: "Squash court", file: "squash_court"},
    {text: "Swimming pool", file: "swimming_pool"}, {text: "Stand", file: "stand"}, {text: "Backgammon", file: "backgammon"}, {text: "Chess", file: "chess"},
    {text: "Go", file: "go"}, {text: "Badminton racquet", file: "badminton_racquet"}, {text: "Baseball bat", file: "baseball_bat"}, {text: "Cricket bat", file: "cricket_bat"},
    {text: "Boxing glove", file: "boxing_glove"}, {text: "Fishing rod", file: "fishing_rod"}, {text: "Hockey stick", file: "hockey_stick"},
    {text: "American football", file: "american_football"},
    {text: "Archery", file: "archery"}, {text: "Athletics", file: "athletics"}, {text: "Basketball", file: "basketball"}, {text: "Beach volleyball", file: "beach_volleyball"},
    {text: "Dominoes", file: "dominoes"}, {text: "Baseball", file: "baseball"}, {text: "Cricket ground", file: "cricket_ground"}, {text: "Boxing ring", file: "boxing_ring"} ]},
    
    { name: "Music", images: [{text: "Cymbals", file: "cymbals"}, {text: "Drum kit", file: "drum_kit"}, {text: "Tambourine", file: "tambourine"},
    {text: "Bass drum", file: "bass_drum"}, {text: "Recoreder", file: "recoreder"}, {text: "Saxophone", file: "saxophone"}, {text: "Bassoon", file: "bassoon"},
    {text: "Clarinet", file: "clarinet"}, {text: "Flute", file: "flute"}, {text: "Harmonica", file: "harmonica"}, {text: "Oboe", file: "oboe"},
    {text: "Piccolo", file: "piccolo"}, {text: "Bagpipes", file: "bagpipes"}, {text: "Electric guitar", file: "electric_guitar"}, {text: "Cello", file: "cello"},
    {text: "Acustic guitar", file: "acustic_guitar"}, {text: "Banjo", file: "banjo"}, {text: "Bass guitar", file: "bass_guitar"}, {text: "Piano", file: "piano"},
    {text: "Grand piano", file: "grand_piano"}, {text: "Organ", file: "organ"}, {text: "Electronic keyboard", file: "electronic_keyboard"}, {text: "Accordeon", file: "accordeon"} ]},
    
    { name: "Furniture", images: [{text: "Clock", file: "clock"}, {text: "Pillow", file: "pillow"}, {text: "Wordrobe", file: "wordrobe"},
    {text: "Armchair", file: "armchair"}, {text: "Bed", file: "bed"}, {text: "Bookcase", file: "bookcase"}, {text: "Carpet", file: "carpet"},
    {text: "Coffee table", file: "coffee_table"}, {text: "Curtains", file: "curtains"}, {text: "Desk", file: "desk"}, {text: "Lamp", file: "lamp"}, 
    {text: "Mirror", file: "mirror"}, {text: "Sofa", file: "sofa"} ]}
];

let currentRound = 1;
let score = 0;
let currentCategoryIndex = -1; // Initialize with -1 to indicate no category selected

const startButton = document.getElementById("startButton");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const playAgainButton = document.getElementById("playAgainButton");

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);

function startGame() {
    startButton.style.display = "none";
    playAgainButton.style.display = "none";
    gameArea.style.display = "block";
    scoreDisplay.style.display = "none";
    currentRound = 1;
    score = 0;

    // Select a random category for this game
    currentCategoryIndex = Math.floor(Math.random() * categories.length);

    nextRound();
}

function nextRound() {
    if (currentRound <= 10) {
        const randomCategory = categories[currentCategoryIndex];
        const shuffledImages = shuffleArray(randomCategory.images);
        const correctAnswer = shuffledImages[Math.floor(Math.random() * shuffledImages.length)];

        const gameAreaDiv = document.getElementById("gameArea");
        gameAreaDiv.innerHTML = `<h2>Round ${currentRound}</h2><h3>Category: ${randomCategory.name}</h3><h3>Find: ${correctAnswer.text}</h3>`;

        const images = [correctAnswer];
        for (let i = 1; i < 3; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * randomCategory.images.length);
            } while (randomCategory.images[randomIndex].text === correctAnswer.text || images.some(img => img.text === randomCategory.images[randomIndex].text));
            images.push(randomCategory.images[randomIndex]);
        }

        shuffleArray(images);

        gameAreaDiv.innerHTML += `<div class="imageRow">${images.map(img => `<img src="images/${img.file}.jpeg" alt="${img.text}" data-answer="${correctAnswer.text}">`).join("")}</div>`;

        const imgElements = document.querySelectorAll("#gameArea img");
        imgElements.forEach(img => img.addEventListener("click", handleImageClick));
    } else {
        endGame();
    }
}

function handleImageClick(event) {
    const selectedAnswer = event.target.getAttribute("data-answer");
    if (selectedAnswer === event.target.alt) {
        score++;
    }
    currentRound++;
    nextRound();
}

function endGame() {
    gameArea.style.display = "none";
    scoreDisplay.style.display = "block";
    scoreDisplay.textContent = `Game Over! Your Score: ${score}`;
    playAgainButton.style.display = "block";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
