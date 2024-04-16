import { Player, Computer } from './components';
import { renderGameboard, print, toggleOrientationButton, restartGameboards } from './dom';
import { arrayIncludesArray } from './array-search';

const game = function() {
  const player = Player('player-1');
  const computer = Computer();
  const playerGrids = document.querySelectorAll(`[data-player='${player.playerName}']`);
  const computerGrids = document.querySelectorAll(`[data-player='${computer.playerName}']`);
  const restartButton = document.querySelector('#restart');
  const ships = [{length: 5, name: 'Carrier'}, {length: 4, name: 'Battleship'}, {length: 3, name: 'Destroyer'}, {length: 3, name: 'Submarine'}, {length: 2, name: 'Patrol Boat'}];
  let i = 0;

  print('Place your Carrier.');
  toggleOrientationButton();

  async function placeShip(event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const successfulPlacement = player.playerGameboard.placeShip(ships[i].length, [row, column], orientation);
    if (!successfulPlacement) return;
    renderGameboard(player, false);
    i += 1;

    if (i<5) {
      print(`Place your ${ships[i].name}.`);
      return;
    }

    print('Computer placing ships...');
    Array.from(playerGrids).forEach((grid) => grid.removeEventListener('click', placeShip));
    await new Promise(resolve => setTimeout(resolve, 1000));
    computer.randomPlaceShips();
    renderGameboard(computer, true);
    print('Your turn to attack.');

    async function attack(event) {
      const row = Number(event.target.getAttribute('data-row'));
      const column = Number(event.target.getAttribute('data-column'));
      if (arrayIncludesArray(computer.playerGameboard.receivedAttacks, [row, column])) { 
        print('You attacked this spot. Your turn to attack.');
        return;
      }
      player.attack(computer, [row, column]);
      renderGameboard(computer, true);
      Array.from(computerGrids).forEach((grid) => grid.removeEventListener('click', attack));
      print('Computer is attacking...')
      await new Promise(resolve => setTimeout(resolve, 600));
      computer.randomAttack(player);
      renderGameboard(player, false);

      print('Your turn to attack.')
      Array.from(computerGrids).forEach((grid) => grid.addEventListener('click', attack));

      if (checkEnd(player, computer)) {
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

    Array.from(computerGrids).forEach((grid) => grid.addEventListener('click', attack));
  }

  Array.from(playerGrids).forEach((grid) => grid.addEventListener('click', placeShip));
};

const checkEnd = function(player, computer) {
  if (player.playerGameboard.isAllSunk()) {
    print('Computer wins.');
    return true;
  }
  if (computer.playerGameboard.isAllSunk()) {
    print('Player wins.');
    return true;
  }

  return false;
};

export default game;
export { checkEnd };