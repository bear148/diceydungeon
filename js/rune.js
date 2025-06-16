import { DAMAGE_TYPE } from "./enums.js";

export class Rune {
    constructor() {
        this.generate();
    }

    generate() {
        const rune = this.getRandomRune();
        this.name = rune.name;
        this.buffType = rune.buffType;
        this.icon = rune.icon;
        this.buff = Math.random();
    }

    getRandomRune() {
        const runes = [
            {
                name: "Abyss",
                buffType: [DAMAGE_TYPE.chaos, "Chaos"],
                icon: "/assets/runes/rune_abyss.png"
            },
            {
                name: "Cerebov",
                buffType: [DAMAGE_TYPE.fire, "Fire"],
                icon: "/assets/runes/rune_cerebov_new.png"
            },
            {
                name: "Cocytus",
                buffType: [DAMAGE_TYPE.ice, "Ice"],
                icon: "/assets/runes/rune_cocytus_new.png"
            },
            {
                name: "Demonic",
                buffType: [DAMAGE_TYPE.chaos, "Chaos"],
                icon: "/assets/runes/rune_demonic_4.png"
            },
            {
                name: "Gehenna",
                buffType: [DAMAGE_TYPE.fire, "Fire"],
                icon: "/assets/runes/rune_gehenna_new.png"
            },
            {
                name: "Gloorx Vloq",
                buffType: [DAMAGE_TYPE.poison, "Poison"],
                icon: "/assets/runes/rune_gloorx_vloq_new.png"
            },
            {
                name: "Slime",
                buffType: [DAMAGE_TYPE.poison, "Poison"],
                icon: "/assets/runes/rune_slime.png"
            },
            {
                name: "Spider",
                buffType: [DAMAGE_TYPE.poison, "Poison"],
                icon: "/assets/runes/rune_spider.png"
            },
            {
                name: "Swamp",
                buffType: [DAMAGE_TYPE.poison, "Poison"],
                icon: "/assets/runes/rune_swamp.png"
            },
            {
                name: "Vaults",
                buffType: [DAMAGE_TYPE.physical, "Physical"],
                icon: "/assets/runes/rune_vaults.png"
            },
        ];

        return runes[Math.floor(Math.random() * runes.length)];
    }
}