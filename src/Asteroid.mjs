import GameObject from "./GameObject.mjs";
import Input from "./Input.mjs";

class Asteroid extends GameObject {
    constructor(texture) {
        super(texture);
    }


    update() {

        if (Input.getInput("ArrowUp") || Input.getInput("Semicolon")) {
            if (!this.collisionChecker()) {
                console.log("no collision")
                this.yPos += 1;
            }
        }
        else if (Input.getInput("ArrowDown") || Input.getInput("KeyO")) {
            if (!this.collisionChecker()) {
                console.log("no collision")
                this.yPos -= 1;
            }
        }

        // debugging, TODO remove
        if (Input.getInput("KeyR") || Input.getInput("KeyP")) {
            this.xPos = Math.round((160) / 2);
            this.yPos = Math.round((144) / 2);
        }
        super.update();
    }
    collisionChecker() {
        // om knapp är tryckt, och om inte är på rymdemannens position;
        //  fortsätt


        const boardwidth = 144;
        const boardheight = 160;
        const centerX = Math.round(boardwidth / 2);
        const centerY = Math.round(boardheight / 2);
        const spacemanRadie = 16;
        const asterRadie = this._localBoundsRect.height / 2;
        console.log("combined radii",Math.round(spacemanRadie + asterRadie))
        console.log("distance between centers: ", this.pythagorasForDistance(centerX, centerY, this.yPos, this.xPos))

        //om avståndet mellan punkterna är <= bådas radie så är det en träff
        if (this.pythagorasForDistance(centerX, centerY, this.yPos, this.xPos) <= Math.round(spacemanRadie + asterRadie) ) {
            Input.stop();
            console.log("yes we hit")
            return true
        }

    }
    pythagorasForDistance(centerX, centerY, asterX, asterY) {
        let xDist = Math.pow((centerX - asterX), 2);
        let yDist = Math.pow((centerY - asterY), 2);
        return Math.sqrt(xDist + yDist)
    }
}

export default Asteroid;
