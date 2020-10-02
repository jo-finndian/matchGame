//---------THE GAME---------//
const startBtn = document.getElementById('start-game');

const flower = 'flower.svg';
const coffee = 'coffee.svg';
const book = 'book.svg';
const sun = 'sun.svg';
const back = 'card-back.svg';

var counter = 0;
var strikes = document.getElementById('strikes');
var correctGuesses = 0;
var correct;

var cardGrid = document.getElementById("card-grid");
var playAgain = document.getElementById("playagain");
var playMsg = document.getElementById('play-msg');
var gameModal = document.getElementById('game-msg');
var gameMsg = document.getElementById('msg');


var cardDeck = [flower, coffee, book, sun, flower, coffee, book, sun];

var cardGuesses = [];

var gameStatus;

// starts game
startBtn.addEventListener('click', function() {
    cardGuesses = [];

    cardGrid.classList.toggle("hidden");

    startBtn.classList.toggle('hidden');

    strikes.innerHTML = "Strikes: " + counter;

    shuffleCards();
});

function shuffleCards() {
    // This code was found on StackOverflow. Is apparently called the Knuth-Shuffle... https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = cardDeck.length, tempValue, randIndex

    while (0 !== currentIndex) {

        randIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempValue = cardDeck[currentIndex];
        cardDeck[currentIndex] = cardDeck[randIndex];
        cardDeck[randIndex] = tempValue;
    }
    dealCards(cardDeck);
    console.log("Shuffled: " + cardDeck);
    return cardDeck;
}

function dealCards(cardDeck) {
    const cardGrid = document.getElementById('card-grid')

    for (i = 0 ; i <= 7; i++) {
        const container = document.createElement('div');
        const card = document.createElement('div');
        const cardFront = document.createElement('img');
        const cardBack = document.createElement('img');
        
        container.classList.add('container');

        card.classList.add('card');
        card.id = i;

        cardFront.src = back;
        cardBack.src = cardDeck[i];

        cardFront.classList.add('front');
        cardBack.classList.add('back');

        if (cardDeck[i] === flower) {
            card.setAttribute("type", "flower");
        }
        else if (cardDeck[i] === coffee) {
            card.setAttribute("type", "coffee");
        }
        else if (cardDeck[i] === book) {
            card.setAttribute("type", "book");
        }
        else if (cardDeck[i] === sun) {
            card.setAttribute("type", "sun");
        }
        else { }
        card.appendChild(cardBack);
        card.appendChild(cardFront);
        container.appendChild(card);
        cardGrid.appendChild(container);
    }

    let cards = document.getElementsByClassName("card");

    for (var i = 0; i < cards.length; i++){
        var card = cards[i];
        card.addEventListener("click", userGuess);
    };
}

function flip(card) {
    if (card.style.transform == "rotateY(180deg)") {
        card.style.transform = "rotateY(0deg)";
    }
    else {
        card.style.transform = "rotateY(180deg)";
    }
};


function userGuess() {
    console.log("Start: " + cardGuesses)

    this.parentElement.classList.add('disable');
    
    flip(this);

    cardGuesses.push(this);

    num = cardGuesses.length;
    
    console.log(num)
    
    if (num === 2 ) {
        if(cardGuesses[0]['attributes'][2].value === cardGuesses[1]['attributes'][2].value) {
            correctGuesses++
            
            right(correctGuesses);
        }
        else {
            counter++;
            
            playControl(counter);

            wrong();
        }
    }
    else {
    }
}
//add correct guesses to a counter, at x number, trigger gameover
function right(correctGuesses) {
    if ( correctGuesses === 4 ) {
        gameStatus = true;

        setTimeout(function() {
            gameOver();
        },1500);
    }
    cardGuesses = [];
}

function wrong() {
    flip(cardGuesses[0]);
    flip(cardGuesses[1]);
    
    cardGuesses[0].parentElement.classList.remove('disable');
    cardGuesses[1].parentElement.classList.remove('disable');

    cardGuesses = [];
}

function playControl(counter) {
    var plays = 3 - counter;

    strikes.innerHTML = "Strikes: " + counter;
    
    msg = "You have " + plays + " strikes left!"
    
    if (plays === 0) {
        // correct = false;
        gameStatus = false;
        gameOver();
    }
    else {
        alert(msg)
    }
}

function gameOver() {
    counter = 0;

    playAgain.classList.toggle('hidden');
    cardGrid.classList.add('disable');
    
    if (gameStatus === true) {
        playMsg.innerHTML = "Congratulations! You won!"
    }
    else {
        playMsg.innerHTML = "Better luck next time."
    }
}


function resetGame() { 
    cardGrid.classList.remove('disable');
    removeAllCards(cardGrid);
    
    playAgain.classList.toggle('hidden');
    openedCards = [];
}

function removeAllCards(e) {
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }   

    setTimeout(function() {
        shuffleCards(cardDeck);
    }, 1000);
}