export class Inventory {
    constructor(container) {
        this.container = container;
        this.items = [];
        this.maxItems = 20;

        this.init();
    }

    init() {

    }

    addItem(item) {
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
}