import {FoodService} from "../foodService";
import {inject, injectable} from "inversify";
import {FoodRepository} from "../../repositories/foodRepository";
import {TYPES} from "../../../types";
import {FoodDto} from "../../dto/foodDto";
import {food} from "../../model/food";

@injectable()
export class FoodServiceImpl implements FoodService {

    private foodRepository: FoodRepository;

    constructor(@inject(TYPES.FoodRepository) foodRepository: FoodRepository) {
        this.foodRepository = foodRepository;
    }

    async addFoodService(foodDto: FoodDto): Promise<any> {
        try {
            const foodModel = new food({
                name: foodDto.name,
                price: foodDto.price,
                category: foodDto.category,
                imgUri: foodDto.imgUri,
                description: foodDto.description
            })
            return await this.foodRepository.addFood(foodModel)
        } catch (e) {
            throw e
        }
    }

    async deleteFoodByIdService(id: string): Promise<any> {
        try {

        } catch (e) {
            throw e
        }
    }

    async getAllFoodService(): Promise<any> {
        try {
            return await this.foodRepository.getAllFood()
        } catch (e) {
            throw e
        }
    }

    async getFoodByIdService(id: string): Promise<any> {
        try {

        } catch (e) {
            throw e
        }
    }

    async searchFoodByNameService(name: string): Promise<any> {
        try {

        } catch (e) {
            throw e
        }
    }


}
