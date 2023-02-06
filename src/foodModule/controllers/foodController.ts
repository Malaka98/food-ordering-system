import {
    BaseHttpController,
    controller,
    httpGet,
    httpPost,
    request,
    requestBody,
    response
} from "inversify-express-utils";
import {FoodService} from "../services/foodService";
import {inject} from "inversify";
import {TYPES} from "../../types";
import express from "express";
import {AuthMiddleware} from "../../middlewares/authMiddleware";
import {FoodDto} from "../dto/foodDto";

@controller("/food")
export class FoodController extends BaseHttpController {
    private foodService: FoodService;

    constructor(@inject(TYPES.FoodService) foodService: FoodService) {
        super();
        this.foodService = foodService;
    }

    @httpGet("/")
    public async getAllFoodsController(@request() req: express.Request, @response() res: express.Response): Promise<express.Response> {
        try {
            const foods: Array<any> = await this.foodService.getAllFoodService()
            return this.json({message: foods}, 200)
        } catch (e) {
            return this.json({message: e.message}, 500);
        }
    }

    @httpPost("/", AuthMiddleware.authenticate)
    public async addFoodController(@requestBody() foodDto: FoodDto): Promise<express.Response> {
        try {
            const food = await this.foodService.addFoodService(foodDto)
            return this.json({message: food}, 200)
        } catch (e) {
            return this.json({message: e.message}, 500);
        }
    }

    @httpGet("/:foodId")
    public async getFoodByIdController(): Promise<express.Response> {
        try {
            const foodId = this.httpContext.request.params.foodId
            const food = await this.foodService.getFoodByIdService(foodId)
            return this.json({message: food}, 200)
        } catch (e) {
            return this.json({message: e.message}, 500);
        }
    }

}
