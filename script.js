'use strict';

//making DOM elements
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const smallScore0El = document.getElementById('current--0');
const smallScore1El = document.getElementById('current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

//variables
let smallScore = 0;
let activePlayer = 0;

const scores = [0, 0];

//initial conditions

//1.making both main scores 0
score0Element.textContent = 0;
score1Element.textContent = 0;

//2.hiding dice
diceElement.classList.add('hidden');

//rolling the dice
const switchPlayers = function () {
  //switching players
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  //swtiching active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  smallScore = 0;

  //swtiching active player background
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};
btnNew.addEventListener('click', function () {
  //reseting everything

  //setting scores array to 0
  scores[0] = 0;
  scores[1] = 1;

  //setting all the scorefields to 0
  smallScore0El.textContent = 0;
  smallScore1El.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  //hiding the dice again
  diceElement.classList.add('hidden');

  //making 1st player as active
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

  //changing winning text back to normal
  document.getElementById(`name--0`).textContent = `Player 0`;
  document.getElementById(`name--1`).textContent = `Player 1`;
});

btnRoll.addEventListener('click', function () {
  //1.generating random dice roll
  const diceNum = Math.trunc(Math.random() * 6) + 1;

  //2.display dice
  //i.remove hidden class
  diceElement.classList.remove('hidden');

  //ii.modifying the image
  diceElement.src = `dice-${diceNum}.png`;

  //3.check for 1 => nextPlayer
  if (diceNum !== 1) {
    smallScore += diceNum;
    document.getElementById(`current--${activePlayer}`).textContent =
      smallScore;

    //if he holds the score
  } else {
    switchPlayers();
  }
});

btnHold.addEventListener('click', function () {
  //1.add current score to total score
  scores[activePlayer] += smallScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //is winning?
  if (scores[activePlayer] >= 100) {
    //player wins

    //setting the winning text
    document.getElementById(`name--${activePlayer}`).textContent = `Player ${
      activePlayer + 1
    } won!!🎉`;

    //chaging bg color
    document
      .querySelector(`player--${activePlayer}`)
      .classList.add('player--winner');
  } else {
    //swtiching player
    switchPlayers();
  }
});
