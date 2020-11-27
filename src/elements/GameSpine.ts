export class GameSpine extends PIXI.spine.Spine {

    public play(animationName: string = 'animation') {
        //spine.skeleton.setSkinByName('skin1');
        this.state.setAnimation(0, animationName, true);
        //spine.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
    }

}