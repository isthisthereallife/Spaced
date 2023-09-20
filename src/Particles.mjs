import * as PIXI from "pixi.js";
import GameObject from "./GameObject.mjs";

class Particles extends PIXI.Container {
  constructor() {

  }

  explosion(n) {
    for(let i = 0; i < n; i++) {
      let particle = new GameObject();
      
    }
  }
}

export default Particles;
