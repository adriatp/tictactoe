const prompt = require('prompt-sync')();

class Player {
  // algMove :: ['minimax', 'keyboard', 'random']
  constructor (piece, position, algMove = 'random') {
    this.piece = piece;
    this.algMove = algMove;
    this.position = position;
  }

  move (board, players) {
    if (this.algMove === 'minimax') {
      const valMove = this.minimax_move(board, players, this.position);
      console.log(valMove[0]);
      board.matrix[valMove[1][0]][valMove[1][1]] = this.piece;
    } else if (this.algMove === 'keyboard') {
      const valMove = this.keyboard_move(board);
      board.matrix[valMove[1][0]][valMove[1][1]] = this.piece;
    } else {
      const valMove = this.random_move(board);
      board.matrix[valMove[1][0]][valMove[1][1]] = this.piece;
    }
  }

  minimax_move (board, players, originalPosition) {
    const nextPlayer = this.next_player(players);
    const emptyCells = board.empty_cells();
    let maxVal = null;
    let maxCell = null;
    let val = null;
    for (let i = 0; i < emptyCells.length; i++) {
      board.matrix[emptyCells[i][0]][emptyCells[i][1]] = this.piece;
      if (board.win()) {
        maxVal = this.position === originalPosition ? 1 : -1;
        maxCell = emptyCells[i];
      } else if (board.full()) {
        maxVal = 0;
        maxCell = emptyCells[i];
      } else {
        val = nextPlayer.minimax_move(board, players, this.position);
        maxVal = val[0];
        maxCell = emptyCells[i];
      }
      board.matrix[emptyCells[i][0]][emptyCells[i][1]] = null;
      if (maxVal[0] === 1 || maxVal[0] === -1) break;
    }
    return [maxVal, maxCell];
  }

  keyboard_move (board) {
    const emptyCells = board.empty_cells();
    let selectedOption = null;
    console.log('Choose a movement:');
    do {
      for (let i = 0; i < emptyCells.length; i++) {
        console.log((i) + '. ' + emptyCells[i]);
      }
      const optionStr = prompt('> ');
      if (optionStr === null) {
        process.exit();
      }
      const option = parseInt(optionStr);
      if (option >= 0 && option < emptyCells.length) {
        selectedOption = emptyCells[option];
      } else {
        board.print();
        console.log('Invalid option, choose a correct movement:');
      }
    } while (selectedOption === null);
    return [0, selectedOption];
  }

  random_move (board) {
    const emptyCells = board.empty_cells();
    const randomEmptyCellPos = Math.floor(Math.random() * emptyCells.length);
    const randomEmptyCell = emptyCells[randomEmptyCellPos];
    return [0, randomEmptyCell];
  }

  next_player (players) {
    let nextPlayerPosition = this.position + 1;
    if (nextPlayerPosition === players.length) {
      nextPlayerPosition = 0;
    }
    return players[nextPlayerPosition];
  }
}

module.exports = { Player };
