const prompt = require('prompt-sync')();

class Player {
	// alg_move :: ['minimax', 'keyboard', 'random']
	constructor (piece, position, alg_move='random') {
		this.piece = piece;
		this.alg_move = alg_move;
		this.position = position;
	}

	move(board, players) {
		if (this.alg_move === 'minimax') {
			let val_move = this.minimax_move(board, players, this.position);
			console.log(val_move[0]);
			board.matrix[val_move[1][0]][val_move[1][1]] = this.piece;
		}
		else if (this.alg_move === 'keyboard') {
			let val_move = this.keyboard_move(board);
			board.matrix[val_move[1][0]][val_move[1][1]] = this.piece;
		}
		else{
			let val_move = this.random_move(board);
			board.matrix[val_move[1][0]][val_move[1][1]] = this.piece;
		}
	}

	minimax_move(board, players, original_position) {
		let next_player = this.next_player(players);
		let empty_cells = board.empty_cells();
		let max_val = null;
		let max_cell = null;
		let val = null;
		for (let i=0; i<empty_cells.length; i++) {
			board.matrix[empty_cells[i][0]][empty_cells[i][1]] = this.piece;
			if (board.win()) {
				max_val = this.position == original_position ? 1 : -1;
				max_cell = empty_cells[i];
			}
			else if (board.full()) {
				max_val = 0;
				max_cell = empty_cells[i];
			}
			else  {
				val = next_player.minimax_move(board, players, this.position);
				max_val = val[0];
				max_cell = empty_cells[i];
			}
			board.matrix[empty_cells[i][0]][empty_cells[i][1]] = null;
			if (max_val[0] == 1 || max_val[0] == -1) break;
		}
		return [max_val, max_cell];
	}

	keyboard_move(board) {
		let empty_cells = board.empty_cells();
		let selected_option = null;
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
				selected_option = empty_cells[option];
			else {
				board.print();
				console.log('Invalid option, choose a correct movement:')
			}
		} while (selected_option === null);
		return [0, selected_option];
	}

	random_move(board) {
		let empty_cells = board.empty_cells();
		let random_empty_cell_pos = Math.floor(Math.random() * empty_cells.length);
		let random_empty_cell = empty_cells[random_empty_cell_pos];
		return [0, random_empty_cell];
	}

	next_player(players) {
		let next_player_position = this.position + 1;
		if (next_player_position == players.length) 
			next_player_position = 0;
		return players[next_player_position];
	}
}

module.exports = { Player };