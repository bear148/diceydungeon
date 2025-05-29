import { Enemy } from "./enemy.js";

export const dungeon_structs = {
    muddy_swamp: {
        name: "Muddy Swamp",
        enemies: [
            new Enemy("Brainlet", 45, 2, 0, 1, "/assets/enemy.png", 15, false, false),
            new Enemy("Plughead", 60, 2, 0, 1, "/assets/goblin.png", 20),
            new Enemy("Molecule Brain", 75, 2, 0, 1, "/assets/enemy2.png", 15),
            new Enemy("Plughead", 100, 2, 0, 1, "/assets/goblin.png", 20),
            new Enemy("Skeleton", 200, 4, 2, 3, "/assets/skeleton.png", 100, true),
        ],
    },
    haunted_crypt: {
        name: "Haunted Crypt",
        enemies: [
            new Enemy("Schizo", 75, 2, 0, 1, "/assets/schizo.png", 30),
            new Enemy("Flame", 75, 2, 0, 1, "/assets/flame.png", 30),
            new Enemy("Schizo", 65, 2, 0, 1, "/assets/schizo.png", 40),
            new Enemy("Flame", 100, 2, 0, 1, "/assets/flame.png", 50),
            new Enemy("Glitch", 400, 4, 2, 3, "/assets/glitch.png", 100, true),
            new Enemy("Angel", 600, 4, 2, 3, "/assets/angel.png", 250, true),
        ],
    },
    russia: {
        name: "Russia",
        enemies: [
            new Enemy("Soviet Soldier", 100, 2, 0, 1, "/assets/soviet1.png", 55),
            new Enemy("Soviet Soldier", 125, 2, 0, 1, "/assets/soviet3.png", 55),
            new Enemy("Soviet Soldier", 155, 2, 0, 1, "/assets/soviet2.png", 80),
            new Enemy("Soviet Soldier", 175, 2, 0, 1, "/assets/soviet1.png", 100),
            new Enemy("Soviet Soldier", 200, 2, 0, 1, "/assets/soviet3.png", 70),
            new Enemy("Soviet Soldier", 215, 2, 0, 1, "/assets/soviet2.png", 60),
            new Enemy("Soviet Soldier", 250, 2, 0, 1, "/assets/soviet2.png", 80),
            new Enemy("Soviet Soldier", 550, 2, 0, 1, "/assets/soviet1.png", 100),
            new Enemy("Brezhnev", 900, 4, 2, 3, "/assets/brezhnev.png", 250, true),
            new Enemy("Aleksander", 1200, 4, 2, 3, "/assets/alexander2.png", 500, true),
        ],
    },
    middle_ages: {
        name: "Middle Ages",
        enemies: [
            new Enemy("Knight", 400, 2, 0, 1, "/assets/knight1.png", 30),
            new Enemy("Albanian Knight", 425, 2, 0, 1, "/assets/knight2.png", 30),
            new Enemy("Crusader", 435, 2, 0, 1, "/assets/knight3.png", 40),
            new Enemy("Dark Knight", 475, 2, 0, 1, "/assets/knight4.png", 50),
            new Enemy("Bosnian Knight", 525, 2, 0, 1, "/assets/knight5.png", 30),
            new Enemy("Cathar Knight", 550, 2, 0, 1, "/assets/knight6.png", 30),
            new Enemy("Goth Knight", 575, 2, 0, 1, "/assets/knight7.png", 40),
            new Enemy("Teutonic", 800, 2, 0, 1, "/assets/knight8.png", 50),
            new Enemy("Barbarossa", 1400, 4, 2, 3, "/assets/barbarossa.png", 100, true),
            new Enemy("Armenian King", 2200, 4, 2, 3, "/assets/armenianking.png", 250, true),
        ],
    },
    kings: {
        name: "Kings",
        enemies: [
            new Enemy("Saladin", 3400, 2, 0, 1, "/assets/saladin.png", 30, false, false),
            new Enemy("Stefan Dusan", 3700, 2, 0, 1, "/assets/dusan.png", 30, false, false),
            new Enemy("Victor Emmanuel", 425, 2, 0, 1, "/assets/emmanuel.png", 40, false, true),
            new Enemy("Achaemenid", 6000, 2, 0, 1, "/assets/achaemenid.png", 50, false, false),
            new Enemy("Charles IV", 6250, 2, 0, 1, "/assets/charles4.png", 30, false, false),
            new Enemy("Clovis I", 6800, 2, 0, 1, "/assets/clovis.png", 30, false, false),
            new Enemy("Charlemagne", 7600, 4, 2, 3, "/assets/charlemagne.png", 100, true, false),
            new Enemy("Kratos, God of War", 8000, 4, 2, 3, "/assets/kratos.png", 250, true, true),
        ],
    }
}