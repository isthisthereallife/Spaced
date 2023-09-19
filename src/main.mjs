import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
import Input from "./Input.mjs";
import Screen from "./Screen.mjs";
import MainMenu from "./screens/MainMenu.mjs";
import GameScreen from "./screens/GameScreen.mjs";

console.log("pixi version:", PIXI.VERSION);

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

const gameSettings = {
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

await Assets.load();
Screen.init(app.stage);
Screen.addScreens({
    mainMenu: new MainMenu(),
    gameScreen: new GameScreen()
});
Input.startListener();

Screen.switch("mainMenu");
Screen.switch("gameScreen");

PIXI.Ticker.shared.maxFPS = 60;
PIXI.Ticker.shared.add(ts => {
    Screen.updateScreen();
});
