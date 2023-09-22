import Assets from "./Assets.mjs";
import GameObject from "./GameObject.mjs";
import * as PIXI from "pixi.js";

class OxygenMeter extends PIXI.Container {
  maxOxygen = 44;
  currentOxygen = 44;

  constructor(spriteset) {
    super(spriteset);

    this.oxygenBackground = new GameObject({
      static: {loop:true, frames: [
        {texture: Assets.get("sheet", "oxygen_meter_background"), duration: Number.MAX_SAFE_INTEGER}
      ]}
    });
    this.addChild(this.oxygenBackground);
    this.oxygenBackground.x = 2;

    this.oxygen = new GameObject({
      static: {loop:true, frames: [
        {texture: Assets.get("sheet", "oxygen"), duration: Number.MAX_SAFE_INTEGER}
      ]}
    });
    this.addChild(this.oxygen);
    this.oxygen.pivot.set(this.oxygen.width/2, this.oxygen.height);
    this.oxygen.x = 2 + this.oxygen.width/2;
    this.oxygen.y = this.oxygen.height + 1;

    this.meter = new GameObject({
      static: {loop: true, frames: [
        {texture: Assets.get("sheet", "oxygen_meter"), duration: Number.MAX_SAFE_INTEGER}
      ]}
    });
    this.addChild(this.meter);
  }

  decrementOxygen(value) {
    if(this.currentOxygen - value >= 0) this.currentOxygen -= value;
    else this.currentOxygen = 0;
    this.updateOxygenScale();
  }

  incrementOxygen(value) {
    if(this.currentOxygen + value <= this.maxOxygen) this.currentOxygen += value;
    else this.currentOxygen = this.maxOxygen;
    this.updateOxygenScale();
  }

  updateOxygenScale() {
    this.oxygen.scale.y = 1/this.maxOxygen * Math.round(this.currentOxygen);
  }
}

export default OxygenMeter;
