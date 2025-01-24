import p5 from "p5";
import grid from "./grid";
import Particle from "./particles/particle";

export default class SandBox {
    grid: grid<Particle> = new grid(1000,1000);
    constructor(private readonly canvas: string) {}

    start() {
        new p5((p: p5) => {
            p.setup = () => {
                p.createCanvas(1000, 1000).parent(this.canvas);
                p.frameRate(24);
            }

            p.draw = () => {

            };

            onmousemove = (ev: MouseEvent) => {
                if (ev.buttons != 1) {
                    return;
                }

                
            }
        });
    }
}