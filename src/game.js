import { Player, Computer } from './components';
import { renderGameboard, print, toggleOrientationButton, restartGameboards } from './dom';
import { arrayIncludesArray } from './array-search';

const game = async function() {
  const player = Player('player-1');
  const computer = Computer();
  const playerGrids = document.querySelectorAll(`[data-player='${player.playerName}']`);
  const computerGrids = document.querySelectorAll(`[data-player='${computer.playerName}']`);
  const restartButton = document.querySelector('#restart');
  const ships = [{length: 5, name: 'Carrier'}, {length: 4, name: 'Battleship'}, {length: 3, name: 'Destroyer'}, {length: 3, name: 'Submarine'}, {length: 2, name: 'Patrol Boat'}];
  let i = 0;

  await print('Place your Carrier.');
  toggleOrientationButton();

  const placeShip = async function(event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const successfulPlacement = player.playerGameboard.placeShip(ships[i].length, [row, column], orientation);
    if (!successfulPlacement) return;
    renderGameboard(player, false);
    i += 1;

    if (i<5) {
      await print(`Place your ${ships[i].name}.`, 0);
      return;
    }

    Array.from(playerGrids).forEach((grid) => grid.removeEventListener('click', placeShip));
    await print('Computer placing ships...', 600);
    computer.randomPlaceShips();
    renderGameboard(computer, true);
    await print('Your turn to attack.', 0);

    Array.from(computerGrids).forEach((grid) => grid.addEventListener('click', attack));
  };

  const attack = async function(event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    if (arrayIncludesArray(computer.playerGameboard.receivedAttacks, [row, column])) { 
      await print('You already attacked this spot. Your turn to attack.', 0);
      return;
    }
    player.attack(computer, [row, column]);
    renderGameboard(computer, true);
    checkPlayerHit: 
      for (let i=0; i<computer.playerGameboard.shipCoordinates.length; i++) {
        if (arrayIncludesArray(computer.playerGameboard.shipCoordinates[i].coordinates, [row, column])) {
          if (computer.playerGameboard.shipCoordinates[i].ship.isSunk()) {
            await print('You sunk a ship!', 400);
            break checkPlayerHit;
          }
          await print('You hit a ship!', 400);
          break checkPlayerHit;
        }
        if (i === computer.playerGameboard.shipCoordinates.length - 1) {
          await print('You missed.', 400);
        }
      }
    
    if (await checkEnd(player, computer)) {
       Array.from(computerGrids).forEach((grid) => grid.removeEventListener('click', attack));
       restartButton.classList.remove('hidden');

      restartButton.addEventListener('click', () => {
        restartGameboards();
        game();
        restartButton.classList.add('hidden');
      })
      return;
    }

    Array.from(computerGrids).forEach((grid) => grid.removeEventListener('click', attack));
    await print('Enemy is attacking...', 300);
    const [computerRow, computerColumn] = computer.randomAttack(player);
    renderGameboard(player, false);
    checkComputerHit: 
      for (let i=0; i<player.playerGameboard.shipCoordinates.length; i++) {
        if (arrayIncludesArray(player.playerGameboard.shipCoordinates[i].coordinates, [computerRow, computerColumn])) {
          if (player.playerGameboard.shipCoordinates[i].ship.isSunk()) {
            await print('Enemy sunk a ship!', 400);
            break checkComputerHit;
          }
          await print('Enemy hit a ship!', 400);
          break checkComputerHit;
        }
        if (i === player.playerGameboard.shipCoordinates.length - 1) {
          await print('Enemy missed.', 400);
        }
      }

    await print('Your turn to attack.', 0)
    Array.from(computerGrids).forEach((grid) => grid.addEventListener('click', attack));

    if (await checkEnd(player, computer)) {
      Array.from(computerGrids).forEach((grid) => grid.removeEventListener('click', attack));
      restartButton.classList.remove('hidden');

      restartButton.addEventListener('click', () => {
        restartGameboards();
        game();
        restartButton.classList.add('hidden');
      })
      return;
    }

    event.stopPropagation();
  };

  Array.from(playerGrids).forEach((grid) => grid.addEventListener('click', placeShip));
};

const checkEnd = async function(player, computer) {
  if (player.playerGameboard.isAllSunk()) {
    await print('Computer wins.', 0);
    return true;
  }
  if (computer.playerGameboard.isAllSunk()) {
    await print('Player wins.', 0);
    return true;
  }

  return false;
};

export default game;