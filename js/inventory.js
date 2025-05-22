import { ITEM_TYPE } from "./enums.js";
import { PLAYER } from "./game.js";
import { hideTooltip, showTooltip } from "./util.js";

const useButton = document.getElementById("use-item");

export class Inventory {
    constructor(container) {
        this.container = container;
        this.items = [];
        this.maxItems = 60;
        this.currentItem = null;
        this.currentItemElement = null;
        this.itemPopup = document.getElementById("item-menu");

        this.init();
    }

    init() {
        // Attach use button listener once
        useButton.addEventListener("click", () => {
            if (!this.currentItem) return;

            console.log("Using item:", this.currentItem);

            PLAYER.health += this.currentItem.stats.amount;
            if (PLAYER.health > 100) PLAYER.health = 100;

            this.removeItem(this.currentItem);

            if (this.currentItemElement) {
                this.currentItemElement.remove();
            }

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

        if (item.type === ITEM_TYPE.potion) {
            itemElement.addEventListener("click", (event) => {
                event.stopPropagation(); // prevent document click hiding popup
                this.showItemPopup(event.clientX, event.clientY, itemElement, item);
            });
        }

        itemElement.addEventListener("mouseenter", () => {
            let content = `
                <p class="item-title">${item.name}</p>
                <p class="item-stat">${item.stats.type}: ${item.stats.amount}</p>
                <p class="item-rarity ${item.rarity.rarityName}">${item.rarity.rarityName}</p>
            `;

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

        this.itemPopup.style.left = x + "px";
        this.itemPopup.style.top = y + "px";

        this.itemPopup.classList.remove("hidden");
    }

    hideItemPopup() {
        this.itemPopup.classList.add("hidden");
        this.currentItem = null;
        this.currentItemElement = null;
    }
}