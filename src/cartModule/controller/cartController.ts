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

    public async deleteItem(itemName: string, userId: string) {
        try {
            return await this.cartService.deleteItemService(itemName, userId)
        } catch (e) {
            console.log(e.message)
        }
    }

    public async getCart(userId: string) {
        try {
            return await this.cartService.getCartByUserIdService(userId)
        } catch (e) {
            throw e
        }
    }

    public async checkout(orderDetails: any, userId: string) {
        try {
            return await this.cartService.checkoutService(orderDetails, userId)
        } catch (e) {
            throw e
        }
    }

}
