import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
import Input from "./Input.mjs";
import Screen from "./Screen.mjs";
import MainMenu from "./screens/MainMenu.mjs";
import PlayScreen from "./screens/PlayScreen.mjs";
import DanielInput from "./DanielInput.mjs";

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
    spaceman: "res/spaceman_spritesheet.json"
});
Screen.init(app.stage);
Screen.addScreens({
    mainMenu: new MainMenu(),
    playScreen: new PlayScreen()
});
Input.startListener();
DanielInput.init();

Screen.switch("mainMenu");
Screen.switch("playScreen");


PIXI.Ticker.shared.maxFPS = 60;
PIXI.Ticker.shared.add(ts => {
    Screen.updateScreen();
});
