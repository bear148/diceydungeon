import { getRandomInt } from "./util.js";

export class Dice {
    constructor(diceContainer) {
        this.rollButton = document.getElementById("roll-die");
        this.diceContainer = diceContainer;
        this.imagePath = "/assets/dice/";
    }

    roll() {
        const r = getRandomInt(1, 6);

        new Audio(`/assets/dice/dice${getRandomInt(1, 2)}.mp3`).play();

        this.diceContainer.children[0].src = this.imagePath + r + ".png";

        return r;
    }
}