const { Board } = require('./board.js');
const { Player } = require('./player.js');
class TicTacToe {
  constructor () {
    this.size = 3;
    this.players = [ new Player('X', 'asdf'), new Player('O') ]
    this.board = new Board(this.size);
    this.turn = 0;
    this.current_player_position = 0;
  }

  run () {
    while(!this.board.finished()) {
      let current_player = this.players[this.current_player_position];
      current_player.move(this.board);
      this.board.print();
      console.log('\n');
      if (!this.board.finished()) {
        this.current_player_position++;
        this.turn++;
        if (this.current_player_position === this.players.length)
          this.current_player_position = 0;
      }
    }
  }
}

module.exports = { TicTacToe };
