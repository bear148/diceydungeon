import { ITEM_TYPE, RARITY } from "./enums.js";
import { getRandomInt, getRandomWeaponImage } from "./util.js";

export class Item {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.icon = getRandomWeaponImage();
        this.rarity = this.getRandomRarity();
        this.stats = [];

        this.generateStats();
    }

    generate() {
        return {
            name: this.name,
            type: this.type,
            icon: this.icon,
            rarity: this.rarity,
            stats: this.stats
        }
    }

    generateStats() {
        if (this.type == ITEM_TYPE.weapon) {
            this.stats = {
                damage: getRandomInt(1, 8) * this.rarity,
            }
        }
    }

    getRandomRarity() {
        let rng = getRandomInt(0, 101);

        if (rng <= 50) {
            return RARITY.common;
        } else if (rng > 50 && rng <= 75) {
            return RARITY.uncommon;
        } else if (rng > 75 && rng <= 90) {
            return RARITY.rare;
        } else if (rng > 90 && rng <= 97) {
            return RARITY.epic;
        } else if (rng > 97 && rng <= 99) {
            return RARITY.legendary;
        } else {
            return RARITY.exalted;
        }
    }
}