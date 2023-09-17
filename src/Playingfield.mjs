import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
import Player from "./Player.mjs";
import Asteroid from "./Asteroid.mjs";
import Input from "./Input.mjs";

class Playingfield extends PIXI.Container {
    #asteroid = new Asteroid({
        static: {
            loop: true, goto: "static", frames: [
                { texture: Assets.get("asteroid_0"), duration: Number.MAX_VALUE }
            ]
        }
    });

    #asters = [];
    #player = new Player({
        static: {
            loop: true, goto: "static", frames: [
                { texture: Assets.get("spaceman_N"), duration: Number.MAX_VALUE }
            ]
        },
        rotating: {
            loop: true, goto: "rotation", frames: [
                { texture: Assets.get("spaceman_N"), duration: 10 },
                { texture: Assets.get("spaceman_NW"), duration: 10 },
                { texture: Assets.get("spaceman_W"), duration: 10 },
                { texture: Assets.get("spaceman_SW"), duration: 10 },
                { texture: Assets.get("spaceman_S"), duration: 10 },
                { texture: Assets.get("spaceman_SE"), duration: 10 },
                { texture: Assets.get("spaceman_E"), duration: 10 },
                { texture: Assets.get("spaceman_NE"), duration: 10 },
            ]
        }
    });

    constructor() {
        super();

        let ass2 = new Asteroid({
            static: {
                loop: true, goto: "static", frames: [
                    { texture: Assets.get("asteroid_0"), duration: Number.MAX_VALUE }
                ]
            }
        });
        ass2.xPos = 160 / 2;
        ass2.yPos = 144;
        ass2.pivot.set(42 / 2);
        //add an asteroid
        this.#asteroid.xPos = 160 / 2;
        this.#asteroid.yPos = 4;
        this.#asteroid.pivot.set(42 / 2);

        this.#asters.push(ass2);
        ass2.getLocalBounds()
        this.addChild(ass2);

        this.#asters.push(this.#asteroid);
        this.#asteroid.getLocalBounds()
        this.addChild(this.#asteroid);



        this.#player.xPos = 160 / 2
        this.#player.yPos = 144 / 2;
        //sprite is 32 px, 16 is middle
        this.#player.pivot.set(16);

        //add player to field
        this.addChild(this.#player);

        this.#player.switchSpriteset("rotating");
        this.#player.update();
    }


    update() {
        //behöver bara flytta asteroider om vi är i rörelse
        if (Input.getInput("moving")) {
            this.#asters.forEach((e) => {
                //skicka in nuvarande vinkel av gubben
                const rotateChar = e.update(this.#player._texture.textureCacheIds[0], Input.getInput("nuJump"))

                //om den här finns så är det ett väderstreck som gubben ska roteras till
                if (rotateChar) {
                    console.log("recieved new rotation value", rotateChar)
                    this.#player.texture = Assets.get("spaceman_" + rotateChar);
                }
            });
            //efter ett varv av asteroider borde gubben flyttat sig från en asteroid
            Input.setInput("nuJump", false);
        }

    }
    getAsteroids() {
        return this.asteroids;
    }
}

export default Playingfield;
