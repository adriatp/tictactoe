class Board {
  constructor (size) {
    this.size = size;
    this.matrix = [];
    for (let i = this.size; i--;) {
      this.matrix.push(new Array(this.size).fill(null));
    }
  }

  finished () {
    return this.win() || this.full();
  }

  full () {
    return this.empty_cells().length == 0;
  }

  win () {
    return (this.row_same_color() || this.col_same_color() || this.diag_same_color() || this.cdiag_same_color());
  }

  row_same_color () {
    for (let i = 0; i < this.size; i++) {
      const firstColor = this.matrix[i][0];
      if (firstColor !== null) {
        let j = 0;
        while (j < this.size && firstColor === this.matrix[i][j]) {
          j++;
        }
        if (j === this.size) {
          return true;
        }
      }
    }
    return false;
  }

  col_same_color () {
    for (let j = 0; j < this.size; j++) {
      const firstColor = this.matrix[0][j];
      if (firstColor !== null) {
        let i = 0;
        while (i < this.size && firstColor === this.matrix[i][j]) {
          i++;
        }
        if (i === this.size) {
          return true;
        }
      }
    }
    return false;
  }

  diag_same_color () {
    const firstColor = this.matrix[0][0];
    if (firstColor === null)
      return false;
    for (let k = 0; k < this.size; k++) {
      if (firstColor !== this.matrix[k][k]) {
        return false;
      }
    }
    return true;
  }

  cdiag_same_color () {
    let i = 0;
    let j = this.size-1;
    const firstColor = this.matrix[i][j];
    if (firstColor === null)
      return false;
    while (i < this.size) {
      if (firstColor !== this.matrix[i][j]) {
        return false;
      }
      i++; j--;
    }
    return true;
  }

  empty_cells() {
    let empty_cells = [];
    for (let i=0; i<this.size; i++) {
      for (let j=0; j<this.size; j++) {
        if (this.matrix[i][j] === null) {
          empty_cells.push([i,j]);
        }
      }
    }
    return empty_cells;
  }

  print () {
    for (let i=0; i<this.size; i++) {
      for (let j=0; j<this.size; j++) {
        if (this.matrix[i][j] === null) {
          process.stdout.write('_');
        } else {
          process.stdout.write(this.matrix[i][j]);
        }
      }
      process.stdout.write('\n');
    }
  }
}

module.exports = { Board };
