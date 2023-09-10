const { Board } = require('./board.js');
const { Player } = require('./player.js');
class TicTacToe {
  constructor () {
    this.size = 3;
    this.players = [new Player('X', 0, 'minimax'), new Player('O', 1, 'minimax')];
    this.board = new Board(this.size);
    this.turn = 0;
    this.currentPlayerPosition = 0;
  }

  run () {
    while (!this.board.finished()) {
      const currentPlayer = this.players[this.currentPlayerPosition];
      currentPlayer.move(this.board, this.players);
      this.board.print();
      console.log('\n');
      if (!this.board.finished()) {
        this.currentPlayerPosition++;
        this.turn++;
        if (this.currentPlayerPosition === this.players.length) {
          this.currentPlayerPosition = 0;
        }
      }
    }
  }
}

module.exports = { TicTacToe };
