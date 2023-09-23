import GameObject from "./GameObject.mjs";

class Spaceship extends GameObject {
  collider;

  constructor(spriteset) {
    super(spriteset);

    this.collider = {
      x: this.width/2,
      y: this.height/2,
      r: 15
    }
  }
}

export default Spaceship;
