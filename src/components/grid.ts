interface cellData {
    position: {
        x: number,
        y: number,
    },
    neighbors: any[]
}

const offsets = [
    { x: -1, y: -1},
    { x: 0, y: -1},
    { x: 1, y: -1},
    { x: -1, y: 0},
    { x: 1, y: 0},
    { x: -1, y: 1},
    { x: 0, y: 1},
    { x: 1, y: 1}
]

class grid<T> {
    cells: T[];
    bufferCells: T[];
    default: T
    width: number;
    dimX: number;
    dimY: number;
    constructor(dimX: number, dimY: number, defaultT: T) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.width = dimX;
        this.cells = new Array<T>(dimX * dimY);
        this.bufferCells = new Array<T>(dimX * dimY);
        this.default = defaultT;

    }

    forEach(fn: (cell: T, data: cellData) => void) {
        for (let i = 0; i < this.cells.length; i++) {
            const x = i % this.width;
            const y = Math.floor(i / this.width);
            const data: cellData = {
                position: {
                    x: x,
                    y: y
                },
                neighbors: this.getNeighbors(x, y)
            }

            fn(this.cells[i], data);
        }
    }

    getCell(i: number, j: number = -1): T {
        if (j == -1) {
            return this.cells[i] ?? this.default;
        } else {
            return this.cells[i + j * this.width] ?? this.default;
        }
    }

    getNeighbors(x: number, y: number): T[] {
        const neighbors: T[] = [];

        offsets.forEach((offset) => {
            const offsetPosition = {
                x: x + offset.x,
                y: y + offset.y
            }

            if (offsetPosition.x > this.dimX || offsetPosition.x < 0) {
                return;
            }

            if (offsetPosition.y > this.dimY || offsetPosition.y < 0) {
                return;
            }

            neighbors.push(this.getCell(x + offset.x, y))
        })

        return neighbors;
    }

    setCell(x: number, y: number, data: T) {
        this.bufferCells[x + y * this.width] = data;
    }

    moveCellRelative(cell: number, xOffset: number, yOffset: number) {
        const particle = this.cells[cell];
        this.bufferCells[(cell + xOffset) + (yOffset * this.width)] = particle;
    }

    updateCells() {
        this.cells = new Array<T>(this.dimX * this.dimY);

        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = this.bufferCells[i];
            this.bufferCells[i];
        }
    }

    toXY(i: number) {
        return {
            x: i % this.width,
            y: Math.floor(i / this.width)
        }
    }
}

export default grid;