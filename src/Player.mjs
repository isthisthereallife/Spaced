import * as PIXI from "pixi.js";
import GameObject from "./GameObject.mjs";
import Input from "./Input.mjs";
class Player extends GameObject {
    constructor(spriteset) {
        super(spriteset);
    }

    update() {
        if (this.rotation < -6 || this.rotation > 6) {
            this.rotation = 0
        }
        


        if (Input.getInput("ArrowLeft") || Input.getInput("KeyA")) {
            this.rotation -= 0.1
        }
        if (Input.getInput("ArrowRight") || Input.getInput("KeyE")) {
            this.rotation += 0.1;
        }


        super.update();
    }
} export default Player;