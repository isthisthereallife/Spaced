import GameObject from "./GameObject.mjs";
class Player extends GameObject {
    asteroidAngle = 90;
    constructor(spriteset) {
        super(spriteset);
        
    }

    update() {
        super.update();
    }

    rotatePlayer() {
        
        let sprite = Math.floor((this.asteroidAngle > 360? this.asteroidAngle -360 : this.asteroidAngle) / 45);
       this.switchSpriteset("spaceman_" + sprite.toString())
        


    }

    updateAsteroidAngle(angle) {
        angle = angle * (180 / Math.PI);
        if (angle < 0) {
            angle = 360 + angle;
        }
        this.asteroidAngle = angle + 22.5;
        
        this.rotatePlayer();
    }


}

export default Player;
