import GameObject from "./GameObject.mjs";

class Asteroid extends GameObject {
    collider;

    constructor(spriteset) {
        super(spriteset);

        this.setCenterRotation(true);
        this.angle = Math.round(Math.random() * 3) * 90;

        this.collider = {
            x: this.x, // + this.width/2,
            y: this.y, // + this.height/2,
            r: this.width / 2
        }
    }

    update() {
        super.update();
        this.collider.x = this.x; // + this.width/2;
        this.collider.y = this.y; // + this.height/2;
    }
}

export default Asteroid;
