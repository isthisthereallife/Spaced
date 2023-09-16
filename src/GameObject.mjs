import { Sprite } from "pixi.js";

class GameObject extends Sprite {
  xPos = 0;
  yPos = 0;
  rot = 0;

  constructor(texture) {
    super(texture);
  }

  move(x, y) {
    this.xPos += x;
    this.yPos += y;
  }

  update() {
    this.x = Math.round(this.xPos);
    this.y = Math.round(this.yPos);
  }
}

export default GameObject;
