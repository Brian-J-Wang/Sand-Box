import p5 from "p5";
import grid, { offsets, Position } from "./grid";
import Particle, { Air } from "./particles/particle";
import Dust from "./particles/dust";

const width = 500;
const height = 500;

export default class SandBox {
    grid: grid<Particle> = new grid(width, height, new Air());
    constructor(private readonly canvas: string) {}

    start() {
        new p5((p: p5) => {
            p.setup = () => {
                for (let i = 0; i < this.grid.cells.length; i++) {
                    this.grid.cells[i] = new Air();
                }
                p.createCanvas(width, height).parent(this.canvas);
                p.frameRate(24);
                p.loadPixels();
            }

            p.draw = () => {
                //paint the cell
                
                updatePositions();
                
                paint();
            };

            p.mouseDragged = (evt) => {
                if (p.mouseButton != "left") {
                    return;
                }

                offsets.forEach((offset) => {
                    const position = Position.sum({x: p.mouseX, y: p.mouseY}, offset);
                    this.grid.setCell(position.x, position.y, new Dust())
                })
                
            }

            const updatePositions = () => {
                for (let i = 0; i < this.grid.cells.length; i++) {
                    const cell = this.grid.getCell(i);
                    if (cell.common.type == 'invalid') {
                        continue;
                    }
                    
                    if (cell.common.type == 'solid') {
                        const coordinates = this.grid.toXY(i);
                        const positionOffset = {
                            x: 0,
                            y: 1,
                        }

                        if (this.grid.isOutOfBounds(coordinates, positionOffset)) {
                            this.grid.keepCell(i);
                            continue;
                        }

                        if (this.grid.isEmpty(coordinates, positionOffset)) {
                            this.grid.moveCellRelative(i, positionOffset.x, positionOffset.y);
                        } else {
                            this.grid.keepCell(i);
                            continue;
                        }
                    }
                }
            }

            const paint = () => {
                this.grid.updateCells();

                for (let i = 0; i < this.grid.cells.length; i++) {
                    const particle = this.grid.getCell(i);
                    p.pixels[i * 4] = particle.common.color[0];
                    p.pixels[i * 4 + 1] = particle.common.color[0];
                    p.pixels[i * 4 + 2] = particle.common.color[0];
                    p.pixels[i * 4 + 3] = particle.common.color[0];
                }

                p.updatePixels();

            }
        });
    }
}