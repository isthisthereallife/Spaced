import * as PIXI from "pixi.js"
import Player from "../Player.mjs";
import { gameSettings } from "../main.mjs"
import Assets from "../Assets.mjs";
import Asteroid from "../Asteroid.mjs";
import Input from "../Input.mjs";
import DanielInput from "../DanielInput.mjs";
import ParallaxLayers from "../ParallaxLayers.mjs";

class PlayScreen extends PIXI.Container {


    constructor() {
        super();

        this.asteroids = [];

        this.stars = new ParallaxLayers([
            {texture: Assets.get("star_0"), n: 20},
            {texture: Assets.get("star_1"), n: 10},
            {texture: Assets.get("star_2"), n: 6},
            {texture: Assets.get("star_3"), n: 2}
        ]);
        this.addChild(this.stars);

        this.player = new Player({
            spaceman_0: {
                loop: true, goto: "small_spaceman_0", frames: [
                    { texture: Assets.get("small_spaceman_0"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_1: {
                loop: true, goto: "small_spaceman_1", frames: [
                    { texture: Assets.get("small_spaceman_1"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_2: {
                loop: true, goto: "small_spaceman_2", frames: [
                    { texture: Assets.get("small_spaceman_2"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_3: {
                loop: true, goto: "small_spaceman_3", frames: [
                    { texture: Assets.get("small_spaceman_3"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_4: {
                loop: true, goto: "small_spaceman_4", frames: [
                    { texture: Assets.get("small_spaceman_4"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_5: {
                loop: true, goto: "small_spaceman_5", frames: [
                    { texture: Assets.get("small_spaceman_5"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_6: {
                loop: true, goto: "small_spaceman_6", frames: [
                    { texture: Assets.get("small_spaceman_6"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_7: {
                loop: true, goto: "small_spaceman_7", frames: [
                    { texture: Assets.get("small_spaceman_7"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_8: {
                loop: true, goto: "small_spaceman_8", frames: [
                    { texture: Assets.get("small_spaceman_8"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_9: {
                loop: true, goto: "small_spaceman_9", frames: [
                    { texture: Assets.get("small_spaceman_9"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_10: {
                loop: true, goto: "small_spaceman_10", frames: [
                    { texture: Assets.get("small_spaceman_10"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_11: {
                loop: true, goto: "small_spaceman_11", frames: [
                    { texture: Assets.get("small_spaceman_11"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_12: {
                loop: true, goto: "small_spaceman_12", frames: [
                    { texture: Assets.get("small_spaceman_12"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_13: {
                loop: true, goto: "small_spaceman_13", frames: [
                    { texture: Assets.get("small_spaceman_13"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            spaceman_14: {
                loop: true, goto: "small_spaceman_14", frames: [
                    { texture: Assets.get("small_spaceman_14"), duration: Number.MAX_SAFE_INTEGER }
                ]
            }
        });
        this.player.setCenterRotation(true);
        this.player.xPos = (gameSettings.width - this.player.width) / 2;
        this.player.yPos = (gameSettings.height - this.player.height) / 2;
        this.player.closestAsteroidAngle = 0;
        this.player.updatePosition();
        this.addChild(this.player)

        this.asteroid = new Asteroid({
            static: {
                loop: true, goto: "static", frames: [
                    { texture: Assets.get("asteroid_0"), duration: Number.MAX_SAFE_INTEGER }
                ]
            }
        });
        this.asteroid2 = new Asteroid({
            static: {
                loop: true, goto: "static", frames: [
                    { texture: Assets.get("asteroid_0"), duration: Number.MAX_SAFE_INTEGER }
                ]
            }
        });
        this.asteroids.push(this.asteroid2)

        this.asteroid.xPos = (gameSettings.width - this.asteroid.width) / 2;
        this.asteroid.yPos = this.player.y + this.player.height/2;
        this.asteroid.updatePosition();
        this.asteroids.push(this.asteroid);

        for (let asteroid of this.asteroids) {
            this.addChild(asteroid);
        }
    }

    update() {
        this.player.update()
        /*
        if (Input.getInput("left")){
            this.rotateTheUniverse(1)
            Input.stop()
        }
        if(Input.getInput("right")){
            this.rotateTheUniverse(-1)
            Input.stop()
        }
        */
        if(DanielInput.getKey("ArrowRight")) {
            this.rotateTheUniverse(0.05);
            this.stars.rotateAroundCenterNoParallax(0.05);
        }
        if(DanielInput.getKey("ArrowLeft")) {
            this.rotateTheUniverse(-0.05);
            this.stars.rotateAroundCenterNoParallax(-0.05);
        }
    }

    rotateTheUniverse(speed) {
        let distance = Number.MAX_SAFE_INTEGER;
        let angle;
        for (let asteroid of this.asteroids) {
            let angleToCenter = Math.atan2((asteroid.yPos + asteroid.height / 2) - (gameSettings.height / 2), (asteroid.xPos + asteroid.width / 2) - gameSettings.width / 2);
            let distanceToCenter = Math.sqrt(((asteroid.xPos + asteroid.width / 2) - (gameSettings.width / 2)) ** 2 + ((asteroid.yPos + asteroid.height / 2) - (gameSettings.height / 2)) ** 2);
            asteroid.xPos = ((gameSettings.width / 2) + Math.cos(angleToCenter + speed) * distanceToCenter) - asteroid.width / 2;
            asteroid.yPos = ((gameSettings.height / 2) + Math.sin(angleToCenter + speed) * distanceToCenter) - asteroid.height / 2; asteroid.updatePosition();
           if (distanceToCenter < distance) {
                distance = distanceToCenter;
                angle = angleToCenter * (180 / Math.PI) + (360/15/2);
                if(angle < 0) angle += 360;
            }
        }
        this.player.rot = angle;
    }

} export default PlayScreen;