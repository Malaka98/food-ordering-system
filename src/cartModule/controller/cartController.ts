import {BaseHttpController} from "inversify-express-utils";
import {CartService} from "../service/cartService";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {CartDto} from "../dto/cartDto";

@injectable()
export class CartController extends BaseHttpController {

    private cartService: CartService

    constructor(@inject(TYPES.CartService) cartService: CartService) {
        super();

        this.cartService = cartService
    }

    public async addItem(item: CartDto, userId: string) {
        try {
            return await this.cartService.addItemService(item, userId)
        } catch (e) {
            console.log(e.message)
        }
    }

    public async updateItem(item: any, userId: string) {

    }

    public async deleteItem(id: any) {

    }

}