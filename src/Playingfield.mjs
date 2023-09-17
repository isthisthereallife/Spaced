import * as PIXI from "pixi.js";
import Assets from "./Assets.mjs";
import Player from "./Player.mjs";
import Asteroid from "./Asteroid.mjs";

class Playingfield extends PIXI.Container {
    #player = new Player(Assets.get("spaceman_0"));
    #asteroid = new Asteroid(Assets.get("asteroid_0"));
    #asters = [];
    #asteroidSize = 16;
    constructor() {
        super();


        //add an asteroid
        this.#asteroid.xPos = 160 / 2;
        this.#asteroid.yPos = 4;
        this.#asteroid.pivot.set(45/2)

        const circle = new PIXI.Graphics();
        circle.beginFill(0xffffff);
        circle.drawCircle(this.#asteroid.xPos, this.#asteroid.yPos, this.#asteroidSize)
        circle.endFill();
        circle.getLocalBounds();
        console.log(
            circle.getLocalBounds()
        );
        //this.addChild(circle)

        this.#asters.push(this.#asteroid);
        console.log(this.#asteroid.getLocalBounds())
        this.addChild(this.#asteroid);


        this.#player.xPos = 160 / 2
        this.#player.yPos = 144 / 2;
        //sprite is 32 px, 16 is middle
        this.#player.pivot.set(16);

        //add player to field
        this.addChild(this.#player);
    }

    update() {
        
        this.#player.update();
        this.#asters.forEach((e) => {
            //console.log("varje aster",e) 
            e.update();
        });
    }
    getAsteroids() {
        return this.asteroids;
    }
}

export default Playingfield;
