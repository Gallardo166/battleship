import { Ship, Gameboard, Player } from './components';
import { renderGameboard, makeGameboardAttackable, placeShips, displayResults } from './dom';

const game = function() {
  const player = Player();
  const computer = Player();

  placeShips(player, computer);
};

const checkEnd = function(player, computer) {
  if (player.playerGameboard.isAllSunk()) {
    displayResults('Computer');
    return true;
  }
  if (computer.playerGameboard.isAllSunk()) {
    displayResults('Player');
    return true;
  }

  return false;
};

export default game;
export { checkEnd };