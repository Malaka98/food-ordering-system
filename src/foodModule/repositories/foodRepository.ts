import {food} from "../model/food";

export interface FoodRepository {
    addFood(foodModel: typeof food): Promise<any>

    getAllFood(): Promise<any>

    deleteFoodById(id: string): Promise<any>

    getFoodById(id: string): Promise<any>

    searchFoodByName(name: string): Promise<any>
}
