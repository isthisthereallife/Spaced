import Assets from "./Assets.mjs";
import GameObject from "./GameObject.mjs";
import { Container } from "pixi.js";

class OxygenMeter extends Container {
  static maxOxygen = 44;
  static currentOxygen = 44;

  constructor(spriteset) {
    super(spriteset);

    this.oxygenBackground = new GameObject({
      static: {
        loop: true, frames: [
          { texture: Assets.get("sheet", "oxygen_meter_background"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.addChild(this.oxygenBackground);
    this.oxygenBackground.x = 2;

    this.oxygen = new GameObject({
      static: {
        loop: true, frames: [
          { texture: Assets.get("sheet", "oxygen"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.addChild(this.oxygen);
    this.oxygen.pivot.set(this.oxygen.width / 2, this.oxygen.height);
    this.oxygen.x = 2 + this.oxygen.width / 2;
    this.oxygen.y = this.oxygen.height + 1;

    this.meter = new GameObject({
      static: {
        loop: true, frames: [
          { texture: Assets.get("sheet", "oxygen_meter"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.addChild(this.meter);
  }

  decrementOxygen(value) {
    if (OxygenMeter.currentOxygen - value >= 0) OxygenMeter.currentOxygen -= value;
    else OxygenMeter.currentOxygen = 0;
    this.updateOxygenScale();
  }

  incrementOxygen(value) {
    if (OxygenMeter.currentOxygen + value <= OxygenMeter.maxOxygen) OxygenMeter.currentOxygen += value;
    else OxygenMeter.currentOxygen = OxygenMeter.maxOxygen;
    this.updateOxygenScale();
  }

  updateOxygenScale() {
    this.oxygen.scale.y = 1 / OxygenMeter.maxOxygen * Math.round(OxygenMeter.currentOxygen);
  }

  static getOxygenPercentage() {
    return Math.ceil((OxygenMeter.currentOxygen / OxygenMeter.maxOxygen) * 100);
  }
}

export default OxygenMeter;
