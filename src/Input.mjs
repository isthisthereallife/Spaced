class Input {
    static #inputMap = new Map();
    static startListener() {

        document.addEventListener("keydown", (e) => {
            this.#inputMap.set(e.code, true);
        });
        document.addEventListener("keyup", (e) => {
            this.#inputMap.set(e.code, false);
        });
    }
    static getInput(code) {

        return this.#inputMap.has(code) ? this.#inputMap.get(code) : false;
    }
}

export default Input;