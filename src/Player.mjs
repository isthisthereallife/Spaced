import GameObject from "./GameObject.mjs";
import { gameSettings } from "./main.mjs";

class Player extends GameObject {
    last_direction = "right";
    currentSpritesetID = "walk_right";
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
        let angleIncrement = (360/15);
        let textureIndex = Math.floor((this.rot + 270 + 11.25)%360 / angleIncrement);
        this.switchSpriteset(`${this.currentSpritesetID}_${textureIndex}`);
    }

    update() {
        this.updateSpriteRotation();
        super.update();
    }
}

export default Player;
