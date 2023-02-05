import {ContainerModule, interfaces} from "inversify";
import {TYPES} from "../types";
import {CartRepository} from "./repository/cartRepository";
import {CartService} from "./service/cartService";
import {CartRepositoryImpl} from "./repository/impl/cartRepositoryImpl";
import {CartServiceImpl} from "./service/impl/cartServiceImpl";
import {CartController} from "./controller/cartController";

const CartModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<CartRepository>(TYPES.CartRepository).to(CartRepositoryImpl);
    bind<CartService>(TYPES.CartService).to(CartServiceImpl);
    bind<CartController>(TYPES.CartController).to(CartController);
})

export default CartModule
