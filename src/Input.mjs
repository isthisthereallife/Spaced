class Input {
    //  
    #inputMap = new Map();
    startListener() {

        document.addEventListener("keydown", (e) => {
            this.#inputMap.set(e.code, true);
        });
        document.addEventListener("keyup", (e) => {
            this.#inputMap.set(e.code, false);
        });
    }
    getInput(code) {
        return this.#inputMap.has(code) ? this.#inputMap.get(code) : false;
    }
}

export default Input;