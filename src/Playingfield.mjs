import { Container } from "pixi.js";
import Assets from "./Assets.mjs";
import GameObject from "./GameObject.mjs";
import Player from "./Player.mjs";

class Playingfield extends Container {

    #player = new Player(Assets.get("spaceman_0"));

    constructor() {
        super();
        console.log("oooh")
        this.#player.xPos = 160 / 2;
        this.#player.yPos = 144 / 2;

        //sprite is 32 px, 16 is middle
        this.#player.pivot.set(16);

        //add player to field
        this.addChild(this.#player);
    }

    update() {
        this.#player.update();
    }


} export default Playingfield;