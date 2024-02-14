import { Assets as PixiAssets} from "pixi.js";

class Assets {
  static #assets;

  static async load(bundle) {
    PixiAssets.addBundle("resources", bundle);
    this.#assets = await PixiAssets.loadBundle("resources");
  }

  static get(bundle, id) {
    return this.#assets[bundle].textures[id];
  }
}

export default Assets;
