import { Ship, Gameboard, Player } from './components';
import { renderGameboard, makeGameboardAttackable } from './dom';

const game = function() {
  const player = Player();
  const computer = Player();

  player.playerGameboard.placeShip(3, [2, 4], 'horizontal');
  computer.playerGameboard.placeShip(2, [3, 1], 'horizontal');
  computer.playerGameboard.placeShip(5, [0, 0], 'vertical');

  renderGameboard('player-1', player.playerGameboard.getCoordinates());
  renderGameboard('player-2', computer.playerGameboard.getCoordinates());

  makeGameboardAttackable(player, computer);
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