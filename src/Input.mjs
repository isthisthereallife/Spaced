class Input {
    static #inputMap = new Map();
    static jumpButton = "Space";
    static relocateCWButton = "KeyE";
    static relocateCCWButton = "KeyA";

    static startListener() {
        document.addEventListener("keydown", (e) => {
            //no move if moving
            if (!this.#inputMap.get("moving")) {
                if (e.code === this.jumpButton) {
                    this.start();
                }
                if (e.code === this.relocateCWButton){
                    console.log("wanna relocate CW")
                    this.#inputMap.set("cw", true)

                }else if(e.code === this.relocateCCWButton) {
                    console.log("wanna relocate CCW")
                    this.#inputMap.set("ccw", true)
                }
            }
        });
    }

    static getInput(code) {
        return this.#inputMap.has(code) ? this.#inputMap.get(code) : false;
    }
    static setInput(x, boo) {
        this.#inputMap.set(x, boo)
    }
    static start() {
        this.#inputMap.set("moving", true);
        this.#inputMap.set("nuJump", true);
    }

    static stop() {
        this.#inputMap.clear();
    }
    static unsetRelocation(){
        this.#inputMap.set("cw", false);
        this.#inputMap.set("ccw", false);
    }
}

export default Input;
