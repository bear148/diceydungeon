import { ITEM_TYPE, RARITY } from "./enums.js";
import { getRandomInt, getRandomWeaponImage, getRandomArmorImage } from "./util.js";

export class Item {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.rarityID = this.getRandomRarity();

        if (type == ITEM_TYPE.weapon) {
            this.icon = getRandomWeaponImage();
        } else if (type == ITEM_TYPE.armor) {
            this.icon = getRandomArmorImage();
        } else {    
            this.icon = "/assets/heal.png";
            this.rarityID = RARITY.common;
        }
        
        this.stats = [];

        this.generateStats();
    }

    generate() {
        return {
            name: this.name,
            type: this.type,
            icon: this.icon,
            rarity: {
                rarityID: this.rarityID,
                rarityName: this.getRarityTitle(),
            },
            stats: this.stats
        }
    }

    generateStats() {
        switch (this.type) {
            case ITEM_TYPE.weapon:
                this.stats = {
                    type: "Damage",
                    amount: getRandomInt(1, 8) * this.rarityID,
                }
                break;
            case ITEM_TYPE.potion: {
                this.stats = {
                    type: "Healing",
                    amount: 20,
                }
                break;
            }
            case ITEM_TYPE.armor: {
                this.stats = {
                    type: "Defense",
                    amount: getRandomInt(5, 10) * this.rarityID,
                }
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

    getRarityTitle() {
        switch(this.rarityID) {
            case 1:
                return "common";
            case 2:
                return "uncommon";
            case 3:
                return "rare";
            case 4:
                return "epic";
            case 5:
                return "legendary";
            case 6:
                return "exalted";
            default:
                return "programmer sux lol";
        }
    }
}