import {FoodDto} from "../dto/foodDto";

export interface FoodService {
    addFoodService(foodDto: FoodDto): Promise<any>

    getAllFoodService(): Promise<any>

    deleteFoodByIdService(id: string): Promise<any>

    getFoodByIdService(id: string): Promise<any>

    searchFoodByNameService(name: string): Promise<any>
}
