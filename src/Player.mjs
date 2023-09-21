import * as PIXI from "pixi.js";
import GameObject from "./GameObject.mjs";
import DanielInput from "./DanielInput.mjs";
import { gameSettings } from "./main.mjs";

class Player extends GameObject {
    currentTextureIndex = 0;
    collider;
    grounded = true;

    constructor(spriteset) {
        super(spriteset);
        this.rot = 90;
        this.collider = {
            x: gameSettings.width/2,
            y: gameSettings.height/2,
            r: 8
        }
    }

    updateSpriteRotation() {
        let angleIncrement = 360/15;
        let textureIndex = Math.floor(this.rot / angleIncrement);
        if(textureIndex != this.currentTextureIndex) this.switchSpriteset(`spaceman_${textureIndex}`);
        this.currentTextureIndex = textureIndex;
    }

    update() {
        this.updateSpriteRotation();
        super.update();
    }
}

export default Player;
