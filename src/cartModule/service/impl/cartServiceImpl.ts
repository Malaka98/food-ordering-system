import {CartService} from "../cartService";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../types";
import {CartRepository} from "../../repository/cartRepository";
import {CartDto} from "../../dto/cartDto";

@injectable()
export class CartServiceImpl implements CartService {

    private cartRepository: CartRepository

    constructor(@inject(TYPES.CartRepository) cartRepository: CartRepository) {
        this.cartRepository = cartRepository
    }

    async addItemService(item: CartDto, userId: string): Promise<any> {
        try {
            let totalPrice = 0
            const currentUserCart = await this.cartRepository.getCartByUserId(userId)
            const findItem = currentUserCart.cart.find((element: any) => {
                if (element.name === item.name) {
                    element.itemCount = item.itemCount
                    return element
                }
                return null
            })
            if (!findItem) {
                currentUserCart.cart.push(item)
            }

            currentUserCart.cart.forEach((value: any) => {
                totalPrice += value.itemPrice * value.itemCount
            })
            currentUserCart.totalPrice = totalPrice
            return await this.cartRepository.updateCartByCurrentUserId(userId, currentUserCart)
        } catch (e) {
            throw e
        }
    }

    async deleteItemService(itemName: string, userId: string): Promise<any> {
        try {
            let totalPrice = 0
            const currentUserCart = await this.cartRepository.getCartByUserId(userId)

            currentUserCart.cart = currentUserCart.cart.filter((item: any) => {
                if (item.name !== itemName) {
                    return item
                }
            })
            currentUserCart.cart.forEach((value: any) => {
                totalPrice += value.itemPrice * value.itemCount
            })
            currentUserCart.totalPrice = totalPrice
            return await this.cartRepository.updateCartByCurrentUserId(userId, currentUserCart)
        } catch (e) {
            throw e
        }
    }

}
