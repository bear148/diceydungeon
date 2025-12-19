import { ITEM_TYPE, RARITY } from "./enums.js";
import { PLAYER } from "./game.js";
import { Crafting_Material } from "./raegent.js";
import { Rune } from "./rune.js";
import { getRandomInt, getRandomWeaponInfo, getRandomArmorImage, getRandomArmorType, formalArmorName, getRandomSpellImage, getRandomSpellName, getRandomBookImage, randomDamageType, RNG, getRandomCraftingMaterialType } from "./util.js";

export class Item {
    constructor(type) {
        this.type = type;
        this.rarityID = this.getRandomRarity();

        if (type == ITEM_TYPE.weapon) {
            let i = getRandomWeaponInfo();
            this.name = i[1];
            this.icon = i[0];
        } else if (type == ITEM_TYPE.armor) {
            this.armorType = getRandomArmorType();
            this.name = formalArmorName(this.armorType);
            this.icon = getRandomArmorImage(this.armorType);
        } else if (type == ITEM_TYPE.potion) {
            this.name = "Potion";
            this.icon = "/assets/heal.png";
            this.rarityID = RARITY.common;
        } else if (type == ITEM_TYPE.spell) {
            this.name = getRandomSpellName();
            this.icon = getRandomSpellImage();
        } else if (type == ITEM_TYPE.xp_book) {
            this.name = "XP Book";
            this.icon = getRandomBookImage();
            this.rarityID = RARITY.uncommon; // XP books are always uncommon
        } else if (type == ITEM_TYPE.rune) {
            let rune = new Rune();
            this.name = rune.name;
            this.icon = rune.icon;
            this.rarityID = RARITY.rune; // Runes are always legendary
            this.buffType = rune.buffType; // Buff type is specific to runes
        } else if (type == ITEM_TYPE.crafting_material) {
            let raegent = new Crafting_Material(getRandomInt(3, 10), getRandomCraftingMaterialType());
            this.name = raegent.name;
            this.icon = `/assets/crafting/${raegent.name.toLowerCase()}.png`;
            this.rarityID = RARITY.common;
            this.quantity = raegent.quantity; // Crafting materials are always common
        }
        
        this.stats = [];

        this.value = getRandomInt(1, 100) * this.rarityID; // Value is based on rarity

        this.generateStats();
    }

    generate() {
        let rTitle = this.getRarityTitle();
        let socketNumber = this.getRandomSocketNumber();

        return {
            name: this.name,
            type: this.type,
            icon: this.icon,
            rarity: {
                rarityID: this.rarityID,
                rarityName: rTitle,
            },
            stats: this.stats,
            value: this.value,
            sockets: socketNumber,
            availableSockets: socketNumber,
            runes: [],
            buffType: this.buffType || null,
            quantity: 1, 
            // Buff type is only for runes
        }
    }

    generateStats() {
        let dmg = getRandomInt(1, 8) * this.rarityID;

        switch (this.type) {
            case ITEM_TYPE.weapon:
                this.stats = {
                    type: "Damage",
                    base_amount: dmg,
                    amount: dmg,
                    speed: this.getRandomSpeed(),
                    damageType: randomDamageType(),
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
                    location: this.armorType,
                }
                break;
            }
            case ITEM_TYPE.spell: {
                this.stats = {
                    type: "Spell Power",
                    amount: getRandomInt(15, 30) * this.rarityID,
                }
                break;
            }
            case ITEM_TYPE.xp_book: {
                this.stats = {
                    type: "XP",
                    amount: getRandomInt(50, 100) * PLAYER.level,
                }
                break;
            }
            case ITEM_TYPE.rune: {
                this.stats = {
                    type: `${this.buffType[1]} Increase`,
                    btype: this.buffType[0],
                    amount: Math.round(Math.random() * 100),
                }
                break;
            }
            case ITEM_TYPE.crafting_material: {
                this.stats = {
                    type: "Crafting Material",
                    quantity: this.quantity,
                }
                break;
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
            case 7:
                return "rune";
            default:
                return "programmer sux lol";
        }
    }

    getRandomSpeed() {
        let rng = getRandomInt(0, 101);
        if (rng <= 50) {
            return [1000, "Normal"];
        } else if (rng > 50 && rng <= 75) {
            return [800, "Quick"];
        } else if (rng > 75 && rng <= 90) {
            return [650, "Fast"];
        } else if (rng > 90 && rng <= 97) {
            return [450, "Swift"];
        } else if (rng > 97 && rng <= 99) {
            return [300, "Very Fast"];
        } else {
            return [150, "Lightning Fast"];
        }
    }

    getRandomSocketNumber() {
        if (RNG(50)) {
            return 0; // 50% chance of no sockets
        } else if (RNG(30)) {
            return 1; // 30% chance of 1 socket
        } else if (RNG(15)) {
            return 2; // 15% chance of 2 sockets
        } else if (RNG(4)) {
            return 3; // 4% chance of 3 sockets
        } else {
            return 4; // 1% chance of 4 sockets
        }
    }
}