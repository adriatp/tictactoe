const { Board } = require('./board.js');

class TicTacToe {
  constructor () {
    this.size = 3;
    this.board = new Board(this.size);
  }

  run () {
    this.board.print();
  }
}

module.exports = { TicTacToe };
