let suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
let ranks = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];

let turn_river = 0;
let deck = [];
let playerHand = [];
let dealerHand = [];
let tableCards = [];

// ====================================================================================================== ФУНКЦИЯ -- Создание и перемешивание колоды
function createDeck() {
  deck = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push({ rank, suit });
    });
  });
  deck = shuffle(deck);
}

// ====================================================================================================== ФУНКЦИЯ -- Перемешивание колоды
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ====================================================================================================== ФУНКЦИЯ -- Раздача карт
function dealCards() {
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  tableCards = [deck.pop(), deck.pop(), deck.pop()];
  updateCardsDisplay();

  updateLog(
    `Карты игрока: ${playerHand[0].rank} of ${playerHand[0].suit}, ${playerHand[1].rank} of ${playerHand[1].suit}`
  );
  updateLog(
    `Карты дилера: ${dealerHand[0].rank} of ${dealerHand[0].suit}, ${dealerHand[1].rank} of ${dealerHand[1].suit}`
  );
  updateLog(
    `Карты на столе: ${tableCards
      .map((card) => `${card.rank} of ${card.suit}`)
      .join(", ")}`
  );
}

// ====================================================================================================== ФУНКЦИЯ -- Обновление карт
function updateCardsDisplay() {
  document.getElementById(
    "pl-img-1"
  ).src = `images/${playerHand[0].rank}${playerHand[0].suit}.png`;
  document.getElementById("pl-img-1").style.width = "150px";
  document.getElementById(
    "pl-img-2"
  ).src = `images/${playerHand[1].rank}${playerHand[1].suit}.png`;
  document.getElementById("pl-img-2").style.width = "150px";

  document.getElementById("dl-img-1").src = `images/Back.png`;
  document.getElementById("dl-img-1").style.width = "150px";

  document.getElementById("dl-img-2").src = "images/Back.png";
  document.getElementById("dl-img-2").style.width = "150px";

  tableCards.forEach((card, index) => {
    document.getElementById(
      `table-img-${index + 1}`
    ).src = `images/${card.rank}${card.suit}.png`;
    document.getElementById(`table-img-${index + 1}`).style.width = "150px";
  });
}

// ====================================================================================================== ФУНКЦИЯ -- Обновление логов
function updateLog(message) {
  const logTextarea = document.getElementById("logs");
  const time = new Date().toLocaleTimeString();
  logTextarea.value += `[${time}] ${message}\n`;
  logTextarea.scrollTop = logTextarea.scrollHeight;
}

// ====================================================================================================== ФУНКЦИЯ -- Перезапуск игры
function resetGame() {
  playerHand = [];
  dealerHand = [];
  tableCards = [];
  deck = [];

  turn_river = 0;

  const dealerImgs = document.querySelectorAll("#dl-img-1, #dl-img-2");
  const playerImgs = document.querySelectorAll("#pl-img-1, #pl-img-2");
  const tableImgs = document.querySelectorAll(
    "#table-img-1, #table-img-2, #table-img-3, #table-img-4, #table-img-5"
  );

  [...dealerImgs, ...playerImgs, ...tableImgs].forEach((img) => {
    img.src = "";
    img.alt = "";
  });

  const logTextarea = document.getElementById("logs");
  logTextarea.value = "";

  const startBtn = document.getElementById("start");
  startBtn.textContent = "Начать игру";
}
// ====================================================================================================== ФУНКЦИЯ -- Обновление состояния кнопки "Начать"
function updateStartButton(text) {
  const startBtn = document.getElementById("start");
  startBtn.textContent = text;
}

// ====================================================================================================== ВЫЗОВ -- Запуск игры
document.getElementById("start").addEventListener("click", () => {
  if (turn_river === 0) {
    resetGame();
    createDeck();
    dealCards();
    updateLog("Игра началась! Карты розданы.\n");
    updateStartButton("Тёрн");
    turn_river++;
  } else if (turn_river === 1) {
    tableCards.push(deck.pop());
    updateCardsDisplay();
    updateLog(`Тёрн: ${tableCards[3].rank} of ${tableCards[3].suit}\n`);
    updateStartButton("Ривер");
    turn_river++;
  } else if (turn_river === 2) {
    tableCards.push(deck.pop());
    updateCardsDisplay();
    updateLog(`Ривер: ${tableCards[4].rank} of ${tableCards[4].suit}\n`);
    checkHands();
    updateStartButton("Начать заново");
    turn_river++;

    document.getElementById(
      "dl-img-1"
    ).src = `images/${dealerHand[0].rank}${dealerHand[0].suit}.png`;
    document.getElementById("dl-img-1").style.width = "150px";
    document.getElementById(
      "dl-img-2"
    ).src = `images/${dealerHand[1].rank}${dealerHand[1].suit}.png`;
    document.getElementById("dl-img-2").style.width = "150px";
  } else {
    turn_river = 0;
    resetGame();
    updateStartButton("Начать игру");
  }
});

// ====================================================================================================== ВЫЗОВ -- Завершение игры
document.getElementById("end").addEventListener("click", () => {
  resetGame();
  updateLog("Игра завершена!");
});




