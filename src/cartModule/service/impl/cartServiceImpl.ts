import {CartService} from "../cartService";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../types";
import {CartRepository} from "../../repository/cartRepository";
import {FoodRepository} from "../../../foodModule/repositories/foodRepository";
import {CartDto} from "../../dto/cartDto";
import {CheckoutRepository} from "../../repository/checkoutRepository";

@injectable()
export class CartServiceImpl implements CartService {

    private cartRepository: CartRepository
    private foodRepository: FoodRepository
    private checkoutRepository: CheckoutRepository

    constructor(@inject(TYPES.CartRepository) cartRepository: CartRepository,
                @inject(TYPES.FoodRepository) foodRepository: FoodRepository,
                @inject(TYPES.CheckoutRepository) checkoutRepository: CheckoutRepository) {
        this.cartRepository = cartRepository
        this.foodRepository = foodRepository
        this.checkoutRepository = checkoutRepository
    }

    async checkoutService(orderDetail: any, userId: string): Promise<any> {
        try {
            const currentUserCart = await this.cartRepository.getCartByUserId(userId)
            currentUserCart.totalPrice = 0
            currentUserCart.totalItem = 0
            currentUserCart.cart = []
            return await this.checkoutRepository.addCheckout(orderDetail, userId, currentUserCart)
        } catch (e) {
            throw e
        }
    }

    async addItemService(item: CartDto, userId: string): Promise<any> {
        try {
            let totalPrice = 0
            let itemIndex = 0
            let totalItem = 0
            const food = await this.foodRepository.getFoodById(item.foodId)
            // console.log(food)
            const currentUserCart = await this.cartRepository.getCartByUserId(userId)
            const findItem = currentUserCart.cart.find((element: any, index: number) => {
                if (element.name === food.name) {
                    element.itemCount = item.itemCount
                    itemIndex = index
                    return element
                }
                return null
            })

            if (findItem) {
                currentUserCart.cart[itemIndex] = findItem
            }

            if (!findItem) {
                currentUserCart.cart.push({
                    id: food._id,
                    name: food.name,
                    itemPrice: food.price,
                    itemUri: food.imgUri,
                    itemCount: item.itemCount
                })
            }

            currentUserCart.cart.forEach((value: any) => {
                totalPrice += value.itemPrice * value.itemCount
                totalItem += value.itemCount
            })
            currentUserCart.totalPrice = totalPrice
            currentUserCart.totalItem = totalItem
            return await this.cartRepository.updateCartByCurrentUserId(userId, currentUserCart)
        } catch (e) {
            throw new Error(`Cart Service Layer: ${e}`)
        }
    }

    async deleteItemService(itemName: string, userId: string): Promise<any> {
        try {
            let totalPrice = 0
            let totalItem = 0
            const currentUserCart = await this.cartRepository.getCartByUserId(userId)

            currentUserCart.cart = currentUserCart.cart.filter((item: any) => {
                if (item.name !== itemName) {
                    return item
                }
            })
            currentUserCart.cart.forEach((value: any) => {
                totalPrice += value.itemPrice * value.itemCount
                totalItem += value.itemCount
            })
            currentUserCart.totalPrice = totalPrice
            currentUserCart.totalItem = totalItem
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
