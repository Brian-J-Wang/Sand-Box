import p5 from "p5";
import grid from "./grid";
import Particle, { Air } from "./particles/particle";
import Dust from "./particles/dust";

export default class SandBox {
    grid: grid<Particle> = new grid(1000,1000, new Air());
    constructor(private readonly canvas: string) {}

    start() {
        new p5((p: p5) => {
            p.setup = () => {
                for (let i = 0; i < this.grid.cells.length; i++) {
                    this.grid.cells[i] = new Air();
                }
                p.createCanvas(1000, 1000).parent(this.canvas);
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

                this.grid.setCell(p.mouseX, p.mouseY, new Dust())
            }

            const updatePositions = () => {
                for (let i = 0; i < this.grid.cells.length; i++) {
                    const cell = this.grid.getCell(i);
                    if (cell.common.type = 'invalid') {
                        continue;
                    }
                    
                    if (cell.common.type = 'solid') {
                        if (this.grid.toXY(i).y < 1000) {
                            this.grid.moveCellRelative(i, 0, 1);
                        }
                    }
                }

                this.grid.updateCells();
            }

            const paint = () => {
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