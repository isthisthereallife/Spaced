import * as PIXI from "pixi.js";
import GameObject from "./GameObject.mjs";

class Starfield extends PIXI.Container {
  stars = [];

  constructor(texture, n) {
    super();

    for (let i = 0; i < n; i++) {
      const star = new GameObject({
        static: {loop: true, goto: "static", frames: [
          {texture: texture, duration: Number.MAX_VALUE}
        ]}
      });
      this.stars.push(star);
      this.addChild(star);

      star.xPos = Math.random() * 160 - star.width;
      star.yPos = Math.random() * 144 - star.height;
    }
  }

  move(x, y) {
    for (let star of this.stars) {
      star.xPos += x;
      star.yPos += y;
      this.wrapStarPosition(star);
      star.update();
    }
  }

  wrapStarPosition(star) {
    if (star.xPos > 160) {
      star.xPos = 0 - star.width;
      star.yPos = Math.round(Math.random() * 144 - star.height);
    }
    if (star.xPos < 0 - star.width) {
      star.xPos = 160;
      star.yPos = Math.round(Math.random() * 144 - star.height);
    }
    if (star.yPos > 144) {
      star.yPos = 0 - star.height;
      star.xPos = Math.round(Math.random() * 160 - star.width);
    }
    if (star.yPos < 0 - star.height) {
      star.yPos = 144;
      star.xPos = Math.round(Math.random() * 160 - star.width);
    }
  }
}

export default Starfield;
