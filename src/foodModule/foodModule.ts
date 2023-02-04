import {ContainerModule, interfaces} from "inversify";
import {FoodRepository} from "./repositories/foodRepository";
import {TYPES} from "../types";
import {FoodRepositoryImpl} from "./repositories/impl/foodRepositoryImpl";
import {FoodService} from "./services/foodService";
import {FoodServiceImpl} from "./services/impl/foodServiceImpl";
import {FoodController} from "./controllers/foodController";

const FoodModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<FoodRepository>(TYPES.FoodRepository).to(FoodRepositoryImpl);
  bind<FoodService>(TYPES.FoodService).to(FoodServiceImpl);
  bind<FoodController>(TYPES.FoodController).to(FoodController);
});

export default FoodModule;
