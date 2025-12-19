import { Dice } from './dice.js';
import { dungeon_structs } from './dungeon.js';
import { Inventory } from './inventory.js';
import { Item } from './item.js';
import { ITEM_TYPE } from './enums.js';
import { refreshPlayerStats, RNG, updateAllCoinCounters, toggleVisibility } from './util.js';

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
    maxHealth: 100,
    coins: 10,
    attack: 5,
    baseAttack: 5, // base attack without items
    defense: 0,
    speed: 1000, // time (in ms) between attacks for auto attack
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
    reset: function () {
        this.health = 100;
        this.maxHealth = 100;
        this.coins = 10;
        this.attack = 5;
        this.defense = 0;
        this.speed = 1;
        this.skills = [];
        this.inventory = [];
        this.blocking = false;
        this.isDead = false;
        this.armor = {
            head: null,
            chest: null,
            boots: null,
            gloves: null,
        };
        this.hand = null;
        this.xp = 0;
        this.level = 1;
        this.nextLevel = 500;
    }
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
        this.settings = ["attack", "defense", "attack", "defense", "attack", "defense"]; // attack, defense
        this.inventoryContainer = document.getElementById("inventory-container");
        this.inventoryGrid = document.getElementById("inventory-grid");
        this.dungeonElements = document.getElementsByClassName("dungeon");
        this.storeContainer = document.getElementById("store-container");
        this.settingsContainer = document.getElementById("settings-container");
        this.autoAttackButton = document.getElementById("auto-attack-button");

        this.diceController = new Dice(this.diceContainer);
        this.Inventory = new Inventory(this.inventoryGrid);

        this.dungeon = null;
        this.dungeonEnemy = 0;
        this.nextDungeonUnlock = 1;

        this.autoAttackInterval = null;
        this.currentRoll = null;

        this.init();
    }

    init() {
        console.log("Game initialized");
        toggleVisibility(this.startMenu, false);
        toggleVisibility(this.menu, true);

        this.createDungeonListeners();
        this.createNavigationListeners();
        this.createPlayerActionListeners();

        // document.addEventListener("keydown", (event) => {
        //     if (event.key === "Escape") {
        //         this.playerLevelUp();
        //     }
        // });

        document.addEventListener("keydown", (event) => {
            if (event.key === "i") {
                this.Inventory.addItem(new Item(ITEM_TYPE.crafting_material).generate());
            }
        });

        if (RNG(10)) {
            this.unlockSkill();
        }

        // this.Inventory.addItem(new Item(ITEM_TYPE.rune).generate());

        // this.Inventory.addItem(new Item(ITEM_TYPE.weapon).generate());

        refreshPlayerStats();
    }

    selectDungeon(dungeon) {
        refreshPlayerStats();
        this.dungeon = dungeon;

        // Ensure correct visibility
        toggleVisibility(this.menu, false);

        toggleVisibility(this.combatContainer, true);
        toggleVisibility(this.diceContainer, true);
        toggleVisibility(this.controlContainer, true);

        this.combatContainer.children[0].innerText = dungeon.name;
        this.combatContainer.children[1].innerText = `0/${dungeon.enemies.length}`;

        this.buildDungeon(dungeon);
    }

    buildDungeon(dungeon) {
        this.setGameState(GAME_STATE.player_turn);
        dungeon.enemies[0].createEnemy();
    }

    handleRoll(roll) {
        switch (this.settings[roll - 1]) {
            case "attack":
                this.dungeon.enemies[this.dungeonEnemy].takeDamage(PLAYER.attack);
                break;
            case "defense":
                PLAYER.blocking = true;
                break;
            default:
                this.dungeon.enemies[this.dungeonEnemy].takeDamage(PLAYER.skills[this.settings[roll - 1]].stats.amount);
                break;
        }

        this.setGameState(GAME_STATE.enemy_turn);

        if (this.dungeon.enemies[this.dungeonEnemy].health <= 0) {
            PLAYER.xp += this.dungeon.enemies[this.dungeonEnemy].xp;

            if (PLAYER.xp >= PLAYER.nextLevel) {
                PLAYER.level++;
                PLAYER.nextLevel = PLAYER.nextLevel + (PLAYER.nextLevel * 0.5);
                this.playerLevelUp();
            }

            this.dungeonEnemy++;
            this.combatContainer.children[1].innerText = `${this.dungeonEnemy}/${this.dungeon.enemies.length}`;

            this.mobDrop();

            if (this.dungeonEnemy >= this.dungeon.enemies.length) {
                this.setGameState(GAME_STATE.battle_end);
            } else {
                this.dungeon.enemies[this.dungeonEnemy].createEnemy();
                this.setGameState(GAME_STATE.player_turn);
            }
        } else {
            if (!PLAYER.blocking) {
                this.dungeon.enemies[this.dungeonEnemy].attackEnemy(PLAYER);

                if (PLAYER.health <= 0) {
                    PLAYER.isDead = true;
                    this.triggerGameOver();
                }
            }
            PLAYER.blocking = false;
        }

        this.setGameState(GAME_STATE.player_turn);
        toggleVisibility(this.controlContainer, true); // Ensure roll button is visible
        refreshPlayerStats();
    }

    goBackToDungeonMenu() {
        toggleVisibility(this.combatContainer, false);
        toggleVisibility(this.diceContainer, false);
        toggleVisibility(this.controlContainer, false);
        toggleVisibility(this.menu, true);

        this.stopAutoAttack();

        this.dungeon = null;
        this.dungeonEnemy = 0;
    }

    triggerGameOver() {
        location.reload();
    }

    triggerDungeonWin() {
        if (RNG(75)) {
            let pot = new Item(ITEM_TYPE.potion).generate();
            this.Inventory.addItem(pot);
            PLAYER.inventory.push(pot);
        }

        let drop = RNG(50) ? new Item(ITEM_TYPE.weapon).generate() : new Item(ITEM_TYPE.armor).generate();

        toggleVisibility(this.combatContainer, false);
        toggleVisibility(this.diceContainer, false);
        toggleVisibility(this.controlContainer, false);

        this.Inventory.addItem(drop);
        PLAYER.inventory.push(drop);

        toggleVisibility(document.getElementById("dungeon-over-container"), true);

        if (PLAYER.xp >= PLAYER.nextLevel) {
            PLAYER.level++;
            PLAYER.nextLevel = PLAYER.nextLevel + (PLAYER.nextLevel * 0.5);
        }

        refreshPlayerStats();
    }

    showPlayerControls() {
        toggleVisibility(this.controlContainer, true);
    }

    hidePlayerControls() {
        toggleVisibility(this.controlContainer, false);
    }

    getGameState() {
        return this.gameState;
    }

    resetStats() {
        this.Inventory.clear();
        PLAYER.reset();
        this.nextDungeonUnlock = 0;
        refreshPlayerStats();
    }

    playerLevelUp() {
        PLAYER.attack += 5;
        PLAYER.defense += 3;
        PLAYER.maxHealth += 20;
        PLAYER.level++;

        if (PLAYER.level % 5 == 0 && PLAYER.level <= 30) {
            this.dungeonElements[this.nextDungeonUnlock].classList.remove("hidden");
            this.nextDungeonUnlock++;
            PLAYER.coins += 100;
        }

        if (PLAYER.level % 10 == 0) {
            this.unlockSkill();
        }

        PLAYER.nextLevel += PLAYER.nextLevel * 0.75;

        refreshPlayerStats();
    }

    mobDrop() {
        if (RNG(45)) {
            let drop = RNG(50) ? new Item(ITEM_TYPE.weapon).generate() : new Item(ITEM_TYPE.armor).generate();
            this.Inventory.addItem(drop);
            PLAYER.inventory.push(drop);
        } else if (RNG(45)) {
            let pot = new Item(ITEM_TYPE.potion).generate();
            this.Inventory.addItem(pot);
            PLAYER.inventory.push(pot);
        } else if (RNG(5)) {
            let skill = new Item(ITEM_TYPE.spell).generate();
            PLAYER.skills.push(skill);
            this.Inventory.addItem(skill);
        } else if (RNG(15)) {
            let drop = RNG(50) ? new Item(ITEM_TYPE.xp_book).generate() : new Item(ITEM_TYPE.crafting_material).generate();
            this.Inventory.addItem(drop);
            PLAYER.inventory.push(drop);
        } else if (RNG(2)) {
            let rune = new Item(ITEM_TYPE.rune).generate();
            this.Inventory.addItem(rune);
            PLAYER.inventory.push(rune);
        }
    }

    setGameState(newState) {
        this.gameState = newState;
        switch (newState) {
            case GAME_STATE.player_turn:
                toggleVisibility(this.controlContainer, true);
                break;
            case GAME_STATE.enemy_turn:
                toggleVisibility(this.controlContainer, false);
                break;
            case GAME_STATE.battle_end:
                this.triggerDungeonWin();
                break;
            case GAME_STATE.menu:
                this.goBackToDungeonMenu();
                break;
        }
    }

    createDungeonListeners() {
        let dungeons = document.getElementsByClassName("dungeon");

        for (let d of dungeons) {
            d.addEventListener('click', () => {
                this.selectDungeon(dungeon_structs[d.attributes[2].value]);
            });
        }
    }

    createNavigationListeners() {
        document.getElementById("inventoryGo").addEventListener("click", () => {
            toggleVisibility(this.menu, false);
            toggleVisibility(this.inventoryContainer, true);
        });

        document.getElementById("storeGo").addEventListener("click", () => {
            toggleVisibility(this.storeContainer, true);
            toggleVisibility(this.menu, false);

            document.getElementById("store-coins").innerText = PLAYER.coins;
        })

        for (const element of document.getElementsByClassName("restartGame")) {
            element.addEventListener("click", () => {
                this.dungeon = null;
                this.dungeonEnemy = 0;
                toggleVisibility(element.parentElement, false);
                this.setGameState(GAME_STATE.menu);
            });
        }

        for (const element of document.getElementsByClassName("backToDungeonSelect")) {
            element.addEventListener("click", () => {
                toggleVisibility(element.parentElement, false);
                this.setGameState(GAME_STATE.menu);
            });
        }

        document.getElementById("bindAttacks").addEventListener("click", () => {
            toggleVisibility(this.menu, false);
            toggleVisibility(this.settingsContainer, true);
        });
    }

    createPlayerActionListeners() {
        this.controlContainer.children[1].addEventListener("click", () => {
            if (this.gameState != GAME_STATE.player_turn) return;
            this.currentRoll = this.diceController.roll();
            this.handleRoll(this.currentRoll);
        });

        for (const element of document.getElementsByClassName("dice-option")) {
            element.addEventListener("change", (e) => {
                this.settings[Number(element.attributes[2].value - 1)] = (isNaN(Number(e.target.value))) ? e.target.value : Number(e.target.value);
            });
        }

        for (const element of document.getElementsByClassName("buy-item")) {
            element.addEventListener("click", () => {
                if (PLAYER.coins < parseInt(element.attributes[2].value)) return;

                PLAYER.coins -= parseInt(element.attributes[2].value);
                this.Inventory.addItem(new Item(Number(element.attributes[1].value)).generate());
                refreshPlayerStats();
                updateAllCoinCounters();
            });
        }

        this.autoAttackButton.addEventListener("click", () => {
            if (this.gameState == GAME_STATE.player_turn && !this.autoAttackInterval) {
                this.startAutoAttack(Math.floor(PLAYER.speed));
                this.autoAttackButton.innerText = "Disable Auto Attack";
            } else {
                this.stopAutoAttack();
                this.autoAttackButton.innerText = "Enable Auto Attack";
            }
        });
    }

    startAutoAttack(interval = 1000) {
        if (this.autoAttackInterval) clearInterval(this.autoAttackInterval);
        this.autoAttackInterval = setInterval(() => {
            if (this.gameState === GAME_STATE.player_turn) {
                this.currentRoll = this.diceController.roll();
                this.handleRoll(this.currentRoll);
            }
        }, interval);
    }

    stopAutoAttack() {
        if (this.autoAttackInterval) clearInterval(this.autoAttackInterval);
        this.autoAttackInterval = null;
        this.autoAttackButton.innerText = "Enable Auto Attack";
    }

    unlockSkill() {
        let skill = new Item(ITEM_TYPE.spell).generate();
        PLAYER.skills.push(skill);
        this.Inventory.addItem(skill);
    }
}

export function updatePlayerAttack() {
    PLAYER.attack = PLAYER.baseAttack + (PLAYER.hand ? PLAYER.hand.stats.amount : 0);
    refreshPlayerStats();
}