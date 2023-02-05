import {CartDto} from "../dto/cartDto";

export interface CartService {
    addItemService(item: CartDto, userId: string): Promise<any>

    updateItemService(item: any): Promise<any>

    deleteItemService(id: any): Promise<any>
}
