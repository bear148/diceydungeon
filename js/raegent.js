import { CRAFTABLE_ITEM_TYPE, CRAFTING_MATERIAL_TYPE } from "./enums";

export class Crafting_Material {
    constructor(name, quantity, type) {
        this.name = name;
        this.quantity = quantity;

        switch (type)  {
            case CRAFTING_MATERIAL_TYPE.gem:
                break;
            case CRAFTING_MATERIAL_TYPE.essence:
                break;
            case CRAFTING_MATERIAL_TYPE.dust:
                break;
            case CRAFTING_MATERIAL_TYPE.fragment:
                break;
            case CRAFTING_MATERIAL_TYPE.string:
                break;
            case CRAFTING_MATERIAL_TYPE.stick:
                break;
            default:
                throw new Error(`Unknown material type: ${type}`);
        }
    }
}