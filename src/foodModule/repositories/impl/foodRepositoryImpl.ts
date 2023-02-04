import {FoodRepository} from "../foodRepository";
import {injectable} from "inversify";
import {food} from "../../model/food";

@injectable()
export class FoodRepositoryImpl implements FoodRepository {
    async addFood(foodModel): Promise<any> {
        try {
            return await foodModel.save();
        } catch (e) {
            throw e;
        }
    }

    async deleteFoodById(id: string): Promise<any> {
        try {
            return await food.findByIdAndDelete(id);
        } catch (e) {
            throw e;
        }
    }

    async getAllFood(): Promise<any> {
        try {
            return await food.find();
        } catch (e) {
            throw e;
        }
    }

    async getFoodById(id: string): Promise<any> {
        try {
            return await food.findById(id);
        } catch (e) {
            throw e;
        }
    }

    async searchFoodByName(name: string): Promise<any> {
        try {
            return await food.find({name: {$regex: name, $options: "1"}});
        } catch (e) {
            throw e;
        }
    }

}
