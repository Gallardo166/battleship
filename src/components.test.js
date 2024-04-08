import { Ship } from './components';

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

