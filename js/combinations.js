// ====================================================================================================== ФУНКЦИЯ -- Проверка комбинаций
function checkHands() {
  const playerBestHand = getBestCombination([...playerHand, ...tableCards]);
  const dealerBestHand = getBestCombination([...dealerHand, ...tableCards]);

  updateLog(`Лучшая комбинация дилера: ${dealerBestHand}`);
  updateLog(`Лучшая комбинация игрока: ${playerBestHand}\n`);

  const winner = compareHands(playerBestHand, dealerBestHand);
  if (winner === "tie") {
    const tie = resolveTie(playerHand, dealerHand);
    if (tie === "player") {
      updateLog("Игрок выигрывает по старшинству карт");
    } else if (tie === "dealer") {
      updateLog("Дилер выигрывает по старшинству карт");
    } else {
      updateLog("Игра заканчивается полной ничьей");
    }
  } else if (winner === "player") {
    updateLog("Игрок выигрывает!");
  } else {
    updateLog("Дилер выигрывает!");
  }
}

// ====================================================================================================== ФУНКЦИЯ -- Проверка ничьи
function resolveTie(playerCards, dealerCards) {
  const allPlayerCards = [...playerCards, ...tableCards];
  const allDealerCards = [...dealerCards, ...tableCards];

  const sortedPlayerCards = sortByRank(allPlayerCards);
  const sortedDealerCards = sortByRank(allDealerCards);

  for (let i = 0; i < sortedPlayerCards.length; i++) {
    const playerRank = ranks.indexOf(sortedPlayerCards[i].rank);
    const dealerRank = ranks.indexOf(sortedDealerCards[i].rank);

    if (playerRank > dealerRank) return "player";
    if (dealerRank > playerRank) return "dealer";
  }

  return "tie";
}

// ====================================================================================================== ФУНКЦИЯ -- Поиск лучшей комбинации
function getBestCombination(cards) {
  const sortedCards = sortByRank(cards);

  if (RoyalFlush(sortedCards)) return "Роял-флэш";
  if (StraightFlush(sortedCards)) return "Стрит-флэш";
  if (Care(sortedCards)) return "Каре";
  if (FullHouse(sortedCards)) return "Фулл-хаус";
  if (Flush(sortedCards)) return "Флэш";
  if (Straight(sortedCards)) return "Стрит";
  if (SetCard(sortedCards)) return "Сет";
  if (TwoPair(sortedCards)) return "Две пары";
  if (Pair(sortedCards)) return "Одна пара";

  return "Старшая карта";
}

// ====================================================================================================== ФУНКЦИЯ --
function sortByRank(cards) {
  const rankOrder = {
    Ace: 0,
    King: 1,
    Queen: 2,
    Jack: 3,
    10: 4,
    9: 5,
    8: 6,
    7: 7,
    6: 8,
    5: 9,
    4: 10,
    3: 11,
    2: 12,
  };
  return [...cards].sort((a, b) => rankOrder[a.rank] - rankOrder[b.rank]);
}

// ====================================================================================================== ФУНКЦИЯ -- Роял-Флеш
function RoyalFlush(cards) {
  return StraightFlush(cards) && cards[0].rank === "Ace";
}

// ====================================================================================================== ФУНКЦИЯ -- Стрит-Флеш
function StraightFlush(cards) {
  return Flush(cards) && Straight(cards);
}

// ====================================================================================================== ФУНКЦИЯ -- Каре
function Care(cards) {
  return HighCard(cards, 4);
}

// ====================================================================================================== ФУНКЦИЯ -- Фулл-Хаус
function FullHouse(cards) {
  return getRankCounts(cards).includes(3) && getRankCounts(cards).includes(2);
}

// ====================================================================================================== ФУНКЦИЯ -- Флеш
function Flush(cards) {
  const suits = {};

  for (let card of cards) {
    if (!suits[card.suit]) {
      suits[card.suit] = 1;
    } else {
      suits[card.suit]++;
    }
  }

  for (let suit in suits) {
    if (suits[suit] >= 5) {
      return true;
    }
  }

  return false;
}

// ====================================================================================================== ФУНКЦИЯ -- Стрит
function Straight(cards) {
  const ranks = cards.map((card) => card.rank);
  const rankOrder = [
    "Ace",
    "King",
    "Queen",
    "Jack",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  for (let i = 0; i <= rankOrder.length - 5; i++) {
    let isStraight = true;
    for (let j = 0; j < 5; j++) {
      if (!ranks.includes(rankOrder[i + j])) {
        isStraight = false;
        break;
      }
    }
    if (isStraight) {
      return true;
    }
  }
  return false;
}

// ====================================================================================================== ФУНКЦИЯ -- Сет(Тройка)
function SetCard(cards) {
  return HighCard(cards, 3);
}

// ====================================================================================================== ФУНКЦИЯ -- Две пары
function TwoPair(cards) {
  const counts = getRankCounts(cards);
  return counts.filter((count) => count === 2).length >= 2;
}

// ====================================================================================================== ФУНКЦИЯ -- Одна пара
function Pair(cards) {
  return HighCard(cards, 2);
}

// ====================================================================================================== ФУНКЦИЯ -- Старшая карта
function HighCard(cards, n) {
  const counts = getRankCounts(cards);
  return counts.includes(n);
}

// ====================================================================================================== ФУНКЦИЯ -- Счетчик достоинств карт
function getRankCounts(cards) {
  const rankCounts = {};
  cards.forEach((card) => {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
  });
  return Object.values(rankCounts);
}

// ====================================================================================================== ФУНКЦИЯ -- Сравнение комбинаций
function compareHands(playerHand, dealerHand) {
  const handRanks = [
    "Роял-флэш",
    "Стрит-флэш",
    "Каре",
    "Фулл-хаус",
    "Флэш",
    "Стрит",
    "Сет",
    "Две пары",
    "Одна пара",
    "Старшая карта",
  ];

  const playerRank = handRanks.indexOf(playerHand);
  const dealerRank = handRanks.indexOf(dealerHand);

  if (playerRank < dealerRank) return "player";
  if (dealerRank < playerRank) return "dealer";

  return "tie";
}
