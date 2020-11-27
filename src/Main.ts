import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
import 'pixi-spine';
import { GameParticle, ParticleConfig } from './elements/GameParticle';
import { GameSpine } from './elements/GameSpine';

export class GameManager {
   private app: PIXI.Application;

   public constructor() {

      //BF Cache fix if needed (safari)
      window.onpageshow = function (event) {
         if (event.persisted) {
            window.location.reload();
         }
      };

      this.app = new PIXI.Application({ width: 1280, height: 720, backgroundColor: 0xCCCCCC });
      document.body.appendChild(this.app.view);

      this.loading();
   }

   protected loading(): void {
      this.app.loader.add('spine', 'assets/spine/testSpine.json');
      this.app.loader.add('pic', 'assets/PIXIJS.png');
      this.app.loader.add('particles', 'assets/particles/particles.json');

      this.app.loader.onComplete.add(() => {
         this.onLoaderComplete(this.app.loader);
      });
      this.app.loader.load();

   }

   private onLoaderComplete(loader: PIXI.Loader): void {
      this.showSprite(loader.resources['pic'].texture);
      this.showSpineAnimation(loader.resources['spine'].spineData);

      let particlesConfig: ParticleConfig = {
         name: "particles",
         emitterResource: loader.resources["particles"].data,
         particleImages: ['assets/particles/p0.png', 'assets/particles/p1.png', 'assets/particles/p2.png', 'assets/particles/p3.png', 'assets/particles/p4.png']
      };
      this.addParticles(particlesConfig);
   }

   protected showSprite(texture: PIXI.Texture): void {
      let pic: PIXI.Sprite = new PIXI.Sprite(texture);
      pic.position.set(0, 0);
      this.app.stage.addChild(pic);
   }

   protected showSpineAnimation(skeletonData: PIXI.spine.core.SkeletonData): void {
      let animation: GameSpine = new GameSpine(skeletonData);
      animation.play();
      animation.position.set(-200, 200);
      this.app.stage.addChild(animation);
   }

   protected addParticles(config: ParticleConfig): void {
      let particle = new GameParticle();
      particle.init(config, this.app);
      this.app.stage.addChild(particle);
   }
}

window.onload = function () {
   new GameManager();
};

window.PIXI = PIXI;