import * as PIXI from "pixi.js";
import * as Howler from 'howler';
import Player from "../Player.mjs";
import { gameSettings } from "../main.mjs"
import Assets from "../Assets.mjs";
import Asteroid from "../Asteroid.mjs";
import Input from "../Input.mjs";
import DanielInput from "../DanielInput.mjs";
import ParallaxLayers from "../ParallaxLayers.mjs";
import HitTest from "../HitTest.mjs";
import OxygenMeter from "../OxygenMeter.mjs";
import GameObject from "../GameObject.mjs";
import ScreenController from "../ScreenController.mjs";

class PlayScreen extends PIXI.Container {
    transitionComplete = false;

    init() {
        this.oxygenMeter.currentOxygen = this.oxygenMeter.maxOxygen;
        this.oxygenMeter.updateOxygenScale();
        this.transition.switchSpriteset("reveal");
    }

    constructor() {
        super();

        this.transition = new GameObject({
            reveal: {
                loop: false, callback: () => {
                    if (!this.transitionComplete) {
                        this.music.play();
                        this.walkingMusic.play();
                        this.transitionComplete = true;
                    }
                }, frames: [
                    { texture: Assets.get("transition", "transition_0"), duration: 2 },
                    { texture: Assets.get("transition", "transition_1"), duration: 2 },
                    { texture: Assets.get("transition", "transition_2"), duration: 2 },
                    { texture: Assets.get("transition", "transition_3"), duration: 2 },
                    { texture: Assets.get("transition", "transition_4"), duration: 2 },
                    { texture: Assets.get("transition", "transition_5"), duration: 2 },
                    { texture: Assets.get("transition", "transition_6"), duration: 2 },
                    { texture: Assets.get("transition", "transition_7"), duration: 2 },
                    { texture: Assets.get("transition", "transition_8"), duration: 2 },
                    { texture: Assets.get("transition", "transition_9"), duration: 2 },
                    { texture: Assets.get("transition", "transition_10"), duration: 2 },
                    { texture: Assets.get("transition", "transition_11"), duration: 2 },
                    { texture: Assets.get("transition", "transition_12"), duration: 2 }
                ]
            },
            conceal: {
                loop: false, callback: () => ScreenController.switch("loseScreen"), frames: [
                    { texture: Assets.get("transition", "transition_12"), duration: 2 },
                    { texture: Assets.get("transition", "transition_11"), duration: 2 },
                    { texture: Assets.get("transition", "transition_10"), duration: 2 },
                    { texture: Assets.get("transition", "transition_9"), duration: 2 },
                    { texture: Assets.get("transition", "transition_8"), duration: 2 },
                    { texture: Assets.get("transition", "transition_7"), duration: 2 },
                    { texture: Assets.get("transition", "transition_6"), duration: 2 },
                    { texture: Assets.get("transition", "transition_5"), duration: 2 },
                    { texture: Assets.get("transition", "transition_4"), duration: 2 },
                    { texture: Assets.get("transition", "transition_3"), duration: 2 },
                    { texture: Assets.get("transition", "transition_2"), duration: 2 },
                    { texture: Assets.get("transition", "transition_1"), duration: 2 },
                    { texture: Assets.get("transition", "transition_0"), duration: 2 }
                ]
            }
        });

        this.asteroids = [];
        this.music = new Howl({
            src: ['/res/audio/song2_c123.wav'],
            autoplay: false,
            loop: true,
            volume: 1
        });
        this.deathTwirl = new Howl({
            src: ['/res/audio/death_twirl.wav'],
            autoplay: false,
            loop: false,
            volume: 1
        });
        this.deathMusic = new Howl({
            src: ['/res/audio/deathComesForUsAll.wav'],
            autoplay: false,
            loop: true,
            volume: 1
        });
        this.walkingMusic = new Howl({
            src: ['/res/audio/song2_c4.wav'],
            autoplay: false,
            loop: true,
            volume: 1
        });
        this.jumpSound = new Howl({
            src: ['/res/audio/jump.wav'],
            volume: 1
        });
        this.touchdownSound = new Howl({
            src: ['res/audio/touchdown.wav']
        });
        this.walkingMusic.mute(true);

        this.stars = new ParallaxLayers([
            { texture: Assets.get("sheet", "star_0"), n: 20 },
            { texture: Assets.get("sheet", "star_1"), n: 10 },
            { texture: Assets.get("sheet", "star_2"), n: 6 },
            { texture: Assets.get("sheet", "star_3"), n: 2 }
        ]);
        this.addChild(this.stars);

        this.player = new Player({
            idle_right_0: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_0"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_1: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_4"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_2: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_8"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_3: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_12"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_4: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_16"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_5: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_20"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_6: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_24"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_7: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_28"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_8: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_32"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_9: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_36"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_10: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_40"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_11: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_44"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_12: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_48"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_13: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_52"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_14: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_56"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_right_15: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_60"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            walk_right_0: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_0"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_1"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_2"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_3"), duration: 5 }
                ]
            },
            walk_right_1: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_4"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_5"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_6"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_7"), duration: 5 }
                ]
            },
            walk_right_2: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_8"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_9"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_10"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_11"), duration: 5 }
                ]
            },
            walk_right_3: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_12"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_13"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_14"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_15"), duration: 5 }
                ]
            },
            walk_right_4: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_16"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_17"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_18"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_19"), duration: 5 }
                ]
            },
            walk_right_5: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_20"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_21"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_22"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_23"), duration: 5 }
                ]
            },
            walk_right_6: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_24"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_25"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_26"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_27"), duration: 5 }
                ]
            },
            walk_right_7: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_28"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_29"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_30"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_31"), duration: 5 }
                ]
            },
            walk_right_8: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_32"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_33"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_34"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_35"), duration: 5 }
                ]
            },
            walk_right_9: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_36"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_37"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_38"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_39"), duration: 5 }
                ]
            },
            walk_right_10: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_40"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_41"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_42"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_43"), duration: 5 }
                ]
            },
            walk_right_11: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_44"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_45"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_46"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_47"), duration: 5 }
                ]
            },
            walk_right_12: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_48"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_49"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_50"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_51"), duration: 5 }
                ]
            },
            walk_right_13: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_52"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_53"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_54"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_55"), duration: 5 }
                ]
            },
            walk_right_14: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_56"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_57"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_58"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_59"), duration: 5 }
                ]
            },
            walk_right_15: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_60"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_61"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_62"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_63"), duration: 5 }
                ]
            },
            idle_left_0: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_64"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_1: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_68"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_2: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_72"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_3: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_76"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_4: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_80"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_5: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_84"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_6: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_88"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_7: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_92"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_8: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_96"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_9: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_100"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_10: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_104"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_11: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_108"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_12: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_112"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_13: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_116"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_14: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_120"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            idle_left_15: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_124"), duration: Number.MAX_SAFE_INTEGER }
                ]
            },
            walk_left_0: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_64"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_65"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_66"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_67"), duration: 5 }
                ]
            },
            walk_left_1: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_68"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_69"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_70"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_71"), duration: 5 }
                ]
            },
            walk_left_2: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_72"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_73"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_74"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_75"), duration: 5 }
                ]
            },
            walk_left_3: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_76"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_77"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_78"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_79"), duration: 5 }
                ]
            },
            walk_left_4: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_80"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_81"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_82"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_83"), duration: 5 }
                ]
            },
            walk_left_5: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_84"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_85"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_86"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_87"), duration: 5 }
                ]
            },
            walk_left_6: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_88"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_89"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_90"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_91"), duration: 5 }
                ]
            },
            walk_left_7: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_92"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_93"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_94"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_95"), duration: 5 }
                ]
            },
            walk_left_8: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_96"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_97"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_98"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_99"), duration: 5 }
                ]
            },
            walk_left_9: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_100"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_101"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_102"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_103"), duration: 5 }
                ]
            },
            walk_left_10: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_104"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_105"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_106"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_107"), duration: 5 }
                ]
            },
            walk_left_11: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_108"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_109"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_110"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_111"), duration: 5 }
                ]
            },
            walk_left_12: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_112"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_113"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_114"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_115"), duration: 5 }
                ]
            },
            walk_left_13: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_116"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_117"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_118"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_119"), duration: 5 }
                ]
            },
            walk_left_14: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_120"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_121"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_122"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_123"), duration: 5 }
                ]
            },
            walk_left_15: {
                loop: true, frames: [
                    { texture: Assets.get("spaceman", "ssm_124"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_125"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_126"), duration: 5 },
                    { texture: Assets.get("spaceman", "ssm_127"), duration: 5 }
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
                frames: [
                    { texture: Assets.get("sheet", "asteroid_1"), duration: Number.MAX_SAFE_INTEGER }
                ]
            }
        });
        this.asteroid.xPos = (gameSettings.width - this.asteroid.width) / 2;
        this.asteroid.yPos = this.player.y + this.player.height / 2;
        this.asteroids.push(this.asteroid);
        this.playerAsteroid = this.asteroid;

        this.asteroid2 = new Asteroid({
            static: {
                frames: [
                    { texture: Assets.get("sheet", "asteroid_0"), duration: Number.MAX_SAFE_INTEGER }
                ]
            }
        });
        this.asteroids.push(this.asteroid2);
        this.asteroid2.xPos = -this.asteroid2.width / 2;
        this.asteroid2.yPos = -this.asteroid2.height / 2;

        for (let asteroid of this.asteroids) {
            asteroid.update();
            this.addChild(asteroid);
        }

        this.oxygenMeter = new OxygenMeter();
        this.addChild(this.oxygenMeter);

        this.addChild(this.transition);
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
        this.transition.update();

        if (this.transitionComplete) {
            this.oxygenMeter.decrementOxygen(0.1); // 0.02

            if (this.oxygenMeter.currentOxygen == 0) {
                this.music.stop();
                this.walkingMusic.stop();
                this.deathTwirl.play();
                this.deathTwirl.on("end", () => this.deathMusic.play());

                this.transitionComplete = false;
                this.transition.switchSpriteset("conceal");
            }

            if (this.player.grounded) {
                if (!DanielInput.getDown("ArrowRight") && !DanielInput.getDown("ArrowLeft")) {
                    this.player.currentSpritesetID = `idle_${this.player.last_direction}`;
                }
                if (DanielInput.getDown("ArrowRight") && DanielInput.getDown("ArrowLeft")) {
                    this.player.currentSpritesetID = `idle_${this.player.last_direction}`;
                } else {
                    if (DanielInput.getDown("ArrowRight")) {
                        this.walkingMusic.mute(false)

                        this.rotateTheUniverse(0.025 / (this.playerAsteroid.collider.r / 20));
                        this.player.currentSpritesetID = "walk_right"
                        this.player.last_direction = "right";
                    }

                    else if (DanielInput.getDown("ArrowLeft")) {
                        this.walkingMusic.mute(false);

                        this.rotateTheUniverse(-(0.025 / (this.playerAsteroid.collider.r / 20)));
                        this.player.currentSpritesetID = "walk_left"
                        this.player.last_direction = "left";
                    } else {
                        this.walkingMusic.mute(true);
                    }
                }
                if (DanielInput.getClick("z")) {
                    this.walkingMusic.mute(true);
                    this.jumpSound.play()

                    for (let asteroid of this.asteroids) {
                        asteroid.move(this.player.rot, 1);
                    }
                    this.player.grounded = false;
                }
            } else {
                this.player.currentSpritesetID = `idle_${this.player.last_direction}`;
                for (let asteroid of this.asteroids) {
                    asteroid.move(this.player.rot, 0.8);
                    this.stars.move(this.player.rot, 0.040);
                    if (HitTest.circle(this.player.collider, asteroid.collider)) {
                        this.player.grounded = true;
                        this.playerAsteroid = asteroid;
                        let relativeDistance = {
                            x: (this.playerAsteroid.xPos + this.playerAsteroid.width / 2) - 160 / 2,
                            y: (this.playerAsteroid.yPos + this.playerAsteroid.height / 2) - 144 / 2
                        }
                        let relativeAngle = Math.atan2(relativeDistance.y, relativeDistance.x);
                        this.player.rot = ((relativeAngle + Math.PI) * (180 / Math.PI) + 180) % 360;
                        let distance = Math.sqrt(relativeDistance.x * relativeDistance.x + relativeDistance.y * relativeDistance.y);
                        let direction = {
                            x: relativeDistance.x / distance,
                            y: relativeDistance.y / distance
                        }
                        let displacement = {
                            x: direction.x * (this.player.collider.r + this.playerAsteroid.collider.r - distance + .1),
                            y: direction.y * (this.player.collider.r + this.playerAsteroid.collider.r - distance + .1)
                        }
                        for (let asteroid of this.asteroids) {
                            asteroid.xPos += displacement.x;
                            asteroid.yPos += displacement.y;
                        }
                    }
                }
            }

            for (let asteroid of this.asteroids) asteroid.update();
            this.player.update();
        }
    }

    rotateTheUniverse(speed) {
        let relativeDistance = {
            x: (this.playerAsteroid.xPos + this.playerAsteroid.width / 2) - 160 / 2,
            y: (this.playerAsteroid.yPos + this.playerAsteroid.height / 2) - 144 / 2
        }
        let relativeAngle = Math.atan2(relativeDistance.y, relativeDistance.x);
        let distanceToCenter = Math.sqrt(relativeDistance.x ** 2 + relativeDistance.y ** 2);

        for (let asteroid of this.asteroids) {
            asteroid.xPos = (asteroid.xPos + asteroid.width / 2 - relativeDistance.x) + Math.cos(relativeAngle + (speed)) * distanceToCenter - asteroid.width / 2;
            asteroid.yPos = (asteroid.yPos + asteroid.height / 2 - relativeDistance.y) + Math.sin(relativeAngle + (speed)) * distanceToCenter - asteroid.height / 2;
            asteroid.updatePosition();
        }

        this.stars.rotateInRelation(relativeDistance, relativeAngle, distanceToCenter, speed);

        this.player.rot = ((relativeAngle + Math.PI) * (180 / Math.PI) + 180) % 360;
    }

} export default PlayScreen;