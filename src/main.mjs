import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
import Starfield from "./Starfield.mjs";
import Playingfield from "./Playingfield.mjs"
import Input from "./Input.mjs";

console.log("pixi version:", PIXI.VERSION);

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

const gameSettings = {
    width: 160,
    height: 144
};

const app = new PIXI.Application({
    width: gameSettings.width,
    height: gameSettings.height,
    resolution: window.innerHeight * 0.6 / gameSettings.height,
    backgroundColor: 0x213555
});

document.body.appendChild(app.view);

await Assets.load();
Input.startListener();

const starfieldSpeed = -.1;
const starfields = [
    new Starfield(Assets.get("star_0"), 20),
    new Starfield(Assets.get("star_1"), 10),
    new Starfield(Assets.get("star_2"), 6),
    new Starfield(Assets.get("star_3"), 2)
];

for (let starfield of starfields) {
    app.stage.addChild(starfield);
}

// add playingfield to stage
const playingfield = new Playingfield();
app.stage.addChild(playingfield);

let degrees = 0;
PIXI.Ticker.shared.maxFPS = 60;
PIXI.Ticker.shared.add(ts => {
    degrees++;
    if (degrees == 360) degrees = 0;
    let radians = degrees * (Math.PI / 180);

    for (let i = 0; i < starfields.length; i++) {
       // TODO uncomment
         starfields[i].move(Math.cos(radians) + i * Math.cos(radians), Math.sin(radians) + i * Math.sin(radians));
    }
    //console.log(playingfield.getAsteroids())
    playingfield.update();
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
