import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
import Player from "./Player.mjs";
import Asteroid from "./Asteroid.mjs";
import Asteroidbelt from "./Asteroidbelt.mjs";
import Input from "./Input.mjs";
import { gameSettings } from "./main.mjs";

class Playingfield extends PIXI.Container {
    #asteroidbelt = new Asteroidbelt();

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
                { texture: Assets.get("spaceman_0"), duration: Number.MAX_VALUE }
            ]
        },
        rotating: {
            loop: true, goto: "rotation", frames: [
                { texture: Assets.get("spaceman_0"), duration: 10 },
                { texture: Assets.get("spaceman_1"), duration: 10 },
                { texture: Assets.get("spaceman_2"), duration: 10 },
                { texture: Assets.get("spaceman_3"), duration: 10 },
                { texture: Assets.get("spaceman_4"), duration: 10 },
                { texture: Assets.get("spaceman_5"), duration: 10 },
                { texture: Assets.get("spaceman_6"), duration: 10 },
                { texture: Assets.get("spaceman_7"), duration: 10 },
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
        ass2.getLocalBounds();
        ass2.update();
        this.addChild(ass2);

        let ass3 = new Asteroid({
            static: {
                loop: true, goto: "static", frames: [
                    { texture: Assets.get("asteroid_0"), duration: Number.MAX_VALUE }
                ]
            }
        });
        ass3.xPos = 160;
        ass3.yPos = 23;
        ass3.pivot.set(42 / 2);
        ass3.getLocalBounds();
        ass3.update();

        let ass4 = new Asteroid({
            static: {
                loop: true, goto: "static", frames: [
                    { texture: Assets.get("asteroid_0"), duration: Number.MAX_VALUE }
                ]
            }
        });
        ass4.xPos = 122;
        ass4.yPos = 123;
        ass4.pivot.set(42 / 2);
        ass4.getLocalBounds();
        ass4.update();

        let ass5 = new Asteroid({
            static: {
                loop: true, goto: "static", frames: [
                    { texture: Assets.get("asteroid_0"), duration: Number.MAX_VALUE }
                ]
            }
        });
        ass5.xPos = 4;
        ass5.yPos = 90;
        ass5.pivot.set(42 / 2);
        ass5.getLocalBounds();
        ass5.update();



        this.#asteroid.xPos = 160 / 2;
        this.#asteroid.yPos = 4;
        this.#asteroid.pivot.set(42 / 2);
        this.#asteroid.getLocalBounds()
        this.#asteroid.update();

        this.#asteroidbelt.xPos = 0;
        this.#asteroidbelt.yPos = 0;

        this.#asteroidbelt.addChild(this.#asteroid);

       this.#asteroidbelt.addChild(ass2);
        this.#asteroidbelt.addChild(ass3);
        this.#asteroidbelt.addChild(ass4);
        this.#asteroidbelt.addChild(ass5);

        this.addChild(this.#asteroidbelt);
        console.log(this.#asteroidbelt.position)
        this.#player.xPos = 160 / 2;
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
            //skicka in nuvarande vinkel av gubben
            const touchdown = this.#asteroidbelt.move(this.#player._texture.textureCacheIds[0], Input.getInput("nuJump"),this.#player)
            //om den här finns så är det ett väderstreck som gubben ska roteras till
            if (touchdown) {
                console.log("recieved new rotation value", touchdown)
                let currentRotation = Number(this.#player._texture.textureCacheIds[0].charAt(this.#player._texture.textureCacheIds[0].length - 1))
                console.log("current rotation",currentRotation)
                this.#player.texture = Assets.get("spaceman_" + (currentRotation<4?currentRotation+4 : currentRotation-4).toString());
            }

            //efter ett varv av asteroider borde gubben flyttat sig från en asteroid
            Input.setInput("nuJump", false);

        } else if (Input.getInput("cw") || Input.getInput("ccw")) {
            //this.#asteroidbelt.relocationShift();
            //change texture
            //
            const change = Input.getInput("cw")
                ? Number(this.#player._texture.textureCacheIds[0].charAt(this.#player._texture.textureCacheIds[0].length - 1)) + 1
                : Number(this.#player._texture.textureCacheIds[0].charAt(this.#player._texture.textureCacheIds[0].length - 1)) - 1
            this.#player.texture = Assets.get("spaceman_".concat(change == 8 ? "0" : change == -1 ? "7" : change.toString()));
            Input.stop();
        }

    }
    getAsteroids() {
        return this.asteroids;
    }
}

export default Playingfield;
