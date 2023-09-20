import DanielInput from "./DanielInput.mjs";
import GameObject from "./GameObject.mjs";
class Player extends GameObject {
    currentTextureIndex = 0;
    constructor(spriteset) {
        super(spriteset);
        this.rot = 90;
    }

    updateSpriteRotation() {
        let textureIndex = Math.floor(this.rot / 45);
        //if(textureIndex > 360) textureIndex -= 360;
        if(textureIndex != this.currentTextureIndex) this.switchSpriteset(`spaceman_${textureIndex}`);
        this.currentTextureIndex = textureIndex;
    }

    update() {
        this.updateSpriteRotation();
        super.update();
    }
}

export default Player;
