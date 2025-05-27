import { Enemy } from "./enemy.js";

export const dungeon_structs = {
    muddy_swamp: {
        name: "Muddy Swamp",
        enemies: [
            new Enemy("Brainlet", 45, 2, 0, 1, "/assets/enemy.png", 15),
            new Enemy("Plughead", 60, 2, 0, 1, "/assets/goblin.png", 20),
            new Enemy("Molecule Brain", 75, 2, 0, 1, "/assets/enemy2.png", 15),
            new Enemy("Plughead", 100, 2, 0, 1, "/assets/goblin.png", 20),
            new Enemy("Skeleton", 200, 4, 2, 3, "/assets/skeleton.png", 100, true),
        ],
    },
    haunted_crypt: {
        name: "Haunted Crypt",
        enemies: [
            new Enemy("Brainlet", 75, 2, 0, 1, "/assets/enemy.png", 30),
            new Enemy("Plughead", 75, 2, 0, 1, "/assets/goblin.png", 30),
            new Enemy("Molecule Brain", 65, 2, 0, 1, "/assets/enemy2.png", 40),
            new Enemy("Plughead", 100, 2, 0, 1, "/assets/goblin.png", 50),
            new Enemy("Skeleton", 400, 4, 2, 3, "/assets/skeleton.png", 100, true),
            new Enemy("Wind Up", 600, 4, 2, 3, "/assets/windup.png", 250, true),
        ],
    },
    fury_cave: {
        name: "Fury Cave",
        enemies: [
            new Enemy("Brainlet", 75, 2, 0, 1, "/assets/enemy.png", 30),
            new Enemy("Plughead", 75, 2, 0, 1, "/assets/goblin.png", 30),
            new Enemy("Molecule Brain", 65, 2, 0, 1, "/assets/enemy2.png", 40),
            new Enemy("Plughead", 100, 2, 0, 1, "/assets/goblin.png", 50),
            new Enemy("Brainlet", 75, 2, 0, 1, "/assets/enemy.png", 30),
            new Enemy("Nether Head", 75, 2, 0, 1, "/assets/Nether.png", 30),
            new Enemy("Molecule Brain", 65, 2, 0, 1, "/assets/enemy2.png", 40),
            new Enemy("Plughead", 100, 2, 0, 1, "/assets/goblin.png", 50),
            new Enemy("Skeleton", 400, 4, 2, 3, "/assets/skeleton.png", 100, true),
            new Enemy("Wind Up", 600, 4, 2, 3, "/assets/windup.png", 250, true),
        ],
    },
    forsaken_island: {
        name: "Forsaken Island",
        enemies: [
            new Enemy("Brainlet", 75, 2, 0, 1, "/assets/enemy.png", 30),
            new Enemy("Plughead", 75, 2, 0, 1, "/assets/goblin.png", 30),
            new Enemy("Molecule Brain", 65, 2, 0, 1, "/assets/enemy2.png", 40),
            new Enemy("Plughead", 100, 2, 0, 1, "/assets/goblin.png", 50),
            new Enemy("Brainlet", 75, 2, 0, 1, "/assets/enemy.png", 30),
            new Enemy("Nether Head", 75, 2, 0, 1, "/assets/Nether.png", 30),
            new Enemy("Molecule Brain", 65, 2, 0, 1, "/assets/enemy2.png", 40),
            new Enemy("Plughead", 100, 2, 0, 1, "/assets/goblin.png", 50),
            new Enemy("Skeleton", 400, 4, 2, 3, "/assets/skeleton.png", 100, true),
            new Enemy("Wind Up", 600, 4, 2, 3, "/assets/windup.png", 250, true),
        ],
    },
    temple_of_gods: {
        name: "Temple of Gods",
        enemies: [
            new Enemy("Brainlet", 75, 2, 0, 1, "/assets/enemy.png", 30),
            new Enemy("Plughead", 75, 2, 0, 1, "/assets/goblin.png", 30),
            new Enemy("Molecule Brain", 65, 2, 0, 1, "/assets/enemy2.png", 40),
            new Enemy("Plughead", 100, 2, 0, 1, "/assets/goblin.png", 50),
            new Enemy("Brainlet", 75, 2, 0, 1, "/assets/enemy.png", 30),
            new Enemy("Nether Head", 75, 2, 0, 1, "/assets/Nether.png", 30),
            new Enemy("Molecule Brain", 65, 2, 0, 1, "/assets/enemy2.png", 40),
            new Enemy("Plughead", 100, 2, 0, 1, "/assets/goblin.png", 50),
            new Enemy("Skeleton", 400, 4, 2, 3, "/assets/skeleton.png", 100, true),
            new Enemy("Wind Up", 600, 4, 2, 3, "/assets/windup.png", 250, true),
        ],
    }
}