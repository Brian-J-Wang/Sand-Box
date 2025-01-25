import Particle, { Common, ParticleType } from "./particle";

const DustShared: Common = {
    type: "solid",
    color: [107, 84, 40, 255]
}

export default class Dust extends Particle {
    common: Common = DustShared;
}