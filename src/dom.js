import { checkEnd } from "./game";

const renderGameboard = function(player, coordinates) {
  for (let i=0; i<coordinates.length; i++) {
    const grid = document.querySelector(`[data-player='${player}'][data-row='${coordinates[i][0]}'][data-column='${coordinates[i][1]}']`);
    grid.classList.add('occupied');
  }
}

const makeGameboardAttackable = function(player, computer) {
  const computerGameboard = document.querySelector('#player-2');
  const attackEvent = function(event) {
    if (event.target.classList.contains('attacked')) {
      return;
    }
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    player.attack(computer.playerGameboard, [row, column]);
    event.target.classList.add('attacked');

    const [computerRow, computerColumn] = computer.randomAttack(player.playerGameboard);
    const playerGrid = document.querySelector(`[data-player='player-1'][data-row='${computerRow}'][data-column='${computerColumn}']`);
    playerGrid.classList.add('attacked');

    if (checkEnd(player, computer) !== false) {
      computerGameboard.removeEventListener('click', attackEvent);
      return;
    }
  }

  computerGameboard.addEventListener('click', attackEvent);

};

export { renderGameboard, makeGameboardAttackable };