// custom-routes.ts
import * as express from 'express';
import {CartController} from "../cartModule/controller/cartController";
import {TYPES} from "../types";
import {AuthMiddleware} from "../middlewares/authMiddleware";
import {interfaces} from "inversify";
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
            console.log(userId)
            const cart = await cartController.getCart(userId)
            res.status(200).json({message: cart})
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    });

    return router
}

