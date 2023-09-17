import GameObject from "./GameObject.mjs";
import Input from "./Input.mjs";

class Asteroid extends GameObject {
    constructor(texture) {
        super(texture);
    }


    update(spaceman_X, nuJump) {

        //ingen collisioncheck på newjump
        if (!nuJump) {
            const rotateCharToThis = this.collisionChecker();
            if (rotateCharToThis) return rotateCharToThis;
        }


        if (Input.getInput("moving")) {

            //vilket håll asteroiden ska flytta sig är avhängt gubbens riktning
            switch (spaceman_X) {
                case "spaceman_N":
                    this.yPos += 1;
                    break;
                case "spaceman_S":
                    this.yPos -= 1;
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
                    newSpacemanAngle = "S";
                } else if (this.yPos - combinedRadii == centerX) {
                    newSpacemanAngle = "N";
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
