import GameObject from "./GameObject.mjs";
import Input from "./Input.mjs";
import * as PIXI from "pixi.js"

class Asteroid extends GameObject {
    constructor(texture) {
        super(texture);
    }

    

    collisionChecker(asteroid, p) {
        // TODO 
        // asteroid byter inte plats längre
        // asteroid.parent byter dock plats
        // men asteroid.parent är skewed

        // kolla dess globala position mot players globala position kanske
        
        //console.log(p._texture._frame.width / 2)
        //console.log("player globY", p.toGlobal(new PIXI.Point()).y)
        const centerY = p.toGlobal(new PIXI.Point()).y;
        const centerX = p.toGlobal(new PIXI.Point()).x;
        const asteroidGlobalY = asteroid.toGlobal(new PIXI.Point()).y;
        const asteroidGlobalX = asteroid.toGlobal(new PIXI.Point()).x;
        const combinedRadii = p._texture._frame.width / 2 + asteroid._localBoundsRect.height / 2;
        //console.log(asteroid)
        console.log("combinedRadii", combinedRadii);
        console.log("centerY", centerY)
        console.log("player top Y", centerY - p._texture._frame.width / 2)
        console.log("asteroid bottom Y", asteroidGlobalY + asteroid._localBoundsRect.height/2 )
        //console.log("cX", centerX)
        //console.log("inBelt y", asteroid.y)
        //console.log("inBelt x", asteroid.x)
        console.log("asteroid.globalY", asteroid.toGlobal(new PIXI.Point()).y)
        //console.log("asteroid.globalX",asteroid.toGlobal(new PIXI.Point()).x)
        console.log("diff", this.pythagorasForDistance(centerX, centerY, asteroidGlobalX, asteroidGlobalY) - Math.round(combinedRadii))

        //om avståndet mellan punkterna är <= bådas radie så är det en träff
        if (this.pythagorasForDistance(centerX, centerY, asteroidGlobalX, asteroidGlobalY) <= Math.round(combinedRadii)) {
             console.log("###¤¤¤### VI HAR LANDAT ###¤¤¤###")
                console.log("asteroid.globalY", asteroidGlobalY)
                console.log("asteroid.globalX", asteroidGlobalX)
                //rotera och sätt positionen rätt, just in case
            //p.yPos=asteroidGlobalY + asteroid._localBoundsRect.height/2;
            Input.stop();
            return true;


            if (Input.getInput("moving")) {
                Input.stop();
               
                console.log("combinedRadii", combinedRadii);
                console.log("centerY", centerY)
                console.log(asteroid)
                // TODO kolla var träffen skett, returnera ett väderstreck

                //hit from above
                if (asteroidGlobalY + combinedRadii == centerX) {
                    return "4";
                } else if (asteroidGlobalY - combinedRadii == centerX) {
                    return "0";
                }
            }

            return false
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
