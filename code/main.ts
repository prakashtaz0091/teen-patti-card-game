import kaboom from "kaboom";
import "kaboom/global"

// initialize context
kaboom()

// load assets
loadSprite("cardBack", "sprites/back.png")
loadSprite("cardFront", "sprites/card.png")
loadSprite("showButton", "sprites/button.png")
loadSprite("background", "sprites/woodenBoard.png")






let viewHeight = height()
let viewWidth = width()
// add a character to screen

const background = add([
  sprite("background"),
  pos(0, 0),
  scale(1.4)
])
// const cardBack = add([
//   // list of components
//   sprite("cardBack"),
//   pos(10, viewHeight - 150),
//   area(),
//   scale(0.3),
// ])

// // add a kaboom on mouse click
onKeyPress("space", () => {
  distribute()
})


let numberOfPlayers = 2
let totalCards = 52
let numberOfCardsPerPlayer = 3
class Player {
  static count: number = 0;
  id: number;
  posX: number;
  posY: number;
  cardCount: number;
  cards: Array<string>;
  name: string;

  constructor(name, posX, posY) {

    this.id = ++Player.count;
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.cardCount = 0;
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card)
    this.cardCount++
  }


}


const player1 = new Player("Prakash", viewWidth / 2 - 100, 10)
const player2 = new Player("Uttam", viewWidth / 2 - 100, viewHeight - 150)

add([
  text(`Player 1: ${player1.name}`),
  pos(viewWidth - 250, 20),
  scale(0.5)
  // { value: 0 },
])

add([
  text(`Player 2: ${player2.name}`),
  pos(viewWidth - 250, viewHeight - 20),
  scale(0.5)
  // { value: 0 },
])

const player1ShowButton = add([
  sprite("showButton"),
  pos(player1.posX - 100, player1.posY),
  scale(3),
  area(),
  "player1ShowButton"
])
const player2ShowButton = add([
  sprite("showButton"),
  pos(player2.posX - 100, viewHeight - 50),
  scale(3),
  area(),
  "player2ShowButton"
])

async function distribute() {
  for (let i = 0; i < numberOfCardsPerPlayer; i++) {

    giveCard(player1)

    giveCard(player2)

    await wait(0.3)

  }
  await wait(0.3)

}

function giveCard(player) {
  let randomCard: string | null = drawCard(deck);

  loadSprite(randomCard, "sprites/cards/" + randomCard + ".png")
  player.addCard(randomCard)

  add([
    sprite("cardBack"),
    pos(player.posX + player.cardCount * 40, player.posY),
    area(),
    scale(0.3),
    `cardBack${player.id}`
  ])


}

async function showCards(player) {
  let playerId = player.id
  destroyAll(`cardBack${playerId}`)
  for (let i = 0; i < player.cardCount; i++) {
    add([
      sprite(player.cards[i]),
      pos(player.posX + i * 40, player.posY),
      area(),
      scale(0.3),

    ])

    await wait(1)
  }

}



// Define suits and ranks
const suits: string[] = ['h', 'd', 't', 's']; // Hearts, Diamonds, Clubs (represented by 't'), Spades
const ranks: string[] = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k']; // Ace, 2-10, Jack, Queen, King

// Create a deck of cards
const deck: string[] = [];
for (let suit of suits) {
  for (let rank of ranks) {
    const card: string = `${rank}${suit}`;
    deck.push(card);
  }
}

// Function to draw a random card from the deck
function drawCard(deck: string[]): string | null {
  if (deck.length === 0) {
    console.log("The deck is empty.");
    return null;
  } else {
    const randomIndex: number = Math.floor(Math.random() * deck.length);
    return deck.splice(randomIndex, 1)[0];
  }
}



onClick("player1ShowButton", () => showCards(player1))
onClick("player2ShowButton", () => showCards(player2))



