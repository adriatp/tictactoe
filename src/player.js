class Player {
	// alg_move :: ['minimax', 'keyboard', 'random']
	constructor (piece, alg_move='random') {
		this.piece = piece;
		this.alg_move = alg_move;
	}

	move(board) {
		if (this.alg_move === 'minimax') {
			//  Todo
		}
		else if (this.alg_move === 'keyboard') {

		}
		else {
			let empty_cells = board.empty_cells();
			let random_empty_cell_pos = Math.floor(Math.random() * empty_cells.length);
			let random_empty_cell = empty_cells[random_empty_cell_pos];
			board.matrix[random_empty_cell[0]][random_empty_cell[1]] = this.piece;
		}
	}
}

module.exports = { Player };