import GameObject from "./GameObject.mjs";
import Input from "./Input.mjs";

class Asteroid extends GameObject {
    constructor(texture) {
        super(texture);
    }


    update(spaceman_X,nuJump) {

        //fuck collisioncheck på newjump
        if(!nuJump){
        const rotateCharToThis = this.collisionChecker();
        if (rotateCharToThis) return rotateCharToThis;
        }


        if (Input.getInput("moving")) {
            console.log("moving?", Input.getInput("moving"))

            //vilket håll asteroiden ska flytta sig är avhängt gubbens riktning
            switch (spaceman_X) {
                case "spaceman_N":
                    this.yPos += 1;
                    console.log("newpos: ", this.yPos)
                    break;
                case "spaceman_S":
                    console.log("newpos: ", this.yPos)
                    this.yPos -= 1;
                    break;
                default:
                    break;
            }
        }
        super.update();
    }
    collisionChecker() {
        console.log(this)
        const boardwidth = 144;
        const boardheight = 160;
        const centerX = Math.round(boardwidth / 2);
        const centerY = Math.round(boardheight / 2);
        const spacemanRadie = 16;
        const asterRadie = this._localBoundsRect.height / 2;
        let newSpacemanAngle = false;
        //console.log("combined radii", Math.round(spacemanRadie + asterRadie))
        //console.log("distance between centers: ", this.pythagorasForDistance(centerX, centerY, this.yPos, this.xPos))
        //om avståndet mellan punkterna är <= bådas radie så är det en träff
        if (this.pythagorasForDistance(centerX, centerY, this.yPos, this.xPos) <= Math.round(spacemanRadie + asterRadie)) {

            if (Input.getInput("moving")) {
                Input.stop();
                console.log("##¤¤¤¤¤### IS MOVING, JUST HIT SOMETHING ###¤¤¤¤¤##")

                // TODO kolla var träffen skett, returnera ett väderstreck
                newSpacemanAngle = "S";
            }
            else {
                console.log("DETTA BORDE ALDRIG SKRIVAS UT EFTERSOM DÅ HAR 2 ASTEROIDER KROCKAT MED GUBBEN ");
                // Input.start();
                return false;
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
