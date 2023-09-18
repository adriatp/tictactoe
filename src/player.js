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
      const valMove = this.minimax_move(board, players);
      board.matrix[valMove[0]][valMove[1]] = this.piece;
    } else if (this.algMove === 'keyboard') {
      const valMove = this.keyboard_move(board);
      board.matrix[valMove[0]][valMove[1]] = this.piece;
    } else {
      const valMove = this.random_move(board);
      board.matrix[valMove[0]][valMove[1]] = this.piece;
    }
  }

  minimax_move (board, players) {
    const emptyCells = board.empty_cells();
    const minimaxValues = [];
    for (let i = 0; i < emptyCells.length; i++) {
      board.matrix[emptyCells[i][0]][emptyCells[i][1]] = this.piece;
      const minimaxVal = this.minimax_move(board, players, this.position);
      minimaxValues.push(minimaxVal);
      board.matrix[emptyCells[i][0]][emptyCells[i][1]] = null;
    }
    const maxMinimaxIdx = minimaxValues.indexOf(Math.max(...minimaxValues));

    return emptyCells[maxMinimaxIdx];
  }

  minimax_move_rec (board, players, originalPosition) {
    const emptyCells = board.empty_cells();
    const nextPlayer = this.next_player(players);
    const winningMoves = board.winning_moves(this.piece);
    if (winningMoves.length > 0) {
      return this.position === originalPosition ? 1 : -1;
    } else if (emptyCells.length === 1) {
      return emptyCells[0];
    } else {
      let i = 0;
      const minimaxValues = [];
      while (i < emptyCells.length) {
        board.matrix[emptyCells[i][0]][emptyCells[i][1]] = this.piece;
        const minimaxVal = nextPlayer.minimax_move(board, players, originalPosition);
        if (this.minmaxVal !== 0) return minimaxVal;
        minimaxValues.push(minimaxVal);
        board.matrix[emptyCells[i][0]][emptyCells[i][1]] = null;
        i++;
      }
      return 0;
    }
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
    return selectedOption;
  }

  random_move (board) {
    const emptyCells = board.empty_cells();
    const randomEmptyCellPos = Math.floor(Math.random() * emptyCells.length);
    const randomEmptyCell = emptyCells[randomEmptyCellPos];
    return randomEmptyCell;
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
