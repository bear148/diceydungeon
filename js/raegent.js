import { CRAFTING_MATERIAL_TYPE } from "./enums";

export class Crafting_Material {
    constructor(quantity, type) {
        this.quantity = quantity;
        this.type = type;

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