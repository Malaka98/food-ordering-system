import {BaseHttpController, controller, httpPost, request, response} from "inversify-express-utils";
import {FoodService} from "../services/foodService";
import {inject} from "inversify";
import {TYPES} from "../../types";
import express from "express";

@controller("/food")
export class FoodController extends BaseHttpController {
  private foodService: FoodService;

  constructor(@inject(TYPES.FoodService) foodService: FoodService) {
    super();
    this.foodService = foodService;
  }

    @httpPost("/")
  public async getAllFoodsController(@request() req: express.Request, @response() res: express.Response) {
    try {

    } catch (e) {
      return this.json({message: e.message}, 500);
    }
  }
}
