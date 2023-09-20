import DanielInput from "./DanielInput.mjs";
import GameObject from "./GameObject.mjs";
class Player extends GameObject {
    currentTextureIndex = 0;
    constructor(spriteset) {
        super(spriteset);
        this.rot = 90;
    }

    updateSpriteRotation() {
        let angleIncrement = 360/15;
        let textureIndex = Math.floor(this.rot / angleIncrement);
        // if(textureIndex > 360) textureIndex -= 360;
        console.log(textureIndex);
        if(textureIndex != this.currentTextureIndex) this.switchSpriteset(`spaceman_${textureIndex}`);
        this.currentTextureIndex = textureIndex;
       //this.angle = this.rot;
    }

    update() {
        this.updateSpriteRotation();
        super.update();
    }
}

export default Player;
