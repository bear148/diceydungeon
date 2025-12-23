import { CRAFTING_MATERIAL_TYPE, ITEM_TYPE } from "./enums.js";

class Crafting_Material {
    constructor(quantity, type) {
        this.quantity = quantity;
        this.type = type;
        this.quality = 0; //0, 1, 2

        switch (this.type)  {
            case CRAFTING_MATERIAL_TYPE.gem:
                console.log("Created gem material");
                this.name = "Gem";
                break;
            case CRAFTING_MATERIAL_TYPE.essence:
                console.log("Created essence material");
                this.name = "Essence";
                break;
            case CRAFTING_MATERIAL_TYPE.fragment:
                console.log("Created fragment material");
                this.name = "Fragment";
                break;
            case CRAFTING_MATERIAL_TYPE.string:
                console.log("Created string material");
                this.name = "String";
                break;
            case CRAFTING_MATERIAL_TYPE.stick:
                console.log("Created stick material");
                this.name = "Stick";
                break;
            default:
                throw new Error(`Unknown material type: ${this.type}`);
        }
    }
}

class Crafting_Manager {
    constructor() {
        this.recipes = [];
    }

    add_recipe(recipe) {
        this.recipes.push(recipe);
    }

    craft_item(items) {
        /*
            Quality will be an important factor for determining what the product of the crafting process.
            The quality of the crafting raegents will be used to determine the level of the final product.
        */

        if (items == {} || items === undefined) {
            throw new Error("No items provided");
        }

        console.log(items);
    }
}

export { Crafting_Material, Crafting_Manager };