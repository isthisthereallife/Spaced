import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
import Input from "./Input.mjs";
import ScreenController from "./ScreenController.mjs";
import MainMenu from "./screens/MainMenu.mjs";
import DanielInput from "./DanielInput.mjs";
import LoseScreen from "./screens/LoseScreen.mjs";
import WinScreen from "./screens/WinScreen.mjs";

console.log("pixi version:", PIXI.VERSION);

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

export const gameSettings = {
    width: 160,
    height: 144
};

const app = new PIXI.Application({
    width: gameSettings.width,
    height: gameSettings.height,
    resolution: Math.round(window.innerHeight * 0.6 / gameSettings.height),
    backgroundColor: 0x213555
});

document.body.appendChild(app.view);

await Assets.load({
    sheet: "res/spritesheet.json",
    spaceman: "res/spaceman_spritesheet.json",
    transition: "res/screen_transition.json"
});
ScreenController.init(app.stage);
ScreenController.addScreens({
    mainMenu: new MainMenu(),
    loseScreen: new LoseScreen(),
    winScreen: new WinScreen()
});
//Input.startListener();
DanielInput.init();

ScreenController.switch("mainMenu");

PIXI.Ticker.shared.maxFPS = 60;
PIXI.Ticker.shared.add(ts => {
    ScreenController.updateScreen();
});
