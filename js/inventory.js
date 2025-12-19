import { ITEM_TYPE } from "./enums.js";
import { PLAYER, updatePlayerAttack } from "./game.js";
import { formalArmorName, hideTooltip, showTooltip, refreshPlayerStats, toggleVisibility } from "./util.js";

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
        this.socketPopup = document.getElementById("socket-menu");
        this.socketOptions = document.getElementsByClassName("socket-option");

        this.eqiuppedArmor = document.getElementsByClassName("armor");
        this.statElements = document.getElementsByClassName("stat");

        this.init();
    }

    init() {
        this.socketPopup.addEventListener("click", (e) => {
            e.stopPropagation();
        });

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
        useButton.addEventListener("click", (event) => {
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
            } else if (this.currentItem.type === ITEM_TYPE.spell) {
                this.spellEquip(this.currentItem);
            } else if (this.currentItem.type === ITEM_TYPE.xp_book) {
                PLAYER.xp += this.currentItem.stats.amount;
                this.removeItem(this.currentItem);
            } else if (this.currentItem.type === ITEM_TYPE.rune) {
                event.stopPropagation(); // <-- Add this line
                this.socket(this.currentItem, event.x, event.y);
            }

            if (this.currentItemElement && this.currentItem.type !== ITEM_TYPE.rune) {
                this.currentItemElement.remove();
            }

            if (this.currentItem.type !== ITEM_TYPE.rune) {
                this.hideItemPopup();
            }

            refreshPlayerStats();
        });

        // Attach document click listener once to hide popup when clicking outside
        document.addEventListener("click", () => {
            this.hideItemPopup();
            this.hideSocketPopup();
        });
    }

    addItem(item) {
        let itemContainer = document.createElement("div");
        let itemElement = document.createElement("img");
        let itemQuantityElement = document.createElement("span");

        itemContainer.classList.add("grid-item");
        itemContainer.appendChild(itemElement);
        itemContainer.appendChild(itemQuantityElement);

        itemElement.src = item.icon;
        itemElement.classList.add("item-icon");

        itemQuantityElement.classList.add("item-quantity");

        if (item.stats.quantity && item.stats.quantity > 1) {
            itemQuantityElement.innerText = item.stats.quantity;
        } else {
            itemQuantityElement.innerText = "1";
        }

        itemContainer.addEventListener("click", (event) => {
            event.stopPropagation(); // prevent document click hiding popup
            this.showItemPopup(event.clientX, event.clientY, itemElement, item);
        });

        itemContainer.addEventListener("mouseenter", () => {
            let content = `
                <p class="item-title">${(item.type === ITEM_TYPE.weapon) ? "<span class='prefix'>" + item.stats.speed[1] + "</span>" + " " + item.name + " of " + `<span class='affix ${item.stats.damageType}'>` + item.stats.damageType + "</span>" : item.name}</p>
                <p class="item-stat">${item.stats.type}: ${(item.type === ITEM_TYPE.rune) ? `${item.stats.amount}%` : item.stats.quantity}</p>
            `;

            if (item.type === ITEM_TYPE.weapon) {
                content += `<p class="item-stat">Sockets: ${item.availableSockets}</p>`;
            }

            content += `<p class="item-rarity ${item.rarity.rarityName}">${item.rarity.rarityName}</p>`;

            showTooltip(content, event.clientX, event.clientY);
        });

        itemContainer.addEventListener("mouseleave", () => {
            hideTooltip();
        });

        this.container.appendChild(itemContainer);

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
        if (item.type === ITEM_TYPE.crafting_material) return; // No popup for crafting materials
        
        this.currentItemElement = itemElement;
        this.currentItem = item;
        document.getElementById("sell-item").classList.remove("hidden");
        toggleVisibility(document.getElementById("sell-item"), false);

        if (item.type === ITEM_TYPE.potion || item.type === ITEM_TYPE.xp_book) {
            useButton.innerText = "Use";
        } else if (item.type === ITEM_TYPE.rune) {
            useButton.innerText = "Socket";
        } else if (item.type === ITEM_TYPE.crafting_material) {
            toggleVisibility(useButton, false);
        } else {
            useButton.innerText = "Equip";
            document.getElementById("item-value").innerText = item.value;
            toggleVisibility(document.getElementById("sell-item"), true);
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
        let index = 0;
        this.currentItem.sockets = this.currentItem.availableSockets; // Reset available sockets when equipping

        switch (loc) {
            case "head":
                index = 0;
                this.eqiuppedArmor[0].src = this.currentItem.icon;
                this.statElements[0].innerHTML = `Armor: ${this.currentItem.stats.amount}`;
                this.statElements[0].className = `stat ${this.currentItem.rarity.rarityName}`;
                // Return runes to inventory before replacing
                if (PLAYER.armor.head && PLAYER.armor.head.runes && PLAYER.armor.head.runes.length > 0) {
                    PLAYER.armor.head.runes.forEach(rune => {
                        this.addItem(rune);
                    });
                    PLAYER.armor.head.runes = []; // Clear runes from the old armor
                }
                this.socketClear(index); // Clear rune sockets in the DOM for this slot
                if (PLAYER.armor.head) {
                    this.addItem(PLAYER.armor.head);
                    PLAYER.defense -= PLAYER.armor.head.stats.amount;
                }
                PLAYER.armor.head = this.currentItem;
                break;
            case "chest":
                index = 1;
                this.eqiuppedArmor[1].src = this.currentItem.icon;
                this.statElements[1].innerHTML = `Armor: ${this.currentItem.stats.amount}`;
                if (PLAYER.armor.chest) {
                    this.addItem(PLAYER.armor.chest);
                    PLAYER.defense -= PLAYER.armor.chest.stats.amount;
                }
                PLAYER.armor.chest = this.currentItem;
                break;
            case "boots":
                index = 2;
                this.eqiuppedArmor[2].src = this.currentItem.icon;
                this.statElements[2].innerHTML = `Armor: ${this.currentItem.stats.amount}`;
                this.statElements[2].className = `stat ${this.currentItem.rarity.rarityName}`;
                if (PLAYER.armor.boots) {
                    this.addItem(PLAYER.armor.boots);
                    PLAYER.defense -= PLAYER.armor.boots.stats.amount;
                }
                PLAYER.armor.boots = this.currentItem;
                break;
            case "gloves":
                index = 3;
                this.eqiuppedArmor[3].src = this.currentItem.icon;
                this.statElements[3].innerHTML = `Armor: ${this.currentItem.stats.amount}`;
                this.statElements[3].className = `stat ${this.currentItem.rarity.rarityName}`;
                if (PLAYER.armor.gloves) {
                    this.addItem(PLAYER.armor.gloves);
                    PLAYER.defense -= PLAYER.armor.gloves.stats.amount;
                }
                PLAYER.armor.gloves = this.currentItem;
                break;
            case "hand":
                index = 4;
                document.getElementById("hands-image").src = this.currentItem.icon;
                this.statElements[4].innerHTML = `Speed: ${this.currentItem.stats.speed[1]}`;
                this.statElements[5].innerHTML = `Damage: ${this.currentItem.stats.amount}`;
                this.statElements[5].className = `stat ${this.currentItem.rarity.rarityName}`;
                this.statElements[6].className = `stat ${this.currentItem.stats.damageType}`;
                this.statElements[6].innerHTML = `<span class="affix ${this.currentItem.stats.damageType}">${this.currentItem.stats.damageType}</span>`;
                PLAYER.speed = this.currentItem.stats.speed[0];

                // 1. Subtract old weapon's attack (including rune bonuses)
                if (PLAYER.hand) {
                    PLAYER.attack -= PLAYER.hand.stats.amount;
                }

                // 2. Return runes to inventory before replacing
                if (PLAYER.hand && PLAYER.hand.runes && PLAYER.hand.runes.length > 0) {
                    PLAYER.hand.runes.forEach(rune => {
                        this.addItem(rune);
                    });
                    PLAYER.hand.runes = [];
                }

                // 3. Reset stats.amount to base_amount for the old weapon (for inventory)
                if (PLAYER.hand) {
                    PLAYER.hand.stats.amount = PLAYER.hand.stats.base_amount;
                    this.addItem(PLAYER.hand);
                }

                this.socketClear(index);

                // 4. Equip new weapon and DO NOT reset its amount to base
                PLAYER.hand = this.currentItem;
                if (typeof PLAYER.hand.stats.amount !== "number" || isNaN(PLAYER.hand.stats.amount)) {
                    PLAYER.hand.stats.amount = PLAYER.hand.stats.base_amount || 0;
                }
                PLAYER.attack += PLAYER.hand.stats.amount;
                break;
        }
        this.removeItem(this.currentItem);
    }

    spellEquip(spell) {
        let options = document.getElementsByClassName("dice-option");

        document.getElementById("equipped-spells").innerHTML += `
        <p><span class="espell ${spell.rarity.rarityName}">${spell.name} ${spell.stats.amount}</span></p>
        `;

        for (let i = 0; i < options.length; i++) {
            let spellOption = document.createElement("option");
            spellOption.value = (PLAYER.skills.length > 0) ? PLAYER.skills.length - 1 : 0;
            spellOption.textContent = `${spell.name}: ${spell.stats.amount}`;
            options[i].appendChild(spellOption);
        }
    }

    socket(rune, x, y) {
        // Show the socket popup at the correct position
        this.socketPopup.style.left = x + "px";
        this.socketPopup.style.top = y + "px";
        toggleVisibility(this.socketPopup, true);

        // Clear previous options
        this.socketPopup.innerHTML = ""; // Clear previous content
        this.socketPopup.innerHTML = "<h3>Socket Rune To:</h3>";

        // Gather socketable items (example: equipped weapon and armor)
        const socketable = [];
        if (PLAYER.hand && PLAYER.hand.sockets != 0) socketable.push({ slot: "w", item: PLAYER.hand });

        // Create a button for each socketable item
        socketable.forEach(({ slot, item }) => {
            const btn = document.createElement("button");
            btn.innerText = item.name;
            btn.onclick = () => {
                if (!item.runes) item.runes = [];
                item.runes.push(rune);
                item.stats.base_amount = item.stats.amount;

                // Create a container for the rune image and subtitle
                const runeContainer = document.createElement("div");
                runeContainer.classList.add("rune-socket-container");

                // Create the rune image
                const runeElement = document.createElement("img");
                runeElement.classList.add("socket");
                runeElement.src = rune.icon;
                runeElement.alt = "Socket";

                // Create the subtitle
                const subtitle = document.createElement("div");
                subtitle.classList.add("rune-subtitle");
                subtitle.innerText = `${rune.buffType[1]}: ${rune.stats.amount}%`;

                // Append image and subtitle to the container
                runeContainer.appendChild(runeElement);
                runeContainer.appendChild(subtitle);

                // Append the container to the socket area
                document.getElementById(slot).children[2].appendChild(runeContainer);

                item.sockets -= 1;

                console.log("base_amount:", item.stats.base_amount, "amount:", item.stats.amount, "runes:", item.runes);

                // Always recalculate from base_amount
                let base = Number(item.stats.base_amount);
                if (isNaN(base) || base === 0) base = Number(item.stats.amount) || 0; // fallback
                let totalBonus = 0;
                if (item.runes && item.runes.length > 0) {
                    for (const r of item.runes) {
                        let bonus = Number(r.stats.amount);
                        if (!isNaN(bonus)) totalBonus += bonus;
                    }
                }
                item.stats.amount = base + base * (totalBonus / 100);

                updatePlayerAttack();
                this.updateItemStats();
                this.removeItem(rune);
                if (this.currentItemElement) this.currentItemElement.remove();
                this.hideSocketPopup();
            };
            this.socketPopup.appendChild(btn);
        });
        // Optionally, add a cancel button
        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.onclick = () => this.hideSocketPopup();
        this.socketPopup.appendChild(cancelBtn);
    }

    socketClear(index) {
        let DOMItem = document.getElementsByClassName("armor-grid-item")[index].children[2];

        DOMItem.innerHTML = ""; // Clear previous sockets
    }

    hideSocketPopup() {
        toggleVisibility(this.socketPopup, false);
        this.hideItemPopup();
    }

    updateItemStats() {
        this.statElements[5].innerHTML = `Damage: ${Math.round(Number(PLAYER.hand.stats.amount))}`;
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