import { Sprite } from "pixi.js";
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
        if (Input.getInput("ArrowUp")) {
            this.yPos -= 1;
            // ändra x och y baserat på aktuell rotation
            console.log("up")
        };
        if (Input.getInput("ArrowDown")) {
            this.yPos += 1;
        }
        if (Input.getInput("ArrowLeft")) {
            this.rotation -= 0.1
        }
        if (Input.getInput("ArrowRight")) {
            this.rotation += 0.1;
        }

        // debugging, TODO remove
        if (Input.getInput("KeyR")) {
            this.xPos = Math.round((160) / 2);
            this.yPos = Math.round((144) / 2);
        }// debugging, TODO remove
        if (Input.getInput("KeyP")) {
            this.xPos = Math.round((160) / 2);
            this.yPos = Math.round((144) / 2);
        }

        super.update();
    }
} export default Player;