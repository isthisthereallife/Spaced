class HitTest {
  static circle(collider1, collider2) {
    let distance = Math.sqrt((collider2.y - collider1.y)**2 + (collider2.x - collider1.x)**2);
    if(distance < collider1.r + collider2.r){
      console.log("collision dist: "+distance);
    }
    return (distance < collider1.r + collider2.r);
  }
}

export default HitTest;