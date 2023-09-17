import GameObject from "./GameObject.mjs";
import Input from "./Input.mjs";

class Asteroid extends GameObject {
    constructor(texture) {
        super(texture);
    }


    update() {




        // Check if asteroid hits the center pixel
        // TODO räkna in storleken på rymdgubben

        if (Input.getInput("ArrowUp") || Input.getInput("Semicolon")) {
            if (!this.collisionChecker(1)) {
                console.log("no collision")
                this.yPos += 1;
            }
        }
        else if (Input.getInput("ArrowDown") || Input.getInput("KeyO")) {
            if (!this.collisionChecker(-1)) {
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
    collisionChecker(variable) {
        // om knapp är tryckt, och om inte är på rymdemannens position;
        //  fortsätt


        const boardwidth = 144;
        const boardheight = 160;
        const bottomEdge = Math.round(this.yPos + (this._localBoundsRect.height / 2))
        const topEdge = Math.round(this.yPos - (this._localBoundsRect.height / 2))
        const leftEdge = Math.round(this.xPos + (this._localBoundsRect.width / 2))
        const rightEdge = Math.round(this.xPos - (this._localBoundsRect.width / 2))
        console.log("center",160/2)
        console.log("thisYpos", this.yPos)
        console.log("bottomEdge", bottomEdge)
        console.log("topEdge", topEdge)
        console.log("leftEdge", leftEdge)
        console.log("rightEdge", rightEdge)


        if (Math.round((boardheight) / 2) <= bottomEdge+variable && Math.round((boardheight) >= topEdge+variable)
            && Math.round((boardwidth) / 2 <= leftEdge +variable && Math.round((boardwidth) >= rightEdge+variable))
        ) {

            // TODO lista ut vad vi ska göra när det hänt
            console.log("EN TRÄFFFFFF!!!")
            Input.stop();
        }
    }
}

export default Asteroid;
