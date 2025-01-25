import OutOfBoundsError from "../Utils/errors/OutOfBoundsError";
type Position = {
    x: number,
    y: number
}

export const Position = {
    origin: {x: 0, y: 0},
    sum: function (a: Position, b: Position): Position {
        return {
            x: a.x + b.x,
            y: a.y + b.y
        }
    }
}

interface cellData {
    position: {
        x: number,
        y: number,
    },
    neighbors: any[]
}

export const offsets = [
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

    keepCell(cell: number) {
        this.bufferCells[cell] = this.cells[cell];
    }

    moveCellRelative(cell: number, xOffset: number, yOffset: number) {
        const particle = this.cells[cell];
        const newPosition = (cell + xOffset) - (yOffset * this.width);
        if (newPosition > this.cells.length) {
            throw new OutOfBoundsError();
        }
        this.bufferCells[(cell + xOffset) + (yOffset * this.width)] = particle;
    }

    updateCells() {
        this.cells = new Array<T>(this.dimX * this.dimY);

        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = this.bufferCells[i];
        }

        this.bufferCells = new Array<T>(this.dimX * this.dimY);
    }

    toXY(i: number) {
        return {
            x: i % this.width,
            y: Math.floor(i / this.width)
        }
    }

    isOutOfBounds(coordinate: Position, offset: Position = Position.origin): boolean {
        const summation = Position.sum(coordinate, offset);

        return (summation.x < 0 || summation.x >= this.dimX|| summation.y < 0 || summation.y >= this.dimY);
    }

    isEmpty(coordinate: Position, offset: Position = Position.origin): boolean {
        const summation = Position.sum(coordinate, offset);

        return this.cells[summation.x + summation.y * this.width] == undefined;
    }

}

export default grid;