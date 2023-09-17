import { Container } from "pixi.js";
import Assets from "./Assets.mjs";
import Player from "./Player.mjs";

class Playingfield extends Container {
    #player = new Player({
        static: {loop: true, goto: "static", frames: [
            {texture: Assets.get("spaceman_0"), duration: Number.MAX_VALUE}
        ]},
        rotating: {loop:true, goto:"rotating", frames: [
            {texture: Assets.get("spaceman_0"), duration: 10},
            {texture: Assets.get("spaceman_1"), duration: 10},
            {texture: Assets.get("spaceman_2"), duration: 10},
            {texture: Assets.get("spaceman_3"), duration: 10},
            {texture: Assets.get("spaceman_4"), duration: 10},
            {texture: Assets.get("spaceman_5"), duration: 10},
            {texture: Assets.get("spaceman_6"), duration: 10},
            {texture: Assets.get("spaceman_7"), duration: 10},
        ]}
    });

    constructor() {
        super();

        this.#player.xPos = 160 / 2;
        this.#player.yPos = 144 / 2;

        //sprite is 32 px, 16 is middle
        this.#player.pivot.set(16);

        //add player to field
        this.addChild(this.#player);

        this.#player.switchSpriteset("rotating");
    }

    update() {
        this.#player.update();
    }
}

export default Playingfield;
