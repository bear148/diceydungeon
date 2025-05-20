import { Dice } from './dice.js';
import { dungeon_structs } from './dungeon.js';

export const GAME_STATE = {
    player_turn: 0,
    enemy_turn: 1,
    battle_end: 2,
    menu: 3,
    inventory: 4,
    paused: 5,
    buffer_state: 6,
}

const PLAYER = {
    health: 100,
    coins: 10,
    skills: [],
    inventory: []
}

export class Game {
    constructor() {
        this.gameState = GAME_STATE.menu;
        this.combatContainer = document.getElementById("combat-container");
        this.menu = document.getElementById("menu");
        this.startMenu = document.getElementById("start-menu");
        this.dungeonContainer = document.getElementById("dungeon-container");
        this.diceContainer = document.getElementById("dice-container");
        this.controlContainer = document.getElementById("control-container");
        this.infoContainer = document.getElementById("info-container");

        this.diceController = new Dice(this.diceContainer);

        this.dungeon = null;
        this.dungeonEnemy = 0;

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

        this.controlContainer.children[0].addEventListener("click", () => {
            if (this.gameState != GAME_STATE.player_turn) return;
            this.currentRoll = this.diceController.roll();
            this.gameState = GAME_STATE.enemy_turn;
            this.controlContainer.classList.toggle("hidden");
        });
    }

    selectDungeon(dungeon) {
        console.log(`Dungeon selected: ${dungeon.name}`);
        this.gameState = GAME_STATE.player_turn;
        this.dungeon = dungeon;

        this.menu.classList.toggle("hidden");
        this.combatContainer.classList.toggle("hidden");
        this.diceContainer.classList.toggle("hidden");
        this.controlContainer.classList.toggle("hidden");
        this.infoContainer.classList.toggle("hidden");

        this.combatContainer.children[0].innerText = dungeon.name;
        this.combatContainer.children[1].innerText = `0/${dungeon.enemies.length}`;

        this.buildDungeon(dungeon);
    }

    buildDungeon(dungeon) {
        console.log("Building dungeon: " + dungeon);

        dungeon.enemies[0].createEnemy();
    }

    updateGameState(state) {
        this.gameState = state;

        switch(this.gameState) {
            case GAME_STATE.player_turn:
                this.controlContainer.children[0].classList.toggle("hidden");
                break;
            default:
                break;
        }
    }

    getGameState() {
        return this.gameState;
    }
}
