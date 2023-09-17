class Input {
    static #inputMap = new Map();
    static jumpButton = "Semicolon";

    static startListener() {
        document.addEventListener("keydown", (e) => {
            //no move if moving
            if (!this.#inputMap.get("moving")) {
                this.#inputMap.set(e.code, true);
                if (e.code == this.jumpButton)
                    this.start();
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
}

export default Input;
