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
    width: number;
    dimX: number;
    dimY: number;
    constructor(dimX: number, dimY: number) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.width = dimX;
        this.cells = new Array<T>(dimX * dimY);
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

    getCell(x: number, y:number) {
        return this.cells[x + (y * this.width)];
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
}

export default grid;