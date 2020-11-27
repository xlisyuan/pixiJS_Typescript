import { Point, Container, Texture } from "pixi.js";
import PIXIparticles = require('pixi-particles');

export class GameParticle extends Container {

    protected particleEmitter: PIXIparticles.Emitter;

    public init(config: ParticleConfig, app: PIXI.Application) {
        let particleResource = config.emitterResource;
        let imagesName: Array<string> = config.particleImages;
        let particleImages: Array<Texture> = new Array<Texture>();

        imagesName.forEach((img: string) => {
            particleImages.push(Texture.from(img));
        });

        this.name = config.name;
        this.particleEmitter = new PIXIparticles.Emitter(
            this,
            particleImages,
            particleResource
        );

        let pos: PIXI.Point;
        if (config.pos) {
            pos = config.pos;
        } else {
            pos = new PIXI.Point(0, 0);
        }
        this.particleEmitter.updateOwnerPos(pos.x, pos.y);

        this.particleEmitter.particleConstructor = PIXIparticles.Particle;
        this.particleEmitter.emit = true;

        let speed: number = config.speed ? config.speed : 0.03;
        app.ticker.add(() => {
            this.particleEmitter.update(speed);
        });
    }

    public setEmit(emit: boolean= true) {
        this.particleEmitter.emit = emit;
    }
}


export interface ParticleConfig {
    name: string;
    particleImages: Array<string>;
    emitterResource: any;
    speed?: number;
    pos?: Point;
}
