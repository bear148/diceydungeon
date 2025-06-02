import { ITEM_TYPE } from "./enums.js";
import { PLAYER } from "./game.js";
import { formalArmorName, hideTooltip, showTooltip, refreshPlayerStats } from "./util.js";

const useButton = document.getElementById("use-item");
const sellButton = document.getElementById("sell-item");

export class Inventory {
    constructor(container) {
        this.container = container;
        this.items = [];
        this.maxItems = 60;
        this.currentItem = null;
        this.currentItemElement = null;
        this.itemPopup = document.getElementById("item-menu");

        this.eqiuppedArmor = document.getElementsByClassName("armor");
        this.statElements = document.getElementsByClassName("stat");

        this.init();
    }

    init() {
        sellButton.addEventListener("click", () => {
            if (!this.currentItem) return;
            if (this.currentItem.type === ITEM_TYPE.potion) return;

            PLAYER.coins += this.currentItem.value; // Assuming PLAYER has a gold property
            this.removeItem(this.currentItem);
            if (this.currentItemElement) {
                this.currentItemElement.remove();
            }
            refreshPlayerStats();
            this.hideItemPopup();
        });

        // Attach use button listener once
        useButton.addEventListener("click", () => {
            if (!this.currentItem) return;

            if (this.currentItem.type === ITEM_TYPE.potion) {
                PLAYER.health += this.currentItem.stats.amount;
                if (PLAYER.health > PLAYER.maxHealth) PLAYER.health = PLAYER.maxHealth;
                this.removeItem(this.currentItem);
            } else if (this.currentItem.type === ITEM_TYPE.armor) {
                this.equip(formalArmorName(this.currentItem.stats.location).toLowerCase(), this.currentItem);
                PLAYER.defense += this.currentItem.stats.amount;
            } else if (this.currentItem.type === ITEM_TYPE.weapon) {
                this.equip("hand", this.currentItem);
                PLAYER.attack += this.currentItem.stats.amount;
            } else if (this.currentItem.type === ITEM_TYPE.spell) {
                this.spellEquip(this.currentItem);
            }

            if (this.currentItemElement) {
                this.currentItemElement.remove();
            }

            refreshPlayerStats();
            this.hideItemPopup();
        });

        // Attach document click listener once to hide popup when clicking outside
        document.addEventListener("click", () => {
            this.hideItemPopup();
        });
    }

    addItem(item) {
        let itemElement = document.createElement("img");
        itemElement.classList.add("grid-item");
        itemElement.src = item.icon;
        itemElement.addEventListener("click", (event) => {
            event.stopPropagation(); // prevent document click hiding popup
            this.showItemPopup(event.clientX, event.clientY, itemElement, item);
        });

        itemElement.addEventListener("mouseenter", () => {
            let content = `
                <p class="item-title">${item.name}</p>
                <p class="item-stat">${item.stats.type}: ${item.stats.amount}</p>
            `;

            if (item.type === ITEM_TYPE.weapon) {
                content += `<p class="item-speed">Speed: ${item.stats.speed[1]}</p>`;
            }

            content += `<p class="item-rarity ${item.rarity.rarityName}">${item.rarity.rarityName}</p>`;

            showTooltip(content, event.clientX, event.clientY);
        });

        itemElement.addEventListener("mouseleave", () => {
            hideTooltip();
        });

        this.container.appendChild(itemElement);

        if (this.items.length < this.maxItems) {
            this.items.push(item);
        } else {
            console.log("Inventory is full");
        }
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        } else {
            console.log("Item not found in inventory");
        }
    }

    getItems() {
        return this.items;
    }

    showItemPopup(x, y, itemElement, item) {
        this.currentItemElement = itemElement;
        this.currentItem = item;
        document.getElementById("sell-item").classList.remove("hidden");

        useButton.innerText = "Use";
        if (item.type != ITEM_TYPE.potion) {
            useButton.innerText = "Equip";
            document.getElementById("item-value").innerText = item.value;
        } else {
            document.getElementById("sell-item").classList.add("hidden");
        }

        this.itemPopup.style.left = x + "px";
        this.itemPopup.style.top = y + "px";

        this.itemPopup.classList.remove("hidden");
    }

    hideItemPopup() {
        this.itemPopup.classList.add("hidden");
        this.currentItem = null;
        this.currentItemElement = null;
    }

    equip(loc) {
        switch (loc) {
            case "head":
                this.eqiuppedArmor[0].src = this.currentItem.icon;
                this.statElements[0].innerHTML = `Armor: ${this.currentItem.stats.amount}`;
                this.statElements[0].className = `stat ${this.currentItem.rarity.rarityName}`;
                if (!PLAYER.armor.head) {
                    PLAYER.armor.head = this.currentItem;
                    break;
                }
                this.addItem(PLAYER.armor.head);
                PLAYER.defense -= PLAYER.armor.head.stats.amount;
                PLAYER.armor.head = this.currentItem;
                break;
            case "chest":
                this.eqiuppedArmor[1].src = this.currentItem.icon;
                this.statElements[1].innerHTML = `Armor: ${this.currentItem.stats.amount}`;
                this.statElements[1].className = `stat ${this.currentItem.rarity.rarityName}`;
                if (!PLAYER.armor.chest) {
                    PLAYER.armor.chest = this.currentItem;
                    break;
                }
                this.addItem(PLAYER.armor.chest);
                PLAYER.defense -= PLAYER.armor.chest.stats.amount;
                PLAYER.armor.chest = this.currentItem;
                break;
            case "boots":
                this.eqiuppedArmor[2].src = this.currentItem.icon;
                this.statElements[2].innerHTML = `Armor: ${this.currentItem.stats.amount}`;
                this.statElements[2].className = `stat ${this.currentItem.rarity.rarityName}`;
                if (!PLAYER.armor.boots) {
                    PLAYER.armor.boots = this.currentItem;
                    break;
                }
                this.addItem(PLAYER.armor.boots);
                PLAYER.defense -= PLAYER.armor.boots.stats.amount;
                PLAYER.armor.boots = this.currentItem;
                break;
            case "gloves":
                this.eqiuppedArmor[3].src = this.currentItem.icon;
                this.statElements[3].innerHTML = `Armor: ${this.currentItem.stats.amount}`;
                this.statElements[3].className = `stat ${this.currentItem.rarity.rarityName}`;
                if (!PLAYER.armor.gloves) {
                    PLAYER.armor.gloves = this.currentItem;
                    break;
                }
                this.addItem(PLAYER.armor.gloves);
                PLAYER.defense -= PLAYER.armor.gloves.stats.amount;
                PLAYER.armor.gloves = this.currentItem;
                break;
            case "hand":
                document.getElementById("hands-image").src = this.currentItem.icon;
                this.statElements[4].innerHTML = `Damage: ${this.currentItem.stats.amount}`;
                this.statElements[4].className = `stat ${this.currentItem.rarity.rarityName}`;
                PLAYER.speed = this.currentItem.stats.speed[0];
                if (!PLAYER.weapon) {
                    PLAYER.weapon = this.currentItem;
                    break;
                }
                this.addItem(PLAYER.weapon);
                PLAYER.attack -= PLAYER.weapon.stats.amount;
                PLAYER.weapon = this.currentItem;
                break;
        }
    }

    spellEquip(spell) {
        let options = document.getElementsByClassName("dice-option");

        document.getElementById("equipped-spells").innerHTML += `
        <p><span class="espell ${spell.rarity.rarityName}">${spell.name} ${spell.stats.amount}</span></p>
        `;

        for (let i = 0; i < options.length; i++) {
            let spellOption = document.createElement("option");
            spellOption.value = (PLAYER.skills.length > 0) ? PLAYER.skills.length-1 : 0;
            spellOption.textContent = `${spell.name}: ${spell.stats.amount}`;
            options[i].appendChild(spellOption);
        }
    }

    clear() {
        this.items = [];
        this.container.innerHTML = ""; // Clear the container

        this.eqiuppedArmor[0].src = "/assets/placeholderhelm.png";
        this.eqiuppedArmor[1].src = "/assets/placeholderchest.png";
        this.eqiuppedArmor[2].src = "/assets/placeholderboots.png";
        this.eqiuppedArmor[3].src = "/assets/placeholdergloves.png";
        document.getElementById("hands-image").src = "/assets/placeholderweapon.png";
    }
}