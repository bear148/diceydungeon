import { Enemy } from "./enemy.js";
import { ITEM_TYPE } from "./enums.js";
import { Item } from "./item.js";

export const dungeon_structs = {
    muddy_swamp: {
        name: "Muddy Swamp",
        enemies: [
            new Enemy("Brainlet", 10, 2, 0, 1, "/assets/enemy.png"),
            new Enemy("Plughead", 15, 2, 0, 1, "/assets/goblin.png"),
            new Enemy("Molecule Brain", 10, 2, 0, 1, "/assets/enemy2.png"),
            new Enemy("Plughead", 15, 2, 0, 1, "/assets/goblin.png"),
            new Enemy("Skeleton", 30, 4, 2, 3, "/assets/skeleton.png", true),
        ],
    },
    haunted_crypt: {
        name: "Haunted Crypt",
        enemies: [],
    },
    fury_cave: {
        name: "Fury Cave",
        enemies: [],
    },
    forsaken_island: {
        name: "Forsaken Island",
        enemies: [],
    },
    temple_of_gods: {
        name: "Temple of Gods",
        enemies: [],
    }
}