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
                { texture: Assets.get("spaceman_6"), duration: 10 },
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
        this.#asters.push(ass2);
        this.addChild(ass2);

        let ass3 = new Asteroid({
            static: {
                loop: true, goto: "static", frames: [
                    { texture: Assets.get("asteroid_0"), duration: Number.MAX_VALUE }
                ]
            }
        });
        ass3.xPos = 12;
        ass3.yPos = 23;
        ass3.pivot.set(42 / 2);
        ass3.getLocalBounds();
        ass3.update();
        this.#asters.push(ass3);
        this.addChild(ass3);


        this.#asteroid.xPos = 160 / 2;
        this.#asteroid.yPos = 4;
        this.#asteroid.pivot.set(42 / 2);
        this.#asteroid.getLocalBounds()
        this.#asteroid.update();
        this.#asters.push(this.#asteroid);
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
                const rotateChar = e.jumpFunction(this.#player._texture.textureCacheIds[0], Input.getInput("nuJump"))

                //om den här finns så är det ett väderstreck som gubben ska roteras till
                if (rotateChar) {
                    console.log("recieved new rotation value", rotateChar)
                    this.#player.texture = Assets.get("spaceman_" + rotateChar);
                }
            });
            //efter ett varv av asteroider borde gubben flyttat sig från en asteroid
            Input.setInput("nuJump", false);

        } else if (Input.getInput("cw") || Input.getInput("ccw")) {
            this.#asters.forEach((e) => {
                e.relocateAsteroidFunction();
            });
            //change texture
            //
            const change = Input.getInput("cw")
                ? Number(this.#player._texture.textureCacheIds[0].charAt(this.#player._texture.textureCacheIds[0].length - 1)) + 1
                : Number(this.#player._texture.textureCacheIds[0].charAt(this.#player._texture.textureCacheIds[0].length - 1)) - 1
            this.#player.texture = Assets.get("spaceman_".concat(change == 8 ? "0" : change == -1 ? "7" : change.toString()));
            Input.unsetRelocation();
        }



    }
}

export default Playingfield;
