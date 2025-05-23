import { Dice } from './dice.js';
import { dungeon_structs } from './dungeon.js';
import { Inventory } from './inventory.js';
import { Item } from './item.js';
import { ITEM_TYPE } from './enums.js';
import { refreshPlayerGearStats, RNG } from './util.js';

export const GAME_STATE = {
    player_turn: 0,
    enemy_turn: 1,
    battle_end: 2,
    menu: 3,
    inventory: 4,
    paused: 5,
    buffer_state: 6,
}

export let PLAYER = {
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
    armor: {
        head: null,
        chest: null,
        boots: null,
        gloves: null,
    },
    hand: null,
    xp: 0,
    level: 1,
    nextLevel: 500,
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
        this.inventoryContainer = document.getElementById("inventory-container");
        this.inventoryGrid = document.getElementById("inventory-grid");

        this.diceController = new Dice(this.diceContainer);
        this.Inventory = new Inventory(this.inventoryGrid);

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
            if (this.gameState != GAME_STATE.player_turn) return;
            this.currentRoll = this.diceController.roll();
            this.handleRoll(this.currentRoll);
            this.controlContainer.classList.toggle("hidden");
        });

        document.getElementById("bindAttacks").addEventListener("click", () => {
            this.menu.classList.toggle("hidden");
            document.getElementById("settings-container").classList.toggle("hidden");
        });

        document.getElementById("attack-settings").addEventListener("change", () => {
            this.settings[0] = document.getElementById("attack-settings").value;
        });

        document.getElementById("defense-settings").addEventListener("change", () => {
            this.settings[1] = document.getElementById("defense-settings").value;
        });

        document.getElementById("inventoryGo").addEventListener("click", () => {
            this.menu.classList.toggle("hidden");
            this.inventoryContainer.classList.toggle("hidden");
        });

        for (const element of document.getElementsByClassName("restartGame")) {
            element.addEventListener("click", () => {
                this.dungeon = null;
                this.dungeonEnemy = 0;
                this.gameState = GAME_STATE.menu;

                this.menu.classList.toggle("hidden");
                element.parentElement.classList.toggle("hidden");
            });
        }

        for (const element of document.getElementsByClassName("backToDungeonSelect")) {
            element.addEventListener("click", () => {
                this.menu.classList.toggle("hidden");
                element.parentElement.classList.toggle("hidden");
            });
        }

        this.refreshPlayerStats();
    }

    selectDungeon(dungeon) {
        this.refreshPlayerStats();
        this.gameState = GAME_STATE.player_turn;
        this.dungeon = dungeon;
    
        // Ensure correct visibility
        this.menu.classList.add("hidden");
        this.dungeonContainer.classList.add("hidden");
        
        this.combatContainer.classList.remove("hidden");
        this.diceContainer.classList.remove("hidden");
        this.controlContainer.classList.remove("hidden");
    
        this.combatContainer.children[0].innerText = dungeon.name;
        this.combatContainer.children[1].innerText = `0/${dungeon.enemies.length}`;
    
        this.buildDungeon(dungeon);
    }

    buildDungeon(dungeon) {
        this.gameState = GAME_STATE.player_turn;
        dungeon.enemies[0].createEnemy();
    }

    handleRoll(roll) {
        if ((roll % 2 == 0 && this.settings[0] == "even") || (roll % 2 != 0 && this.settings[0] == "odd")) {
            this.dungeon.enemies[this.dungeonEnemy].takeDamage(PLAYER.attack);
        } else if ((roll % 2 != 0 && this.settings[1] == "odd") || (roll % 2 == 0 && this.settings[1] == "even")) {
            PLAYER.blocking = true;
        }

        this.GAME_STATE = GAME_STATE.enemy_turn;

        if (this.dungeon.enemies[this.dungeonEnemy].health <= 0) {
            PLAYER.xp += this.dungeon.enemies[this.dungeonEnemy].xp;
            this.dungeonEnemy++;
            this.combatContainer.children[1].innerText = `${this.dungeonEnemy}/${this.dungeon.enemies.length}`;

            if (this.dungeonEnemy >= this.dungeon.enemies.length) {
                this.gameState = GAME_STATE.battle_end;
                this.triggerDungeonWin();
            } else {
                this.dungeon.enemies[this.dungeonEnemy].createEnemy();
                this.gameState = GAME_STATE.player_turn;
                this.showPlayerControls();
            }
        } else {
            console.log("Enemy turn!");
            if (!PLAYER.blocking) {
                this.dungeon.enemies[this.dungeonEnemy].attackEnemy(PLAYER);

                if (PLAYER.health <= 0) {
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
        this.combatContainer.classList.add("hidden");
        this.diceContainer.classList.add("hidden");
        this.controlContainer.classList.add("hidden");
    
        document.getElementById("game-over-container").classList.remove("hidden");
    }

    triggerDungeonWin() {
        if (RNG(75)) {
            let pot = new Item(ITEM_TYPE.potion).generate();
            this.Inventory.addItem(pot);
            PLAYER.inventory.push(pot);
        }

        let drop = RNG(50) ? new Item(ITEM_TYPE.weapon).generate() : new Item(ITEM_TYPE.armor).generate();

        this.combatContainer.classList.add("hidden");
        this.diceContainer.classList.add("hidden");
        this.controlContainer.classList.add("hidden");
    
        this.Inventory.addItem(drop);
        PLAYER.inventory.push(drop);
    
        document.getElementById("dungeon-over-container").classList.remove("hidden");

        this.dungeonContainer.classList.remove("hidden");

        if (PLAYER.xp >= PLAYER.nextLevel) {    
            PLAYER.level++;
            PLAYER.nextLevel = PLAYER.nextLevel + (PLAYER.nextLevel * 0.5);
        }

        this.refreshPlayerProgression();
        refreshPlayerGearStats();
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

    refreshPlayerStats() {
        document.getElementById("attack").innerText = PLAYER.attack;
        document.getElementById("defense").innerText = PLAYER.defense;
        document.getElementById("health").innerText = PLAYER.health;
    }

    refreshPlayerProgression() {
        document.getElementById("xp").innerText = PLAYER.xp;
        document.getElementById("lvl").innerText = PLAYER.level;
    }
}
