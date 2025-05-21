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

let PLAYER = {
    name: "Player",
    health: 100,
    coins: 10,
    attack: 5,
    defense: 0,
    speed: 1,
    skills: [],
    inventory: [],
    blocking: false,
    isDead: false,
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
        this.settings = ["even", "odd"]; // attack, defense

        this.diceController = new Dice(this.diceContainer);

        this.dungeon = null;
        this.dungeonEnemy = 0;

        this.init();
    }

    init() {
        let dungeons = document.getElementsByClassName("dungeon");

        this.startMenu.classList.add("hidden");
        this.menu.classList.toggle("hidden");
        this.dungeonContainer.classList.toggle("hidden");

        for (let d of dungeons) {
            d.addEventListener('click', () => {
                this.selectDungeon(dungeon_structs[d.attributes[2].value]);
            });
        }

        this.controlContainer.children[0].addEventListener("click", () => {
            console.log("Attack button clicked");
            if (this.gameState != GAME_STATE.player_turn) return;
            this.currentRoll = this.diceController.roll();
            this.handleRoll(this.currentRoll);
            this.controlContainer.classList.toggle("hidden");
        });

        document.getElementById("bindAttacks").addEventListener("click", () => {
            this.menu.classList.toggle("hidden");
            document.getElementById("settings-container").classList.toggle("hidden");
        });

        document.getElementById("backToDungeonSelect").addEventListener("click", () => {
            this.menu.classList.toggle("hidden");
            document.getElementById("settings-container").classList.toggle("hidden");
        });

        document.getElementById("attack-settings").addEventListener("change", () => {
            this.settings[0] = document.getElementById("attack-settings").value;
        });

        document.getElementById("defense-settings").addEventListener("change", () => {
            this.settings[1] = document.getElementById("defense-settings").value;
        });

        console.log(document.getElementsByClassName("restartGame"));
        for (const element of document.getElementsByClassName("restartGame")) {
            element.addEventListener("click", () => {
                this.dungeon = null;
                this.dungeonEnemy = 0;
                this.gameState = GAME_STATE.menu;

                this.menu.classList.toggle("hidden");
                element.parentElement.classList.toggle("hidden");
            });
        }

        document.getElementById("attack").innerText = PLAYER.attack;
        document.getElementById("defense").innerText = PLAYER.defense;
        document.getElementById("health").innerText = PLAYER.health;
    }

    selectDungeon(dungeon) {
        console.log(`Dungeon selected: ${dungeon.name}`);
        this.gameState = GAME_STATE.player_turn;
        this.dungeon = dungeon;

        this.menu.classList.toggle("hidden");
        this.combatContainer.classList.toggle("hidden");
        this.diceContainer.classList.toggle("hidden");
        this.controlContainer.classList.toggle("hidden");

        this.combatContainer.children[0].innerText = dungeon.name;
        this.combatContainer.children[1].innerText = `0/${dungeon.enemies.length}`;

        this.buildDungeon(dungeon);
    }

    buildDungeon(dungeon) {
        console.log("Building dungeon: " + dungeon);

        dungeon.enemies[0].createEnemy();
    }

    handleRoll(roll) {
        if ((roll % 2 == 0 && this.settings[0] == "even") || (roll % 2 != 0 && this.settings[0] == "odd")) {
            console.log("Attack successful!");
            this.dungeon.enemies[this.dungeonEnemy].takeDamage(PLAYER.attack);
        } else if ((roll % 2 != 0 && this.settings[1] == "odd") || (roll % 2 == 0 && this.settings[1] == "even")) {
            console.log("Defense successful!");
            PLAYER.blocking = true;
        }

        this.GAME_STATE = GAME_STATE.enemy_turn;

        if (this.dungeon.enemies[this.dungeonEnemy].health <= 0) {
            this.dungeonEnemy++;
            this.combatContainer.children[1].innerText = `${this.dungeonEnemy}/${this.dungeon.enemies.length}`;
            if (this.dungeonEnemy >= this.dungeon.enemies.length) {
                this.gameState = GAME_STATE.battle_end;
                this.triggerDungeonWin();
                console.log("Battle ended!");
            } else {
                this.dungeon.enemies[this.dungeonEnemy].createEnemy();
                this.gameState = GAME_STATE.player_turn;
                this.showPlayerControls();
            }
        } else {
            console.log("Enemy turn!");
            if (!PLAYER.blocking) {
                let attack = this.dungeon.enemies[this.dungeonEnemy].attackEnemy(PLAYER);

                if (!attack) {
                    PLAYER.isDead = true;
                    this.triggerGameOver();
                }
            }
            this.gameState = GAME_STATE.player_turn;
            PLAYER.blocking = false;
            this.showPlayerControls();
        }
    }

    goBackToDungeonMenu() {
        this.combatContainer.classList.toggle("hidden");
        this.diceContainer.classList.toggle("hidden");
        this.controlContainer.classList.toggle("hidden");
        // this.dungeonContainer.classList.toggle("hidden");
        this.menu.classList.toggle("hidden");

        this.gameState = GAME_STATE.menu;
    }

    triggerGameOver() {
        this.combatContainer.classList.toggle("hidden");
        this.diceContainer.classList.toggle("hidden");
        this.controlContainer.classList.toggle("hidden");

        document.getElementById("game-over-container").classList.toggle("hidden");
    }

    triggerDungeonWin() {
        this.combatContainer.classList.toggle("hidden");
        this.diceContainer.classList.toggle("hidden");
        this.controlContainer.classList.toggle("hidden");

        console.log(this.dungeon.loot_table[0].generate());

        document.getElementById("dungeon-over-container").classList.toggle("hidden");
    }

    showPlayerControls() {
        this.controlContainer.classList.toggle("hidden");
    }

    hidePlayerControls() {
        this.controlContainer.classList.toggle("hidden");
    }

    getGameState() {
        return this.gameState;
    }
}
