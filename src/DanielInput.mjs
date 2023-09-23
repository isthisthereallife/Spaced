class DanielInput {
  static #keys = {};

  static init() {
    document.addEventListener("keydown", e => {
      this.#keys[e.key] = {down: true, pressed: true};
    });

    document.addEventListener("keyup", e => {
      if(e.key in this.#keys) this.#keys[e.key].down = false;
    });
  }

  static getDown(id) {
    return (id in this.#keys) ? this.#keys[id].down : false;
  }

  static getClick(id) {
    if(id in this.#keys && !this.#keys[id].down && this.#keys[id].pressed) {
      this.#keys[id].pressed = false;
      return true;
    }
    return false;
  }
}

export default DanielInput;
