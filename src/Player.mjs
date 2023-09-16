import { Sprite } from "pixi.js";
import Input from "./Input.mjs";
class Player extends Sprite {
    constructor(texture) {
        super(texture);
    }

    update() {

        if (this.rotation < -6 || this.rotation > 6) {
            this.rotation = 0
        }
        if (Input.getInput("ArrowUp")) {
            this.y -= 1;
            // ändra x och y baserat på aktuell rotation

        };
        if (Input.getInput("ArrowDown")) {
            this.y += 1;
        }
        if (Input.getInput("ArrowLeft")) {
            this.rotation -= 0.1
            //this.x -= 1;
        }
        if (Input.getInput("ArrowRight")) {
            this.rotation += 0.1;
        }



        // debugging, TODO remove
        if (Input.getInput("KeyR")) {
            this.x = Math.round((160) / 2);
            this.y = Math.round((144) / 2);
        }// debugging, TODO remove
        if (Input.getInput("KeyP")) {
            this.x = Math.round((160) / 2);
            this.y = Math.round((144) / 2);
        }


    }
} export default Player;