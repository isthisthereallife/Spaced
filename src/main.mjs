import * as PIXI from "pixi.js";

console.log("pixi version:", PIXI.VERSION);

const gameSettings = {
    width: 160,
    height: 144,
}

const app = new PIXI.Application({ 
    width: gameSettings.width, 
    height: gameSettings.height,
    resolution: window.innerHeight*0.6/gameSettings.height
});

document.body.appendChild(app.view);



