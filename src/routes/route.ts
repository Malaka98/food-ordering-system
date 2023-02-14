// custom-routes.ts
import * as express from 'express';
import {CartController} from "../cartModule/controller/cartController";
import {TYPES} from "../types";
import {AuthMiddleware} from "../middlewares/authMiddleware";
import {interfaces} from "inversify";
import {OrderDto} from "../cartModule/dto/orderDto";
import Container = interfaces.Container;


export const customRoutes = (container: Container) => {
    const router = express.Router({
        caseSensitive: false,
        mergeParams: false,
        strict: false
    });


    router.get('/cart', AuthMiddleware.authenticate, async (req: express.Request, res: express.Response) => {
        try {
            const cartController = container.get<CartController>(TYPES.CartController)
            const userId = req.user.user.id
            const cart = await cartController.getCart(userId)
            res.status(200).json({message: cart})
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    });

    router.post('/checkout', AuthMiddleware.authenticate, async (req: express.Request, res: express.Response) => {
        try {
            const cartController = container.get<CartController>(TYPES.CartController)
            const userId = req.user.user.id
            const orderDetail = new OrderDto(req.body["payment"], req.body["order"])
            const checkout = await cartController.checkout(orderDetail, userId)
            res.status(201).json({message: checkout})
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    })

    return router
}

