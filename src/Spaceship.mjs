import GameObject from "./GameObject.mjs";

class Spaceship extends GameObject {
  collider;

  constructor(spriteset) {
    super(spriteset);

    this.collider = {
      x: this.width / 2,
      y: this.height / 2,
      r: 20
    }
  }
  update() {
    super.update()
    this.collider.x = this.xPos+ this.width/2;
    this.collider.y = this.yPos+ this.height/2;
  }
}

export default Spaceship;
