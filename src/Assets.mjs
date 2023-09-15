import * as PIXI from "pixi.js";

export default class Assets {
  static #assets;

  static async load() {
    PIXI.Assets.addBundle("resources", {
      sheet: "res/spritesheet.json",
    });

    this.#assets = await PIXI.Assets.loadBundle("resources");
  }

  static get(id) {
    return this.#assets.sheet.textures[id];
  }
}
