export type ValidParticles = "dust" | "water"
export type ParticleType = "solid" | "liquid" | "gas" | "invalid";

export type Common = {
    type: ParticleType,
    color: number[]
}

export default abstract class Particle {
    abstract common: Common;
    constructor() {

    }

    //calculate any changes to state based on surrounding cells.
    calculateStateChange(snapshot: Particle[][]) {

    }
}

const AirShared: Common = {
    type: "gas",
    color: [0, 0, 0, 0]
}

export class Air extends Particle {
    common: Common = AirShared;

    constructor() {
        super();
    }
}