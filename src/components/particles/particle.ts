export default class Particle {
    type: "solid" | "liquid" | "gas" = "solid";
    constructor() {

    }

    //calculate any changes to state based on surrounding cells.
    calculateStateChange(snapshot: Particle[][]) {

    }
}

export class Air extends Particle {
    type: "solid" | "liquid" | "gas" = "gas";
}