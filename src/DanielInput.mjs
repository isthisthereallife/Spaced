class DanielInput {
  static #keys = {};

  static init() {
    document.addEventListener("keydown", e => {
      this.keyPress(e.key);
    });

    document.addEventListener("keyup", e => {
      this.keyRelease(e.key)
    });
  }

  static keyPress(id) {
    this.#keys[id] = { down: true, pressed: true }
  }
  static keyRelease(id) {
    if (id in this.#keys) this.#keys[id].down = false;
  }

  static getDown(id) {
    return (id in this.#keys) ? this.#keys[id].down : false;
  }

  static getClick(id) {
    if (id in this.#keys && !this.#keys[id].down && this.#keys[id].pressed) {
      this.#keys[id].pressed = false;
      return true;
    }
    return false;
  }
}

export default DanielInput;
