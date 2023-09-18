import * as PIXI from "pixi.js";
import GameObject from "./GameObject.mjs";
import Assets from "./Assets.mjs";

class ParallaxLayers extends PIXI.Container {
  layers = [];

  constructor(layerSettings) {
    super();

    for(let layerSetting of layerSettings) {
      const layer = new PIXI.Container();
      for(let i = 0; i < layerSetting.n; i++) {
        const obj = new GameObject({
          static: {loop: true, goto: "static", frames: [
              { texture: layerSetting.texture, duration: Number.MAX_VALUE }
            ]}
        });
        obj.xPos = Math.random() * 160 - obj.width;
        obj.yPos = Math.random() * 144 - obj.height;
        obj.update();
        layer.addChild(obj);
      }
      this.layers.push(layer);
      this.addChild(layer);
    }
  }

  move(angle, speed) {
    for(let i = 0; i < this.layers.length; i++) {
      for(let child of this.layers[i].children) {
        const radians = angle * (Math.PI / 180);
        child.xPos += Math.cos(radians) * (speed + speed * i);
        child.yPos += Math.sin(radians) * (speed + speed * i);
        this.wrapObjectPosition(child);
        child.update();
      }
    }
  }

  wrapObjectPosition(obj) {
    if (obj.xPos > 160) {
      obj.xPos = 0 - obj.width;
      obj.yPos = Math.round(Math.random() * 144 - obj.height);
    }
    if (obj.xPos < 0 - obj.width) {
      obj.xPos = 160;
      obj.yPos = Math.round(Math.random() * 144 - obj.height);
    }
    if (obj.yPos > 144) {
      obj.yPos = 0 - obj.height;
      obj.xPos = Math.round(Math.random() * 160 - obj.width);
    }
    if (obj.yPos < 0 - obj.height) {
      obj.yPos = 144;
      obj.xPos = Math.round(Math.random() * 160 - obj.width);
    }
  }
}

export default ParallaxLayers;
