import { Sprite } from "pixi.js";

class GameObject extends Sprite {
  xPos = 0;
  yPos = 0;
  rot = 0;

  /* sample spriteset: {
    idle: { loop: false, goto: "animationname", frames: [{ texture: "texture", duration: 1 }] },
  }; */
  #spriteset;
  #activeSpriteset;
  #spritesetIndex = 0;
  frameDuration = 0;

  switchSpriteset(id) {
    this.#activeSpriteset = this.#spriteset[id];
    this.#spritesetIndex = 0;
    this.frameDuration = this.#activeSpriteset.frames[0].duration;
  }

  constructor(spriteset) {
    super(spriteset[Object.keys(spriteset)[0]].frames[0].texture);

    this.#spriteset = spriteset;
    this.#activeSpriteset = this.#spriteset[Object.keys(this.#spriteset)[0]];
  }

  roundPosition() {
    this.x = Math.round(this.xPos);
    this.y = Math.round(this.yPos);
  }

  draw() {
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
    this.roundPosition();
    this.draw();
  }
}

export default GameObject;
