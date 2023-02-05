import {CartRepository} from "../cartRepository";
import {injectable} from "inversify";
import {cart} from "../../model/cart";

@injectable()
export class CartRepositoryImpl implements CartRepository {
    async getCartByUserId(userId: string): Promise<any> {
        try {
            return await cart.findOne({id: userId})
        } catch (e) {
            throw e
        }
    }

    async updateCartByCurrentUserId(userId: string, updateModel): Promise<any> {
        try {
            const document = await cart.findOne({id: userId})
            Object.assign(document, updateModel)
            return await document.save()
        } catch (e) {
            throw e
        }
    }
}
