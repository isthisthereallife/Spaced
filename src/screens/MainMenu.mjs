import * as PIXI from "pixi.js";
import Assets from "../Assets.mjs";
import GameObject from "../GameObject.mjs";
import ParallaxLayers from "../ParallaxLayers.mjs";
import Spaceship from "../Spaceship.mjs";
import DanielInput from "../DanielInput.mjs";
import Screen from "../Screen.mjs";

class MainMenu extends PIXI.Container {
  constructor() {
    super();

    this.parallaxLayers = new ParallaxLayers([
      {texture: Assets.get("sheet", "star_0"), n: 20},
      {texture: Assets.get("sheet", "star_1"), n: 10},
      {texture: Assets.get("sheet", "star_2"), n: 6},
      {texture: Assets.get("sheet", "star_3"), n: 2}
    ]);
    this.addChild(this.parallaxLayers);

    this.logo = new GameObject({
      static: {loop: true, frames: [
        {texture: Assets.get("sheet", "title"), duration: Number.MAX_SAFE_INTEGER}
      ]}
    });
    this.addChild(this.logo);
    this.logo.xPos = (160-this.logo.width)/2;
    this.logo.yPos = 16;
    this.logo.updatePosition();

    this.aPrompt = new GameObject({
      static: {loop: true, frames: [
        {texture: Assets.get("sheet", "a_prompt"), duration: Number.MAX_SAFE_INTEGER}
      ]}
    });
    this.addChild(this.aPrompt);
    this.aPrompt.xPos = (160-this.aPrompt.width)/2;
    this.aPrompt.yPos = 144-16-this.aPrompt.height;
    this.aPrompt.updatePosition();

    this.spaceship = new Spaceship({
      static: {loop: true, frames: [
        {texture: Assets.get("sheet", "spaceship"), duration: Number.MAX_SAFE_INTEGER}
      ]}
    });
    this.addChild(this.spaceship);
    this.spaceship.xPos = (160-this.spaceship.width)/2;
    this.spaceship.yPos = (144-this.spaceship.height)/2;

    this.radians = Math.PI;
    this.bobSpeed = 0.075;
  }

  update() {
    this.radians -= this.bobSpeed;
    if(this.radians <= -Math.PI) this.radians = Math.PI;
    this.spaceship.yPos = (144-this.spaceship.height)/2 + Math.sin(this.radians)*2;
    this.spaceship.update();
    this.parallaxLayers.rotateAroundCenterParallax(0.005);

    if(DanielInput.getClick("z")) {
      Screen.switch("playScreen");
    }
  }
}

export default MainMenu;
