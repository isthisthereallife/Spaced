class ScreenController {
  static #stage;
  static #screens;

  static init(stage) {
    this.#stage = stage;
  }

  static addScreens(screens) {
    this.#screens = screens;
  }

  static switch(id) {
    this.#stage.removeChildren();
    this.#stage.addChild(this.#screens[id]);
    this.#stage.children[0].init();
  }

  static updateScreen() {
    this.#stage.children[0].update();
  }
}

export default ScreenController;
