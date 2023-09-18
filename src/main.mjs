import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
import Playingfield from "./Playingfield.mjs"
import Input from "./Input.mjs";
import ParallaxLayers from "./ParallaxLayers.mjs";

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
Input.startListener();

const parallaxLayers = new ParallaxLayers([
    {texture: Assets.get("star_0"), n: 20},
    {texture: Assets.get("star_1"), n: 10},
    {texture: Assets.get("star_2"), n: 6},
    {texture: Assets.get("star_3"), n: 2}
]);
app.stage.addChild(parallaxLayers);

// add playingfield to stage
const playingfield = new Playingfield();
app.stage.addChild(playingfield);

let angle = 0;
PIXI.Ticker.shared.maxFPS = 60;
PIXI.Ticker.shared.add(ts => {
    if(angle < 359) angle += 2;
    else angle = 0;
    parallaxLayers.rotateAroundCenter(.005);
    playingfield.update();
});
