import * as PIXI from "pixi.js";
import DanielInput from "../DanielInput.mjs";
import GameObject from "../GameObject.mjs";
import ParallaxLayers from "../ParallaxLayers.mjs";
import Assets from "../Assets.mjs";
import ScreenController from "../ScreenController.mjs";
import OxygenMeter from "../OxygenMeter.mjs";

class WinScreen extends PIXI.Container {
  transitionComplete = false;
  oxygenLeft;

  init() {
    this.transition.switchSpriteset("reveal");

    this.oxygenLeft = OxygenMeter.getOxygenPercentage().toString().padStart(2, "0");
    this.removeChildren();

    this.addChild(this.parallaxLayers);
    this.addChild(this.logo);
    this.addChild(this.aPrompt);
    this.addChild(this.withText);

    this.oxygenPercentage.removeChildren();

    let totalWidth = 0;
    let oxygenNumberString = this.oxygenLeft;
    for (let stringNumber of oxygenNumberString) {
      let number = new GameObject({
        static: {
          frames: [{ texture: Assets.get("sheet", `number_${stringNumber}`) }]
        }
      })
      this.oxygenPercentage.addChild(number);
      number.xPos = totalWidth;
      number.update();
      totalWidth += number.width;
    }

    this.percentage.xPos = totalWidth;
    this.percentage.update();
    this.oxygenPercentage.addChild(this.percentage);
    this.addChild(this.oxygenPercentage);
    this.oxygenPercentage.x = Math.round((160 - this.oxygenPercentage.width) / 2);
    this.oxygenPercentage.y = Math.round((144 - this.withText.height) / 2 + this.withText.height);

    this.spare.xPos = (160 - this.spare.width) / 2;
    this.spare.yPos = Math.round((144 - this.withText.height) / 2 + this.withText.height + this.oxygenPercentage.height) + 4;
    this.spare.update();
    this.addChild(this.spare);
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

    this.logo = new GameObject({
      static: {
        frames: [
          { texture: Assets.get("sheet", "win"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
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
    this.aPrompt.xPos = (160 - this.aPrompt.width) / 2;
    this.aPrompt.yPos = 144 - 16 - this.aPrompt.height;
    this.aPrompt.updatePosition();
    this.aPrompt.eventMode = "static";
    this.aPrompt.on('touchstart', () => {
      this.goToMainMenu();
    });


    this.withText = new GameObject({
      static: {
        loop: false, frames: [
          { texture: Assets.get("sheet", "oxygen_text_with"), duration: Number.MAX_SAFE_INTEGER }
        ]
      }
    });
    this.withText.xPos = (160 - this.withText.width) / 2;
    this.withText.yPos = (144 - this.withText.height) / 2 - 4;
    this.withText.updatePosition();



    this.oxygenPercentage = new PIXI.Container();

    this.percentage = new GameObject({
      static: {
        frames: [{ texture: Assets.get("sheet", "number_prc") }]
      }
    });

    this.spare = new GameObject({
      static: {
        frames: [{ texture: Assets.get("sheet", "oxygen_text_spare") }]
      }
    });
  }

  update() {
    this.transition.update();
    if (this.transitionComplete) {
      this.parallaxLayers.move(270, 0.12);
      if (DanielInput.getClick("z") || DanielInput.getClick("Z") || DanielInput.getClick("a") || DanielInput.getClick("A")) {
        this.goToMainMenu()
      }
    }
  }
  goToMainMenu() {
    this.transitionComplete = false;
    this.transition.switchSpriteset("conceal");
  }
}

export default WinScreen;
