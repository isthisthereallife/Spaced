import GameObject from "./GameObject.mjs";
import Input from "./Input.mjs";

class Asteroid extends GameObject {
    collider;

    constructor(spriteset) {
        super(spriteset);

        this.collider = {
            x: this.x + this.width/2,
            y: this.y + this.height/2,
            r: 20
        }
    }

    update() {
        this.collider.x = this.x + this.width/2;
        this.collider.y = this.y + this.height/2;
        super.update();
    }

    /*

    relocateAsteroidFunction(spaceman_X) {
        if (Input.getInput("cw")) {
            //Asteroidernas förflyttning är avhängt astronautens position
            // och det är olika för varje position
            // TODO lös det
            this.yPos += 10;
            this.xPos -= 28;
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
            // skärmjäveln ju är inte kvadratisk, så 0.5 0.5 stämmer inte
            // TODO lös detta
            switch (spaceman_X) {
                case "spaceman_0":
                    this.yPos += 1;
                    break;
                case "spaceman_1":
                    this.yPos += 0.5;
                    this.xPos += 0.45;
                    break;
                case "spaceman_2":
                    this.xPos += 1;
                    break;
                case "spaceman_3":
                    this.yPos -= 0.5;
                    this.xPos += 0.45;
                case "spaceman_4":
                    this.yPos -= 1;
                    break;
                case "spaceman_5":
                    this.yPos -= 0.5;
                    this.xPos -= 0.45;
                    break;
                case "spaceman_6":
                    this.xPos -= 1;
                    break;
                case "spaceman_7":
                    this.yPos += 0.5;
                    this.xPos -= 0.45;
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

    */
}

export default Asteroid;
