import * as PIXI from "pixi.js";
import GameObject from "./GameObject.mjs";
import { gameSettings } from "./main.mjs";

class ParallaxLayers extends PIXI.Container {
  layers = [];

  constructor(layerSettings) {
    super();

    for(let layerSetting of layerSettings) {
      const layer = new PIXI.Container();
      for(let i = 0; i < layerSetting.n; i++) {
        const obj = new GameObject({
          static: {loop: true, goto: "static", frames: [
              { texture: layerSetting.texture, duration: Number.MAX_SAFE_INTEGER }
            ]}
        });
        obj.xPos = Math.random() * gameSettings.width - obj.width;
        obj.yPos = Math.random() * gameSettings.height - obj.height;
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

  rotateAroundCenter(speed) {
    for(let i = 0; i < this.layers.length; i++) {
      for(let child of this.layers[i].children) {
        let angleToCenter = Math.atan2(child.yPos - (gameSettings.height/2), child.xPos - gameSettings.width/2);
        let distanceToCenter = Math.sqrt((child.xPos - (gameSettings.width/2))**2 + (child.yPos - (gameSettings.height/2))**2);
        child.xPos = (gameSettings.width/2) + Math.cos(angleToCenter + (speed+speed*i)) * distanceToCenter;
        child.yPos = (gameSettings.height/2) + Math.sin(angleToCenter + (speed+speed*i)) * distanceToCenter;

        this.wrapObjectPosition(child);
        child.update();
      }
    }
  }

  wrapObjectPosition(obj) {
    if (obj.xPos > gameSettings.width) {
      obj.xPos = 0 - obj.width;
      obj.yPos = Math.round(Math.random() * gameSettings.height - obj.height);
    }
    if (obj.xPos < 0 - obj.width) {
      obj.xPos = gameSettings.width;
      obj.yPos = Math.round(Math.random() * gameSettings.height - obj.height);
    }
    if (obj.yPos > gameSettings.height) {
      obj.yPos = 0 - obj.height;
      obj.xPos = Math.round(Math.random() * gameSettings.width - obj.width);
    }
    if (obj.yPos < 0 - obj.height) {
      obj.yPos = gameSettings.height;
      obj.xPos = Math.round(Math.random() * gameSettings.width - obj.width);
    }
  }
}

export default ParallaxLayers;
