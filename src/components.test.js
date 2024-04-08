import { Ship, Gameboard } from './components';

test('ship is not sunk when not hit enough times', () => {
  const battleship = Ship(4);
  for (let i=0; i<3; i++) {
    battleship.hit()
  }
  expect(battleship.isSunk()).toBe(false);
})

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
  gameboard.receiveAttack([3,3]);
  gameboard.receiveAttack([3,4]);
  gameboard.receiveAttack([3, 5]);
  expect(gameboard.isAllSunk()).toBe(true);
});

test('gameboard accurately reports when not all ships are sunk', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(4, [3, 3], 'horizontal');
  gameboard.receiveAttack([3,3]);
  gameboard.receiveAttack([3,4]);
  gameboard.receiveAttack([3, 5]);
  expect(gameboard.isAllSunk()).toBe(false);
});