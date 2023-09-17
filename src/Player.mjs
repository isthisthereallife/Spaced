import * as PIXI from "pixi.js";
import GameObject from "./GameObject.mjs";
import Input from "./Input.mjs";
import Assets from "./Assets.mjs";
class Player extends GameObject {
    constructor(spriteset) {
        super(spriteset);
    }

    update(newAngle) {

        switch (newAngle) {
            case "S":
                console.log("tryna change asset to ", newAngle);
                this._texture = Assets.get("spaceman_S");
                break;

            default:
                break;
        }
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