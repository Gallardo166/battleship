import { Ship, Gameboard, Player } from './components';
import { renderGameboard, makeGameboardAttackable, placeShips, } from './dom';

const game = function() {
  const player = Player();
  const computer = Player();

  placeShips(player, computer);
};

const checkEnd = function(player, computer) {
  if (player.playerGameboard.isAllSunk()) {
    console.log('Computer wins!');
    return true;
  }
  if (computer.playerGameboard.isAllSunk()) {
    console.log('Player wins!');
    return true;
  }

  return false;
};

export default game;
export { checkEnd };