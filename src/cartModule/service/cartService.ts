import {CartDto} from "../dto/cartDto";

export interface CartService {
    addItemService(item: CartDto): Promise<any>

    updateItemService(item: any): Promise<any>

    deleteItemService(id: any): Promise<any>
}
