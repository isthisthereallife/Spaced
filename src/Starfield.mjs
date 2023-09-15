import * as PIXI from "pixi.js";

class Starfield extends PIXI.Container {

  stars = [];
  accumulatedMovement = {
    x: 0,
    y: 0
  };

  constructor(texture, n) {
    super();
    for(let i = 0; i < n; i++) {
      const star = new PIXI.Sprite(texture);
      this.stars.push(star);
      star.x = Math.round(Math.random()*160-star.width);
      star.y = Math.round(Math.random()*144-star.height);
      this.addChild(star);
    }
  }

  move(x, y) {
    this.accumulatedMovement.x += x;
    this.accumulatedMovement.y += y;

    if(this.accumulatedMovement.x >= 1 || 
      this.accumulatedMovement.x <= -1) {
      
      for(let star of this.stars) {
        star.x += this.accumulatedMovement.x;
        this.resetPosition(star);
      }

      this.accumulatedMovement.x = 0;
    }

    if(this.accumulatedMovement.y >= 1 || 
      this.accumulatedMovement.y <= -1) {
      
      for(let star of this.stars) {
        star.y += this.accumulatedMovement.y;
        this.resetPosition(star);
      }

      this.accumulatedMovement.y = 0;
    }
  }

  resetPosition(star) {
    if(star.x > 160) {
      star.x = 0 - star.width;
      star.y = Math.round(Math.random()*144-star.height);
    }
    if(star.x < 0 - star.width) {
      star.x = 160;
      star.y = Math.round(Math.random()*144-star.height);
    }
    if(star.y > 144) {
      star.y = 0 - star.height;
      star.x = Math.round(Math.random()*160-star.width);
    }
    if(star.y < 0 - star.height) {
      star.y = 144;
      star.x = Math.round(Math.random()*160-star.width);
    }
  }
}

export default Starfield;
