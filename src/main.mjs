import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
console.log("pixi version:", PIXI.VERSION);

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;
// PIXI.Text.defaultAutoResolution = false;
// PIXI.Text.defaultResolution = 1;

const gameSettings = {
    width: 160,
    height: 144
};

const app = new PIXI.Application({ 
    width: gameSettings.width,
    height: gameSettings.height,
    resolution: window.innerHeight*0.6/gameSettings.height,
    backgroundColor: 0xffffff
});

document.body.appendChild(app.view);

await Assets.load();

const sprite = new PIXI.Sprite(Assets.get("asteroid"));
app.stage.addChild(sprite);

const font = new FontFaceObserver("gameboyfont", {});
await font.load();

const text = new PIXI.Text("Hello", {
    fontFamily: "gameboyfont",
    fontSize: 16
});

app.stage.addChild(text);
