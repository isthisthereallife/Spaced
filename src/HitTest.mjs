class HitTest {
  static circle(collider1, collider2, minimumDistance) {


    let distance = Math.sqrt((collider2.y - collider1.y) ** 2 + (collider2.x - collider1.x) ** 2);
    return (distance < collider1.r + collider2.r + (minimumDistance ? minimumDistance : 0));
  }

  static distanceTo(collider1, collider2){
    return Math.sqrt((collider2.y - collider1.y) ** 2 + (collider2.x - collider1.x) ** 2);
  }
}

export default HitTest;
