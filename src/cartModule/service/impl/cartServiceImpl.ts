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

    addItemService(item: CartDto): Promise<any> {
        return Promise.resolve(undefined);
    }

    deleteItemService(id: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    updateItemService(item: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}
