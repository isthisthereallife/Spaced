class Input {
    static #inputMap = new Map();

    static startListener() {
        document.addEventListener("keydown", (e) => {
            this.#inputMap.set(e.code, true);
            this.start();
        });
        document.addEventListener("keyup", (e) => {
            //this.#inputMap.set(e.code, false);
        });
    }

    static getInput(code) {
        return this.#inputMap.has(code) ? this.#inputMap.get(code) : false;
    }
    static setInput(x,boo){
        this.#inputMap.set(x,boo)
    }
    static start(){
        this.#inputMap.set("moving",true);
        this.#inputMap.set("nuJump",true);
    }

    static stop() {
        this.#inputMap.clear(); 
    }
}

export default Input;
