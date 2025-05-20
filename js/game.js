import { dungeon_structs } from './dungeon.js';

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
        this.combatContainer = document.getElementById("combat-container");
        this.menu = document.getElementById("menu");
        this.startMenu = document.getElementById("start-menu");
        this.dungeonContainer = document.getElementById("dungeon-container");
        this.dungeon = null;

        this.init();
    }

    init() {
        let dungeons = document.getElementsByClassName("dungeon");

        this.startMenu.classList.add("hidden");
        this.menu.classList.toggle("hidden");

        for (let d of dungeons) {
            d.addEventListener('click', () => {
                this.selectDungeon(dungeon_structs[d.attributes[2].value]);
            });
        }
    }

    selectDungeon(dungeon) {
        console.log(`Dungeon selected: ${dungeon.name}`);
        this.gameState = GAME_STATE.player_turn;
        this.dungeon = dungeon;

        this.menu.classList.toggle("hidden");
        this.combatContainer.classList.toggle("hidden");

        this.combatContainer.children[0].innerText = dungeon.name;
    }
}
