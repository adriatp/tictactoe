class Board {
  constructor (size) {
    this.size = size;
    this.matrix = [];
    for (let i = this.size; i--;) {
      this.matrix.push(new Array(this.size).fill(null));
    }
    this.clear_cells = [...Array(this.size).keys()];
  }

  win () {
    if (this.row_same_color() || this.col_same_color() || this.diag_same_color() || this.cdiag_same_color()) {
      return true;
    } else {
      return false;
    }
  }

  row_same_color () {
    for (let i = 0; i < this.size; i++) {
      const firstColor = this.matrix[i][0];
      if (firstColor === null) {
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
      if (firstColor === null) {
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
    for (let k = 0; k < this.size; k++) {
      if (firstColor !== this.matrix[k][k]) {
        return false;
      }
    }
    return true;
  }

  cdiag_same_color () {
    const firstColor = this.matrix[0][0];
    let i = 1;
    let j = this.size - 2;
    while (i < this.size()) {
      if (firstColor !== this.matrix[i][j]) {
        return false;
      }
      i++; j--;
    }
    return true;
  }

  print () {
    for (let i = this.size; i--;) {
      for (let j = this.size; j--;) {
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
