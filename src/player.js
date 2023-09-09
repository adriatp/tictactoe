const prompt = require('prompt-sync')();

class Player {
	// alg_move :: ['minimax', 'keyboard', 'random']
	constructor (piece, position, alg_move='random') {
		this.piece = piece;
		this.alg_move = alg_move;
		this.position = position;
	}

	move(board, players) {
		if (this.alg_move === 'minimax')
			this.minimax_move(board, players);
		else if (this.alg_move === 'keyboard')
			this.keyboard_move(board);
		else
			this.random_move(board);
	}

	minimax_move(board, players, original_position) {
		// Get next player
		let next_player_position = this.position + 1;
		if (next_player_position == players.length) 
			next_player_position = 0;
		let next_player = players[next_player_position];
		// Minimax
		let empty_cells = board.empty_cells();
		let max_val = -1;
		let max_cell = null;
		for (let i=0; i<empty_cells.length; i++) {
			board.matrix[empty_cells[i][0]][empty_cells[i][1]] = this.piece;
			if (board.win()) {
				board.matrix[empty_cells[i][0]][empty_cells[i][1]] = null;
				return this.position == original_position ? 1 : -1;
			} 
			else if (board.full()) {
				board.matrix[empty_cells[i][0]][empty_cells[i][1]] = null;
				return 0;
			}
			else {
				return this.minimax_move(board, players, original_position);
			}
		}
		// Mirar les celes que falta un
		// Mirar les celes que en falten dos
		// Mirar les celes que en faltes 3
	}

	keyboard_move(board) {
		let empty_cells = board.empty_cells();
		console.log("Choose a movement:");
		do {
			for (let i=0; i<empty_cells.length; i++) {
				console.log((i) + ". " + empty_cells[i]);
			}
			const option_str = prompt('> ');
			if (option_str === null) 
				process.exit();
			const option = parseInt(option_str);
			if (option >= 0 && option < empty_cells.length)
				board.matrix[empty_cells[option][0]][empty_cells[option][1]] = this.piece;
			else {
				board.print();
				console.log('Invalid option, choose a correct movement:')
			}
		} while (empty_cells.length === board.empty_cells().length);
	}

	random_move(board) {
		let empty_cells = board.empty_cells();
		let random_empty_cell_pos = Math.floor(Math.random() * empty_cells.length);
		let random_empty_cell = empty_cells[random_empty_cell_pos];
		board.matrix[random_empty_cell[0]][random_empty_cell[1]] = this.piece;		
	}
}

module.exports = { Player };