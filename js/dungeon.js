import { Enemy } from "./enemy.js";

export const dungeon_structs = {
    muddy_swamp: {
        name: "Muddy Swamp",
        enemies: [
            new Enemy("Brainlet", 10, 2, 0, 1, "/assets/enemy.png")
        ],
        loot: [],
    },
    haunted_crypt: {
        name: "Haunted Crypt",
        enemies: [],
        loot: [],
    },
    fury_cave: {
        name: "Fury Cave",
        enemies: [],
        loot: [],
    },
    forsaken_island: {
        name: "Forsaken Island",
        enemies: [],
        loot: [],
    },
    temple_of_gods: {
        name: "Temple of Gods",
        enemies: [],
        loot: [],
    }
}