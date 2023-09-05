const prompt = require('prompt-sync')();

class Player {
	// alg_move :: ['minimax', 'keyboard', 'random']
	constructor (piece, alg_move='random') {
		this.piece = piece;
		this.alg_move = alg_move;
	}

	move(board) {
		let empty_cells = board.empty_cells();
		if (this.alg_move === 'minimax') {
			//  Todo
		}
		else if (this.alg_move === 'keyboard') {
			board.print();
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
		else {
			let random_empty_cell_pos = Math.floor(Math.random() * empty_cells.length);
			let random_empty_cell = empty_cells[random_empty_cell_pos];
			board.matrix[random_empty_cell[0]][random_empty_cell[1]] = this.piece;
		}
	}
}

module.exports = { Player };