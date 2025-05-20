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

        this.init();
    }

    init() {
        let dungeons = document.getElementsByClassName("dungeon");
        console.log(dungeons);
        console.log(dungeon_structs[1]);

        document.getElementById("start-menu").classList.add("hidden");
        document.getElementById("menu").classList.toggle("hidden");

        for (let d of dungeons) {
            d.addEventListener('click', (e) => {
                console.log(`Dungeon clicked: ${d.attributes[1].value}`);
                console.log(`Dungeon Struct: ${dungeon_structs[Number(d.attributes[1].value)]}`)
                this.gameState = GAME_STATE.player_turn;
                document.getElementById("menu").classList.toggle("hidden");
                document.getElementById("combat-container").classList.toggle("hidden");
            });
        }

        // dungeons.array.forEach(element => {
        //     element.addEventListener('click', (e) => {
        //         console.log("Dungeon clicked: " + e.target);
        //         this.gameState = GAME_STATE.player_turn;
        //         document.getElementById("menu").classList.toggle("hidden");
        //         document.getElementById("battle").classList.toggle("hidden");
        //     });
        // });
    }
}
