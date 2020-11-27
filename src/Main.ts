import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
import 'pixi-spine';

export class GameManager {
   private app: PIXI.Application;

   public constructor() {
      this.app = new PIXI.Application();
      //this.app = new PIXI.Application({ width: 1280, height: 720, backgroundColor: 0xCCCCCC });
      document.body.appendChild(this.app.view);

      this.loading();
   }

   protected loading(): void {
      this.app.loader.add('spine', 'assets/spine/testSpine.json');
      this.app.loader.add('pic', 'assets/PIXIJS.png');

      this.app.loader.onComplete.add(() => {
         this.onLoaderComplete(this.app.loader);
      });
      this.app.loader.load();

   }

   private onLoaderComplete(loader: PIXI.Loader): void {
      this.showSpriteRotate(loader);
      this.showSpineAnimation(loader);
   }

   protected showSpriteRotate(loader: PIXI.Loader): void {
      //create a sprite from a 'gecko.png' image
      let pic: PIXI.Sprite = new PIXI.Sprite(loader.resources['pic'].texture);

      //position the gecko in the center of the screen
      pic.x = this.app.renderer.width / 2;
      pic.y = this.app.renderer.height / 2;

      //add an anchor so the rotate pivots the center of the image
      pic.anchor.x = 0.5;
      pic.anchor.y = 0.5;

      //add the gecko to the screen
      this.app.stage.addChild(pic);

      //listen for frame updates
      this.app.ticker.add(() => {
         //each frame spin the gecko around a tiny bit
         pic.rotation -= 0.01;
      });
   }

   protected showSpineAnimation(loader: PIXI.Loader): void {
      //console.error(PIXI.spine);
      let spine: PIXI.spine.Spine = new PIXI.spine.Spine(loader.resources['spine'].spineData);
      //spine.skeleton.setSkinByName('skin1');
      spine.state.setAnimation(0, 'animation', true);
      spine.position.set(-200, 200);
      //spine.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
      this.app.stage.addChild(spine);
   }
}

window.onload = function () {
   new GameManager();
};

window.PIXI = PIXI;