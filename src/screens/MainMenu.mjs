import * as PIXI from "pixi.js";
import Assets from "../Assets.mjs";
import GameObject from "../GameObject.mjs";
import ParallaxLayers from "../ParallaxLayers.mjs";

class MainMenu extends PIXI.Container {
  constructor() {
    super();

    this.parallaxLayers = new ParallaxLayers([
      {texture: Assets.get("star_0"), n: 20},
      {texture: Assets.get("star_1"), n: 10},
      {texture: Assets.get("star_2"), n: 6},
      {texture: Assets.get("star_3"), n: 2}
    ]);
    this.addChild(this.parallaxLayers);

    this.logo = new GameObject({
      static: {loop: true, goto: "static", frames: [
        {texture: Assets.get("main_menu_logo"), duration: Number.MAX_SAFE_INTEGER}
      ]}
    });

    this.addChild(this.logo);
    this.logo.xPos = (160-this.logo.width)/2;
    this.logo.yPos = 16;

    this.btnStart = new GameObject({
      static: {loop: true, goto: "static", frames: [
        {texture: Assets.get("btn_start"), duration: Number.MAX_SAFE_INTEGER}
      ]}
    });

    this.addChild(this.btnStart);
    this.btnStart.xPos = (160-this.btnStart.width)/2;
    this.btnStart.yPos = 144 - this.btnStart.height - 32;
  }

  update() {
    this.logo.update();
    this.btnStart.update();
    this.parallaxLayers.rotateAroundCenterParallax(0.005);
  }
}

export default MainMenu;
