import { Enemy } from "./enemy.js";

export const dungeon_structs = {
    muddy_swamp: {
        name: "Muddy Swamp",
        enemies: [
            new Enemy("Brainlet", 10, 2, 0, 1, "/assets/enemy.png", 15),
            new Enemy("Plughead", 15, 2, 0, 1, "/assets/goblin.png", 20),
            new Enemy("Molecule Brain", 10, 2, 0, 1, "/assets/enemy2.png", 15),
            new Enemy("Plughead", 15, 2, 0, 1, "/assets/goblin.png", 20),
            new Enemy("Skeleton", 30, 4, 2, 3, "/assets/skeleton.png", 50, true),
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