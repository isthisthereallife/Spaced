class ScreenController {
  static #stage;
  static #screens = {};

  static init(stage) {
    this.#stage = stage;
  }

  static addScreens(screens) {
    this.#screens = screens;
  }
  static addScreen(id, screen) {
    if (!(id in this.#screens)) {
      this.#screens[id] = screen
    }
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
