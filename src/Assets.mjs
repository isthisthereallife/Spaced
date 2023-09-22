import * as PIXI from "pixi.js";

class Assets {
  static #assets;

  static async load(bundle) {
    PIXI.Assets.addBundle("resources", bundle);
    this.#assets = await PIXI.Assets.loadBundle("resources");
  }

  static get(bundle, id) {
    return this.#assets[bundle].textures[id];
  }
}

export default Assets;
