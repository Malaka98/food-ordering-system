import {FoodService} from "../foodService";
import {inject, injectable} from "inversify";
import {FoodRepository} from "../../repositories/foodRepository";
import {TYPES} from "../../../types";

@injectable()
export class FoodServiceImpl implements FoodService {

  private foodRepository: FoodRepository;

  constructor(@inject(TYPES.FoodRepository) foodRepository: FoodRepository) {
    this.foodRepository = foodRepository;
  }


}
