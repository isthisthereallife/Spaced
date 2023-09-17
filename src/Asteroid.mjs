import GameObject from "./GameObject.mjs";
import Input from "./Input.mjs";

class Asteroid extends GameObject {
    constructor(texture) {
        super(texture);
    }

    relocateAsteroidFunction(spaceman_X) {
        console.log("want to relocate")
        if (Input.getInput("cw")) {
            //flytta asteroid neråt och åt vänster (sänk y, öka x)
            this.yPos -= 10;
            this.xPos += 20;
            console.log("flyttat")
        }
        super.update();
    }

    jumpFunction(spaceman_X, nuJump) {

        //ingen collisioncheck på newjump
        if (!nuJump) {
            const rotateCharToThis = this.collisionChecker();
            if (rotateCharToThis) return rotateCharToThis;
        }


        if (Input.getInput("moving")) {

            //vilket håll asteroiden ska flytta sig är avhängt gubbens riktning
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
                    this.xPos += 0.5;
                    this.yPos -= 0.5;
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
                    this.xPos -= 0.5;
                    this.yPos += 0.5;
                    break;
                default:
                    break;
            }
        }
        super.update();
    }



    collisionChecker() {

        const boardwidth = 144;
        const boardheight = 160;
        const centerX = Math.round(boardwidth / 2);
        const centerY = Math.round(boardheight / 2);
        const spacemanRadie = 16;
        const asterRadie = this._localBoundsRect.height / 2;
        const combinedRadii = spacemanRadie + asterRadie;
        let newSpacemanAngle = false;

        //om avståndet mellan punkterna är <= bådas radie så är det en träff
        if (this.pythagorasForDistance(centerX, centerY, this.yPos, this.xPos) <= Math.round(combinedRadii)) {
            if (Input.getInput("moving")) {
                Input.stop();
                console.log("###¤¤¤### VI HAR LANDAT ###¤¤¤###")

                // TODO kolla var träffen skett, returnera ett väderstreck

                //hit from above
                if (this.yPos + combinedRadii == centerX) {
                    newSpacemanAngle = "4";
                } else if (this.yPos - combinedRadii == centerX) {
                    newSpacemanAngle = "0";
                }
            }

            return newSpacemanAngle
        }
        return false;

    }
    pythagorasForDistance(centerX, centerY, asterX, asterY) {
        let xDist = Math.pow((centerX - asterX), 2);
        let yDist = Math.pow((centerY - asterY), 2);
        return Math.sqrt(xDist + yDist)
    }
}

export default Asteroid;
