class DanielInput {
  static #keys = {};

  static init() {
    document.addEventListener("keydown", e => {
      this.#keys[e.key] = true;
    });

    document.addEventListener("keyup", e => {
      this.#keys[e.key] = false;
    });
  }

  static getKey(id) {
    return this.#keys[id];
  }
}

export default DanielInput;
