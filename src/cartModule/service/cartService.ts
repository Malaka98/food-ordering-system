import {CartDto} from "../dto/cartDto";

export interface CartService {
    addItemService(item: CartDto, userId: string): Promise<any>

    deleteItemService(itemName: string, userId: string): Promise<any>

    getCartByUserIdService(userId: string): Promise<any>

    checkoutService(orderDetail: any, userId: string): Promise<any>

    getOrderHistoryService(userId: string): Promise<any>
}
