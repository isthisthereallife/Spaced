import * as PIXI from "pixi.js";
import Assets from "../Assets.mjs";
import GameObject from "../GameObject.mjs";
import ParallaxLayers from "../ParallaxLayers.mjs";
import Spaceship from "../Spaceship.mjs";
import DanielInput from "../DanielInput.mjs";
import ScreenController from "../ScreenController.mjs";

class MainMenu extends PIXI.Container {
  transitionComplete = false;

  init() {
    this.transition.switchSpriteset("reveal");
  }

  constructor() {
    super();

    this.transition = new GameObject({
      reveal: {
        loop: false, callback: () => this.transitionComplete = true, frames: [
          { texture: Assets.get("transition", "transition_0"), duration: 2 },
          { texture: Assets.get("transition", "transition_1"), duration: 2 },
          { texture: Assets.get("transition", "transition_2"), duration: 2 },
          { texture: Assets.get("transition", "transition_3"), duration: 2 },
          { texture: Assets.get("transition", "transition_4"), duration: 2 },
          { texture: Assets.get("transition", "transition_5"), duration: 2 },
          { texture: Assets.get("transition", "transition_6"), duration: 2 },
          { texture: Assets.get("transition", "transition_7"), duration: 2 },
          { texture: Assets.get("transition", "transition_8"), duration: 2 },
          { texture: Assets.get("transition", "transition_9"), duration: 2 },
          { texture: Assets.get("transition", "transition_10"), duration: 2 },
          { texture: Assets.get("transition", "transition_11"), duration: 2 },
          { texture: Assets.get("transition", "transition_12"), duration: 2 }
        ]
      },
      conceal: {
        loop: false, callback: () => ScreenController.switch("playScreen"), frames: [
          { texture: Assets.get("transition", "transition_12"), duration: 2 },
          { texture: Assets.get("transition", "transition_11"), duration: 2 },
          { texture: Assets.get("transition", "transition_10"), duration: 2 },
          { texture: Assets.get("transition", "transition_9"), duration: 2 },
          { texture: Assets.get("transition", "transition_8"), duration: 2 },
          { texture: Assets.get("transition", "transition_7"), duration: 2 },
          { texture: Assets.get("transition", "transition_6"), duration: 2 },
          { texture: Assets.get("transition", "transition_5"), duration: 2 },
          { texture: Assets.get("transition", "transition_4"), duration: 2 },
          { texture: Assets.get("transition", "transition_3"), duration: 2 },
          { texture: Assets.get("transition", "transition_2"), duration: 2 },
          { texture: Assets.get("transition", "transition_1"), duration: 2 },
          { texture: Assets.get("transition", "transition_0"), duration: 2 }
        ]
      }
    });

    this.parallaxLayers = new ParallaxLayers([
      { texture: Assets.get("sheet", "star_0"), n: 20 },
      { texture: Assets.get("sheet", "star_1"), n: 10 },
      { texture: Assets.get("sheet", "star_2"), n: 6 },
      { texture: Assets.get("sheet", "star_3"), n: 2 }
    ]);
    this.addChild(this.parallaxLayers);

    this.logo = new GameObject({
      static: {
        loop: true, frames: [
          { texture: Assets.get("sheet", "title"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.addChild(this.logo);
    this.logo.xPos = (160 - this.logo.width) / 2;
    this.logo.yPos = 16;
    this.logo.updatePosition();

    this.aPrompt = new GameObject({
      static: {
        loop: true, frames: [
          { texture: Assets.get("sheet", "a_prompt_start"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.addChild(this.aPrompt);
    this.aPrompt.xPos = (160 - this.aPrompt.width) / 2;
    this.aPrompt.yPos = 144 - 16 - this.aPrompt.height;
    this.aPrompt.updatePosition();

    this.spaceship = new Spaceship({
      static: {
        loop: true, frames: [
          { texture: Assets.get("sheet", "spaceship"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.addChild(this.spaceship);
    this.spaceship.xPos = (160 - this.spaceship.width) / 2;
    this.spaceship.yPos = (144 - this.spaceship.height) / 2;
    this.spaceship.updatePosition();

    this.radians = Math.PI;
    this.bobSpeed = 0.075;

    this.addChild(this.transition);
  }

  update() {
    this.transition.update();
    if (this.transitionComplete) {
      this.radians -= this.bobSpeed;
      if (this.radians <= -Math.PI) this.radians = Math.PI;
      this.spaceship.yPos = (144 - this.spaceship.height) / 2 + Math.sin(this.radians) * 2;
      this.spaceship.update();
      this.parallaxLayers.rotateAroundCenterParallax(0.005);

      if (DanielInput.getClick("z") || DanielInput.getClick("Z") || DanielInput.getClick("a") || DanielInput.getClick("A")) {
        this.transitionComplete = false;
        this.transition.switchSpriteset("conceal");
      }
    }
  }
}

export default MainMenu;
