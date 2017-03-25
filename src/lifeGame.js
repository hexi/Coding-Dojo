'use strict'

class InvalidPositinError extends Error {
	constructor(message) {
    super(message); // 调用父类的constructor(x, y)
  }
}

class Cell {
	constructor(alive = true) {
		this.alive = alive;
	}

	setAlive(alive) {
		this.alive = alive;
	}

	isAlive() {
		return this.alive;
	}

}

class World {

	constructor() {
		this.cells = new Array();
	}

	init(row, clounm) {
		for (let i of range(row)) {
			let aRowCells = new Array();
			for (let j of range(clounm)) {
				aRowCells.push(new Cell())
			}
			this.cells.push(aRowCells);
		}
	}

	getCellNumbers() {
		if (this.cells.length === 0)
			return 0;
		let aRowCells = this.cells[0];
		return this.cells.length * aRowCells.length;
	}

	setAliveAt(x, y, alive) {
		this.ensureInTheWorld(x, y);

		let cell = this.getCell(x, y);
		cell.setAlive(alive);
	}

	getCell(x, y) {
		this.ensureInTheWorld(x, y);
		return this.cells[x][y];
	}

	ensureInTheWorld(x, y) {
		if (this.cells.length < 1)
			throw new InvalidPositinError('The world has not been initial')
		if (x < 0 || x >= this.cells.length)
			throw new InvalidPositinError(`The x point(${x}) must be in the world(0, ${this.cells.length - 1})`);
		let aRowCells = this.cells[0];
		if (y < 0 || y >= aRowCells.length)
			throw new InvalidPositinError(`The y point(${y}) must be in the world(0, ${aRowCells.length -1})`);
	}

	getNeighborCellsOf(x, y) {
		this.ensureInTheWorld(x, y);
		let result = new Array();
		for (let i = x-1; i <= x+1; i++) {
			for (let j = y-1; j <= y+1; j++) {
				if (i === x && j === y) {
					continue;
				}
				try {
					this.ensureInTheWorld(i, j);
					result.push(this.cells[i][j]);
				} catch (e) {
					if (e instanceof InvalidPositinError) {
						result.push(new Cell(false));
					}
				}
			}
		}

		return result;
	}

	getAliveNeighborCount(neighborCells) {
		return neighborCells.reduce(function(accumulator, cell, currentIndex, array) {
			return accumulator + (cell.isAlive() ? 1 : 0);
		}, 0);
	}

	metabolism() {
		if (!this.cells || this.cells.length == 0) {
			return
		}
		this.cells.forEach(function(aRowCells, i) {
			aRowCells.forEach(function(cell, j) {
				let aliveNeighborCount = this.getAliveNeighborCount(this.getNeighborCellsOf(i, j));
				if (aliveNeighborCount < 2) {
					cell.setAlive(false);
				} else if (aliveNeighborCount === 3) {
					cell.setAlive(true);
				} else if (aliveNeighborCount > 3) {
					cell.setAlive(false);
				}
			}, this);
		}, this);
	}


}

function* range() {
	var args = Array.from(arguments);
	if (args.length < 1) {
		return;
	}
	let begin = 0;
	let end;
	let interval = 1;
	if (args.length === 1) {
		end = args[0]
	} else if (args.length === 2) {
		begin = args[0];
		end = args[1];
	} else if (args.length > 2) {
		begin = args[0];
		end = args[1];
		interval = args[2];
	}

	for (let i = begin; i < end; i += interval) {
		yield i;
	}
}

export {
	Cell,
	World,
	InvalidPositinError
}