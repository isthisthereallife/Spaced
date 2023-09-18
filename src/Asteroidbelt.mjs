import * as PIXI from "pixi.js"
import Input from "./Input.mjs";

import Asteroid from "./Asteroid.mjs";

class Asteroidfield extends PIXI.Container {
    constructor() {
        super();
    }

    move(spaceman_X, newJump,p) {
        
        //ingen collisioncheck på newjump
        if (!newJump) {
            for (let asteroid of this.children) {
                
                const rotateCharToThis = asteroid.collisionChecker(asteroid,p);
                if (rotateCharToThis) return rotateCharToThis;
            }
        }
        if (Input.getInput("moving")) {
            //vilket håll asteroiden ska flytta sig är avhängt gubbens riktning
            // skärmjäveln ju är inte kvadratisk, så 0.5 0.5 stämmer inte
            // TODO lös detta
            switch (spaceman_X) {
                case "spaceman_0":
                    this.yPos += 1;
                    break;
                case "spaceman_1":
                    this.yPos += 0.5;
                    this.xPos += 0.5;
                    break;
                case "spaceman_2":
                    this.xPos += 1;
                    break;
                case "spaceman_3":
                    this.yPos -= 0.5;
                    this.xPos += 0.5;
                case "spaceman_4":
                    this.yPos -= 1;
                    break;
                case "spaceman_5":
                    this.yPos -= 0.5;
                    this.xPos -= 0.5;
                    break;
                case "spaceman_6":
                    this.xPos -= 1;
                    break;
                case "spaceman_7":
                    this.yPos += 0.5;
                    this.xPos -= 0.5;
                    break;
                default:
                    break;
            }
        }
        this.y = this.yPos;
        this.x = this.xPos;

    }

    relocationShift(spaceman_X) {
        if (Input.getInput("cw")) {
            console.log("heyeo")
            //Asteroidernas förflyttning är avhängt astronautens position
            // och är olika för varje position
            // TODO lös det
            this.yPos += 10;
            this.xPos -= 28;
        }
    }



} export default Asteroidfield;