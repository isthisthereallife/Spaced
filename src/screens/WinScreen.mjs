import * as PIXI from "pixi.js";
import DanielInput from "../DanielInput.mjs";
import GameObject from "../GameObject.mjs";
import ParallaxLayers from "../ParallaxLayers.mjs";
import Assets from "../Assets.mjs";
import ScreenController from "../ScreenController.mjs";

class WinScreen extends PIXI.Container {
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
        loop: false, callback: () => ScreenController.switch("mainMenu"), frames: [
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
        frames: [
          { texture: Assets.get("sheet", "win"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.addChild(this.logo);
    this.logo.xPos = (160 - this.logo.width) / 2;
    this.logo.yPos = 16;
    this.logo.updatePosition();

    this.aPrompt = new GameObject({
      static: {
        loop: false, frames: [
          { texture: Assets.get("sheet", "a_prompt_continue"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.addChild(this.aPrompt);
    this.aPrompt.xPos = (160 - this.aPrompt.width) / 2;
    this.aPrompt.yPos = 144 - 16 - this.aPrompt.height;
    this.aPrompt.updatePosition();

    this.helmet = new GameObject({
      static: {
        loop: false, frames: [
          { texture: Assets.get("sheet", "helmet"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.addChild(this.helmet);
    this.helmet.xPos = (160 - this.helmet.width) / 2;
    this.helmet.yPos = (144 - this.helmet.height) / 2;
    this.helmet.updatePosition();

    this.addChild(this.transition);
  }

  update() {
    this.transition.update();
    if (this.transitionComplete) {
      this.parallaxLayers.move(0, 0.040);
      if (DanielInput.getClick("z") || DanielInput.getClick("Z") || DanielInput.getClick("a") || DanielInput.getClick("A")) {
        this.transitionComplete = false;
        this.transition.switchSpriteset("conceal");
      }
    }
  }
}

export default WinScreen;
