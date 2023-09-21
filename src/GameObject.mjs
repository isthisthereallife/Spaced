import * as PIXI from "pixi.js";

class GameObject extends PIXI.Sprite {
  #centerRotation = false;
  xPos = 0;
  yPos = 0;
  rot = 0;
  vel = 0;
  acc = 0;

  /* sample spriteset: {
    idle: { loop: false, goto: "animationname", frames: [{ texture: "texture", duration: 1 }] },
  }; */
  #spriteset;
  #activeSpriteset;
  #spritesetIndex = 0;
  frameDuration = 0;

  constructor(spriteset) {
    super(spriteset[Object.keys(spriteset)[0]].frames[0].texture);

    this.#spriteset = spriteset;
    this.#activeSpriteset = this.#spriteset[Object.keys(this.#spriteset)[0]];
  }

  setCenterRotation(bool) {
    this.#centerRotation = bool;
    if(this.#centerRotation) this.pivot.set(this.width/2, this.height/2);
    else this.pivot.set(0, 0);
  }

  switchSpriteset(id) {
    this.#activeSpriteset = this.#spriteset[id];
    this.#spritesetIndex = 0;
    this.frameDuration = this.#activeSpriteset.frames[0].duration;
    this.texture = this.#activeSpriteset.frames[this.#spritesetIndex].texture;
  }

  move(angle, speed) {
    const radians = angle * (Math.PI / 180);
    this.xPos += Math.cos(radians) * (speed);
    this.yPos += Math.sin(radians) * (speed);
    this.updatePosition();
  }

  updatePosition() {
    this.x = Math.round(this.xPos + (this.#centerRotation ? this.width/2 : 0));
    this.y = Math.round(this.yPos + (this.#centerRotation ? this.height/2 : 0));
  }

  drawSprite() {
    if (this.frameDuration > 0) this.frameDuration--;
    else {
      if (this.#spritesetIndex == this.#activeSpriteset.frames.length - 1) {
        if (this.#activeSpriteset.loop) {
          this.#spritesetIndex = 0;
        } else {
          this.switchSpriteset(this.#activeSpriteset.goto);
        }
      } else {
        this.#spritesetIndex++;
      }
      this.texture = this.#activeSpriteset.frames[this.#spritesetIndex].texture;
      this.frameDuration = this.#activeSpriteset.frames[this.#spritesetIndex].duration;
    }
  }

  update() {
    this.updatePosition();
    this.drawSprite();
  }
}

export default GameObject;
