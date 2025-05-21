import { Enemy } from "./enemy.js";

export const dungeon_structs = {
    muddy_swamp: {
        name: "Muddy Swamp",
        enemies: [
            new Enemy("Brainlet", 10, 2, 0, 1, "/assets/enemy.png"),
            new Enemy("Goblin", 20, 3, 1, 2, "/assets/goblin.png"),
            new Enemy("Skeleton", 30, 4, 2, 3, "/assets/skeleton.png", true),
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