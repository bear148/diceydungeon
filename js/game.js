const GAME_STATE = {
    player_turn: 0,
    enemy_turn: 1,
    battle_end: 2,
    menu: 3,
    inventory: 4,
    paused: 5,
    buffer_state: 6,
}

export class Game {
    constructor() {
        this.gameState = GAME_STATE.menu;

        this.init();
    }

    init() {
        document.getElementById("start-menu").classList.add("hidden");
        document.getElementById("menu").classList.toggle("hidden");

        console.log("initialize game state")
    }
}
