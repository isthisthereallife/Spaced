import { Container } from "pixi.js";
import GameObject from "./GameObject.mjs";

class Particles extends Container {
  constructor() {

  }

  explosion(n) {
    for (let i = 0; i < n; i++) {
      let particle = new GameObject();

    }
  }
}

export default Particles;
