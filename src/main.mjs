import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
import Starfield from "./Starfield.mjs";
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
    backgroundColor: 0x213555
});

document.body.appendChild(app.view);

await Assets.load();

const starfieldSpeed = -.1;
const starfields = [
    new Starfield(Assets.get("star_0"), 20),
    new Starfield(Assets.get("star_1"), 10),
    new Starfield(Assets.get("star_2"), 6),
    new Starfield(Assets.get("star_3"), 2)
];

for(let starfield of starfields) {
    app.stage.addChild(starfield);
}

const player = new PIXI.Sprite(Assets.get("spaceman"));
player.x = Math.round((160) / 2);
player.y = Math.round((144) / 2);
app.stage.addChild(player);
player.pivot.set(16);

let degrees = 0;
let degrees2 = 0;

PIXI.Ticker.shared.maxFPS = 60;
PIXI.Ticker.shared.add(ts => {

    degrees++;
    degrees2++;
    if(degrees == 360) degrees = 0;
    if(degrees2 == 90) degrees2 = -90;
    let radians = degrees * (Math.PI / 180);
    let radians2 = degrees2 * (Math.PI / 180);

    for(let i = 0; i < starfields.length; i++) {
        starfields[i].move(Math.cos(radians) + i * Math.cos(radians), Math.sin(radians) + i * Math.sin(radians));
    }
    player.rotation += .05;
    player.scale.set(.5 + Math.cos(radians2));
});

/*
const font = new FontFaceObserver("gameboyfont", {});
await font.load();

const text = new PIXI.Text("Hello", {
    fontFamily: "gameboyfont",
    fontSize: 16
});

app.stage.addChild(text);
*/
