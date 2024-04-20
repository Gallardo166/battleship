import { Ship, Gameboard, Player } from './components';

test('ship is not sunk when not hit enough times', () => {
  const battleship = Ship(4);
  for (let i=0; i<3; i++) {
    battleship.hit()
  }
  expect(battleship.isSunk()).toBe(false);
});

test('ship is sunk when hit enough times', () => {
  const carrier = Ship(5);
  for (let i=0; i<5; i++) {
    carrier.hit();
  }
  expect(carrier.isSunk()).toBe(true);
});

test('gameboard accurately reports when all ships are sunk', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(3, [3, 3], 'horizontal');
  gameboard.receiveAttack([3, 3]);
  gameboard.receiveAttack([3, 4]);
  gameboard.receiveAttack([3, 5]);
  expect(gameboard.isAllSunk()).toBe(true);
});

test('gameboard accurately reports when not all ships are sunk', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(4, [3, 3], 'horizontal');
  gameboard.receiveAttack([3, 3]);
  gameboard.receiveAttack([3, 4]);
  gameboard.receiveAttack([3, 5]);
  expect(gameboard.isAllSunk()).toBe(false);
});

test('gameboard does not place clashing ships', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(3, [2, 2], 'vertical');
  gameboard.placeShip(3, [4, 1], 'horizontal');
  gameboard.receiveAttack([2, 2]);
  gameboard.receiveAttack([3, 2]);
  gameboard.receiveAttack([4, 2]);
  expect(gameboard.isAllSunk()).toBe(true);
});

test('dont place ships outside the gameboard', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(4, [7, 3], 'vertical');
  expect(gameboard.isAllSunk()).toBe(true);
});

test('a player can attack another player', () => {
  const playerOne = Player();
  const playerTwo = Player();

  playerOne.playerGameboard.placeShip(3, [2, 2], 'vertical');
  playerTwo.attack(playerOne, [2, 2]);
  playerTwo.attack(playerOne, [3, 2]);
  playerTwo.attack(playerOne, [4, 2]);
  expect(playerTwo.playerGameboard.isAllSunk()).toBe(true);
});