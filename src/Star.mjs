import * as PIXI from "pixi.js";

class Star extends PIXI.Sprite {
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

export default Star;
