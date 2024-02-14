import { gameSettings } from "./main.mjs";

class HitTest {
  static circle(collider1, collider2, minimumDistance) {


    let distance = Math.sqrt((collider2.y - collider1.y) ** 2 + (collider2.x - collider1.x) ** 2);
    return (distance < collider1.r + collider2.r + (minimumDistance ? minimumDistance : 0));
  }

  static distanceTo(collider1, collider2) {
    return Math.sqrt((collider2.y - collider1.y) ** 2 + (collider2.x - collider1.x) ** 2);
  }

  static isOnScreen(player, object) {
    let distHeightLow = player.yPos - gameSettings.height 
    let distHeightHigh = player.yPos + gameSettings.height
    let distWidthLow = player.xPos - gameSettings.width
    let distWidthHigh = player.xPos + gameSettings.width

    if ((object.yPos <= distHeightHigh && object.yPos >= distHeightLow) &&
      (object.xPos <= distWidthHigh && object.xPos >= distWidthLow)) {
      return true;
    } else return false;

  }
}

export default HitTest;
