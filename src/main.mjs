import * as PIXI from "pixi.js";
console.log("pixi version:", PIXI.VERSION);

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

const font = new FontFaceObserver("gameboyfont", {});
await font.load();

const text = new PIXI.Text("Hello", {
    fontFamily: "gameboyfont",
    fontSize: 8
});

app.stage.addChild(text);
