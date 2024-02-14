import { Application, BaseTexture, Ticker, VERSION, SCALE_MODES } from "pixi.js";
import Assets from "./Assets.mjs";
import ScreenController from "./ScreenController.mjs";
import * as Howler from "howler"
import MainMenu from "./screens/MainMenu.mjs";
import DanielInput from "./DanielInput.mjs";
import LoseScreen from "./screens/LoseScreen.mjs";
import WinScreen from "./screens/WinScreen.mjs";

console.log("pixi version:", VERSION);

BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

export const gameSettings = {
    width: 160,
    height: 144,
    touch: false
};
export const sounds = {
    music: new Howl({
        src: ['./res/audio/song2_c123.wav'],
        autoplay: false,
        loop: true,
        volume: 1
    }),
    victoryMusic: new Howl({
        src: ['./res/audio/fly2m00n_v3.wav'],
        autoplay: false,
        loop: true,
        volume: 1
    }),
    deathTwirl: new Howl({
        src: ['./res/audio/death_twirl.wav'],
        autoplay: false,
        loop: false,
        volume: 0.7
    }),
    deathMusic: new Howl({
        src: ['./res/audio/deathComesForUsAll.wav'],
        autoplay: false,
        loop: true,
        volume: 0.7
    }),
    walkingMusic: new Howl({
        src: ['./res/audio/song2_c4.wav'],
        autoplay: false,
        loop: true,
        volume: 0.4
    }),
    jumpSound: new Howl({
        src: ['./res/audio/jump.wav'],
        volume: 1
    }),
    collisionSound: new Howl({
        src: ['./res/audio/landing.wav'],
        autoplay: false,
        loop: false,
        volume: 1
    })
}

const app = new Application({
    width: gameSettings.width,
    height: gameSettings.height,
    resolution: Math.round((window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight) * 0.6 / gameSettings.height),
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
DanielInput.init();

ScreenController.switch("mainMenu");

Ticker.shared.maxFPS = 60;
Ticker.shared.add(ts => {
    ScreenController.updateScreen();
});
