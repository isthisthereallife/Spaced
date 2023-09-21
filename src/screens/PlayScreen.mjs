import * as PIXI from "pixi.js"
import Player from "../Player.mjs";
import { gameSettings } from "../main.mjs"
import Assets from "../Assets.mjs";
import Asteroid from "../Asteroid.mjs";
import Input from "../Input.mjs";
import DanielInput from "../DanielInput.mjs";
import ParallaxLayers from "../ParallaxLayers.mjs";
import HitTest from "../HitTest.mjs";

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
        this.player.updatePosition();
        this.addChild(this.player);

        this.asteroid = new Asteroid({
            static: {
                loop: true, goto: "static", frames: [
                    { texture: Assets.get("asteroid_0"), duration: Number.MAX_SAFE_INTEGER }
                ]
            }
        });
        this.asteroid.xPos = (gameSettings.width - this.asteroid.width) / 2;
        this.asteroid.yPos = this.player.y + this.player.height/2;
        this.asteroid.updatePosition();
        this.asteroids.push(this.asteroid);
        this.addChild(this.asteroid);
        this.playerAsteroid = this.asteroid;

        this.asteroid2 = new Asteroid({
            static: {
                loop: true, goto: "static", frames: [
                    { texture: Assets.get("asteroid_0"), duration: Number.MAX_SAFE_INTEGER }
                ]
            }
        });
        this.asteroids.push(this.asteroid2);
        this.addChild(this.asteroid2);
    }

    update() {
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
        if(this.player.grounded) {
            if(DanielInput.getKey("ArrowRight")) {
                this.rotateTheUniverse(0.025);
            }
            if(DanielInput.getKey("ArrowLeft")) {
                this.rotateTheUniverse(-0.025);
            }
            if(DanielInput.getKey("ArrowUp")) {
                this.player.grounded = false;
            }
        } else {
            for(let asteroid of this.asteroids) {
                asteroid.move(this.player.rot, 0.35);
                this.stars.move(this.player.rot, 0.040);
                if(HitTest.circle(this.player.collider, asteroid.collider)) {
                    this.player.grounded = true;
                    this.playerAsteroid = asteroid;
                    let relativeDistance = {
                        x: (this.playerAsteroid.xPos + this.playerAsteroid.width/2) - 160/2,
                        y: (this.playerAsteroid.yPos + this.playerAsteroid.height/2) - 144/2
                    }
                    let relativeAngle = Math.atan2(relativeDistance.y, relativeDistance.x);
                    this.player.rot = ((relativeAngle + Math.PI) * (180/Math.PI) + 180)%360;
                }
            }
        }

        for(let asteroid of this.asteroids) asteroid.update();
        this.player.update();
    }

    rotateTheUniverse(speed) {
        let relativeDistance = {
            x: (this.playerAsteroid.xPos + this.playerAsteroid.width/2) - 160/2,
            y: (this.playerAsteroid.yPos + this.playerAsteroid.height/2) - 144/2
        }
        let relativeAngle = Math.atan2(relativeDistance.y, relativeDistance.x);
        let distanceToCenter = Math.sqrt(relativeDistance.x** 2 + relativeDistance.y**2);

        console.log(relativeDistance);
        console.log(relativeAngle);

        for (let asteroid of this.asteroids) {
            asteroid.xPos = (asteroid.xPos + asteroid.width/2 - relativeDistance.x) + Math.cos(relativeAngle + (speed)) * distanceToCenter - asteroid.width/2;
            asteroid.yPos = (asteroid.yPos + asteroid.height/2 - relativeDistance.y) + Math.sin(relativeAngle + (speed)) * distanceToCenter - asteroid.height/2;
            asteroid.updatePosition();
        }

        this.stars.rotateInRelation(relativeDistance, relativeAngle, distanceToCenter, speed);

        this.player.rot = ((relativeAngle + Math.PI) * (180/Math.PI) + 180)%360;
    }

} export default PlayScreen;