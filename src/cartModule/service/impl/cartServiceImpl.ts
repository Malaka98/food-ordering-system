import {CartService} from "../cartService";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../types";
import {CartRepository} from "../../repository/cartRepository";
import {FoodRepository} from "../../../foodModule/repositories/foodRepository";
import {CartDto} from "../../dto/cartDto";

@injectable()
export class CartServiceImpl implements CartService {

    private cartRepository: CartRepository
    private foodRepository: FoodRepository

    constructor(@inject(TYPES.CartRepository) cartRepository: CartRepository,
                @inject(TYPES.FoodRepository) foodRepository: FoodRepository) {
        this.cartRepository = cartRepository
        this.foodRepository = foodRepository
    }

    async addItemService(item: CartDto, userId: string): Promise<any> {
        try {
            let totalPrice = 0

            const food = await this.foodRepository.getFoodById(item.foodId)
            const currentUserCart = await this.cartRepository.getCartByUserId(userId)
            const findItem = currentUserCart.cart.find((element: any) => {
                if (element.name === food.name) {
                    element.itemCount = item.itemCount
                    return element
                }
                return null
            })
            if (!findItem) {
                currentUserCart.cart.push({
                    name: food.name,
                    itemPrice: food.price,
                    itemUri: food.imgUri,
                    itemCount: item.itemCount
                })
            }

            currentUserCart.cart.forEach((value: any) => {
                totalPrice += value.itemPrice * value.itemCount
            })
            currentUserCart.totalPrice = totalPrice
            return await this.cartRepository.updateCartByCurrentUserId(userId, currentUserCart)
        } catch (e) {
            throw new Error(`Cart Service Layer: ${e}`)
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

    async getCartByUserIdService(userId: string): Promise<any> {
        try {
            return await this.cartRepository.getCartByUserId(userId)
        } catch (e) {
            throw e
        }
    }


}
