import { Player, Computer } from './components';
import { hideOptions, showOptions, hideGame, showGame, showDifficulties, hideDifficulties, showNames, loadPassingScreen, renderGameboard, showPlaceShip, showAttack, print, restartGameboards } from './dom';
import { arrayIncludesArray } from './array-search';

const homeScreen = function() {
  const singlePlayer = document.querySelector('#single-player');
  const multiplayer = document.querySelector('#multiplayer');
  const easy = document.querySelector('#easy');
  const medium = document.querySelector('#medium');
  const hard = document.querySelector('#hard');
  const impossible = document.querySelector('#impossible');

  singlePlayer.addEventListener('click', () => {
    hideOptions();
    showDifficulties();
    showNames('Player', 'Computer');
  });

  multiplayer.addEventListener('click', () => {
    hideOptions();
    showGame();
    multiplayerGame();
    showNames('Player 1', 'Player 2');
  });

  easy.addEventListener('click', () => {
    const computer = Computer();
    hideDifficulties();
    showGame();
    singlePlayerGame(computer, computer.randomAttack);
  });

  medium.addEventListener('click', () => {
    const computer = Computer();
    hideDifficulties();
    showGame();
    singlePlayerGame(computer, computer.adjacentAttack);
  });

  hard.addEventListener('click', () => {
    const computer = Computer();
    hideDifficulties();
    showGame();
    singlePlayerGame(computer, computer.diagonalAttack);
  });

  impossible.addEventListener('click', () => {
    const computer = Computer();
    hideDifficulties();
    showGame();
    singlePlayerGame(computer, computer.unfairAttack);
  })
};

const singlePlayerGame = async function(computer, attackFunction) {
  const player = Player('Player 1');
  const playerGrids = document.querySelectorAll('[data-player="Player 1"][class*="grid"]');
  const computerGrids = document.querySelectorAll('[data-player="Player 2"][class*="grid"]');
  const homeButton = document.querySelector('#home');
  const ships = [{length: 5, name: 'Carrier'}, {length: 4, name: 'Battleship'}, {length: 3, name: 'Destroyer'}, {length: 3, name: 'Submarine'}, {length: 2, name: 'Patrol Boat'}];
  let i = 0;

  const checkEnd = async function() {
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
      showPlaceShip(player, ships[i].length);
      return;
    }

    Array.from(playerGrids).forEach((grid) => grid.removeEventListener('click', placeShip));
    await print('Computer placing ships...', 600);
    computer.randomPlaceShips();
    renderGameboard(computer, true);
    await print('Your turn to attack.', 0);
    showAttack(computer);

    Array.from(computerGrids).forEach((grid) => grid.addEventListener('click', attack));

    event.stopPropagation();
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
    
    if (await checkEnd()) {
      Array.from(computerGrids).forEach((grid) => grid.removeEventListener('click', attack));
      homeButton.classList.remove('hidden');

      homeButton.addEventListener('click', () => {
        restartGameboards();
        hideGame();
        showOptions();
        homeButton.classList.add('hidden');
      })
      return;
    }

    Array.from(computerGrids).forEach((grid) => grid.removeEventListener('click', attack));
    await print('Enemy is attacking...', 300);
    const [computerRow, computerColumn] = attackFunction(player);
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

    if (await checkEnd()) {
      Array.from(computerGrids).forEach((grid) => grid.removeEventListener('click', attack));
      homeButton.classList.remove('hidden');

      homeButton.addEventListener('click', () => {
        restartGameboards();
        hideGame();
        showOptions();
        homeButton.classList.add('hidden');
      })
      return;
    }

    await print('Your turn to attack.', 0)
    showAttack(computer);
    Array.from(computerGrids).forEach((grid) => grid.addEventListener('click', attack));

    event.stopPropagation();
  };

  await print('Place your Carrier.');
  showPlaceShip(player, 5);
  Array.from(playerGrids).forEach((grid) => grid.addEventListener('click', placeShip));
};

const multiplayerGame = async function() {
  const playerOne = Player('Player 1');
  const playerTwo = Player('Player 2');
  const playerOneGrids = document.querySelectorAll(`[data-player='Player 1'][class*="grid"]`);
  const playerTwoGrids = document.querySelectorAll(`[data-player='Player 2'][class*="grid"]`);
  const homeButton = document.querySelector('#home');
  const ships = [{length: 5, name: 'Carrier'}, {length: 4, name: 'Battleship'}, {length: 3, name: 'Destroyer'}, {length: 3, name: 'Submarine'}, {length: 2, name: 'Patrol Boat'}];
  let i = 0;
  let currentPlayer = playerOne;
  let targetPlayer;

  const checkEnd = async function() {
    if (playerOne.playerGameboard.isAllSunk()) {
      await print('Player 2 wins.', 0);
      return true;
    }
    if (playerTwo.playerGameboard.isAllSunk()) {
      await print('Player 1 wins.', 0);
      return true;
    }

    return false;
  };

  const placeShip = async function(event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const successfulPlacement = currentPlayer.playerGameboard.placeShip(ships[i].length, [row, column], orientation);
    if (!successfulPlacement) return;
    renderGameboard(currentPlayer, false);
    i += 1;

    if (i<5) {
      await print(`Place your ${ships[i].name}.`, 0);
      showPlaceShip(currentPlayer, ships[i].length);
      return;
    }

    i = 0;

    if (currentPlayer.playerName === 'Player 1') {
      Array.from(playerOneGrids).forEach((grid) => grid.removeEventListener('click', placeShip));
      await new Promise((resolve) => setTimeout(resolve, 700));
      Array.from(playerOneGrids).forEach((grid) => grid.addEventListener('click', placeShip));
      loadPassingScreen(async () => {
        Array.from(playerOneGrids).forEach((grid) => grid.removeEventListener('click', placeShip));
        Array.from(playerTwoGrids).forEach((grid) => grid.addEventListener('click', placeShip));
        renderGameboard(playerOne, true);
        currentPlayer = playerTwo
        await print('Player 2, place your Carrier.');
        showPlaceShip(playerTwo, 5);
      });
    } else {
      Array.from(playerTwoGrids).forEach((grid) => grid.removeEventListener('click', placeShip));
      await new Promise((resolve) => setTimeout(resolve, 700));
      Array.from(playerTwoGrids).forEach((grid) => grid.addEventListener('click', placeShip));
      loadPassingScreen(async () => {
        Array.from(playerTwoGrids).forEach((grid) => grid.removeEventListener('click', placeShip));
        Array.from(playerTwoGrids).forEach((grid) => grid.addEventListener('click', attack));
        renderGameboard(playerTwo, true);
        renderGameboard(playerOne, false);
        currentPlayer = playerOne;
        targetPlayer = playerTwo;
        await print("Player 1's turn to attack.");
        showAttack(targetPlayer);
      });
    }
  };

  const attack = async function(event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const currentPlayerGrids = document.querySelectorAll(`[data-player='${currentPlayer.playerName}'][class*='grid']`);
    const targetPlayerGrids = document.querySelectorAll(`[data-player='${targetPlayer.playerName}'][class*='grid']`);
    if (arrayIncludesArray(targetPlayer.playerGameboard.receivedAttacks, [row, column])) { 
      await print(`You already attacked this spot. ${currentPlayer.playerName}'s turn to attack.`, 0);
      return;
    }
    currentPlayer.attack(targetPlayer, [row, column]);
    renderGameboard(targetPlayer, true);
    checkPlayerHit: 
      for (let i=0; i<targetPlayer.playerGameboard.shipCoordinates.length; i++) {
        if (arrayIncludesArray(targetPlayer.playerGameboard.shipCoordinates[i].coordinates, [row, column])) {
          if (targetPlayer.playerGameboard.shipCoordinates[i].ship.isSunk()) {
            await print(`${currentPlayer.playerName} sunk a ship!`, 400);
            break checkPlayerHit;
          }
          await print(`${currentPlayer.playerName} hit a ship!`, 400);
          break checkPlayerHit;
        }
        if (i === targetPlayer.playerGameboard.shipCoordinates.length - 1) {
          await print(`${currentPlayer.playerName} missed.`, 400);
        }
      }
    
    if (await checkEnd()) {
      Array.from(targetPlayerGrids).forEach((grid) => grid.removeEventListener('click', attack));
      homeButton.classList.remove('hidden');
        homeButton.addEventListener('click', () => {
          restartGameboards();
          hideGame();
          showOptions();
          homeButton.classList.add('hidden');
        })
      return;
    }
    Array.from(targetPlayerGrids).forEach((grid) => grid.removeEventListener('click', attack));
    await new Promise((resolve) => setTimeout(resolve, 700));
    Array.from(targetPlayerGrids).forEach((grid) => grid.addEventListener('click', attack));
    loadPassingScreen(async () => {
      Array.from(targetPlayerGrids).forEach((grid) => grid.removeEventListener('click', attack));
      Array.from(currentPlayerGrids).forEach((grid) => grid.addEventListener('click', attack));
      renderGameboard(targetPlayer, false);
      renderGameboard(currentPlayer, true);
      const [a, b] = [targetPlayer, currentPlayer];
      targetPlayer = b;
      currentPlayer = a;
  
      await print(`${currentPlayer.playerName}'s turn to attack.`);
      showAttack(targetPlayer);
    });

    event.stopPropagation();
  };

  await print('Player 1, place your Carrier.');
  showPlaceShip(playerOne, 5);
  Array.from(playerOneGrids).forEach((grid) => grid.addEventListener('click', placeShip));
}

export default homeScreen;