const rs = require('readline-sync');

let gameBoard;

function resetGameBoard() {
  gameBoard = [
    [{index: 'A1', occupied: false, flag : null}, {index: 'A2', occupied: false, flag : null}, {index: 'A3', occupied: false, flag : null}],
    [{index: 'B1', occupied: false, flag : null}, {index: 'B2', occupied: false, flag : null}, {index: 'B3', occupied: false, flag : null}],
    [{index: 'C1', occupied: false, flag : null}, {index: 'C2', occupied: false, flag : null}, {index: 'C3', occupied: false, flag : null}]
  ];
}

const setShipsLocation = () => {

  let firstShipIndex;
  let randOne, randTwo;

  for (let i = 0; i < gameBoard.length; i++) {
    randOne = Math.floor(Math.random() * gameBoard.length); 
    let subArr = gameBoard[i];
    for (let j= 0; j < subArr.length; j++) {
      randTwo = Math.floor(Math.random() * subArr.length);
  }
}
  firstShipIndex  = gameBoard[randOne][randTwo];
  firstShipIndex.occupied = true;
  
  let secondShipIndex;
  let randThree, randFour; 
  for (let i = 0; i < gameBoard.length; i++) {
    randThree = Math.floor(Math.random() * gameBoard.length);
    if (randThree === randOne) { 
      randThree = Math.floor(Math.random() * gameBoard.length);
    }
    let subArr = gameBoard[i];
    for (let j= 0; j < subArr.length; j++) {
      randFour = Math.floor(Math.random() * subArr.length);
    }
  }
  secondShipIndex = gameBoard[randThree][randFour];
  secondShipIndex.occupied = true;
  return gameBoard;
}

const makeGuess = () => {
  let leftShips = 2;
  let allShipsSunk = false;

  while (!allShipsSunk) {
  let guess = rs.question('Enter a location to strike. Location options: A1, A2, A3, B1, B2, B3, C1, C2, C3:\n', 
  {limit: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'], limitMessage: 'Invalid input. Please try again!'}).toUpperCase();
  for (let row = 0; row < gameBoard.length; row++) { 
    let subArr = gameBoard[row];
    for (let col = 0; col < subArr.length; col++) {
      let location = subArr[col];
      if (guess === location.index && location.occupied === false && leftShips > 0) {
        location.flag = 'white';
        location.occupied = true;
        console.log('You have missed!');
      } else if (guess === location.index && location.occupied === true && location.flag !== null && leftShips > 0) {
        console.log('You have already picked this location. Miss!');
      } else if (guess === location.index && location.occupied === true && location.flag === null && leftShips === 2) {
        location.flag = 'red';
        leftShips = 1;
        console.log('Hit. You have sunk a battleship. 1 ship remaining.');
      } else if (guess === location.index && location.occupied === true && location.flag === null && leftShips === 1) {
        location.flag = 'red';
        leftShips = 0;
        let result = rs.keyInYN('You have destroyed all battleships. Would you like to play again? Y/N: ');
        if (!result) return console.log('Goodbye!');
        return game();
      }
    }
  }
 }
}

const game = () => {
  resetGameBoard();
  setShipsLocation();
  let startGame = rs.question('Press any key to start the game: ');
  makeGuess();
}

console.log(game());