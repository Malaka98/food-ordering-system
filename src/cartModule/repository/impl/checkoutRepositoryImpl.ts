import {CheckoutRepository} from "../checkoutRepository";
import {injectable} from "inversify";
import mongoose from "mongoose";
import {cart} from "../../model/cart";
import {checkout} from "../../model/checkout";

@injectable()
export class CheckoutRepositoryImpl implements CheckoutRepository {
    async addCheckout(checkoutModel: any, userId: string, updateModel): Promise<any> {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            const newCheckoutModel = new checkout({
                userId: userId,
                orderDetails: checkoutModel.orderDetails,
                paymentDetails: checkoutModel.paymentDetails
            })
            const document = await cart.findOne({id: userId})
            Object.assign(document, updateModel)
            await document.save()
            const checkoutResponse = await newCheckoutModel.save();
            await session.commitTransaction();
            return checkoutResponse
        } catch (e) {
            await session.abortTransaction();
            throw e;
        } finally {
            await session.endSession();
        }
    }

    async getOrderHistoryByUserId(userId: string): Promise<any> {
        try {
            return await checkout.find({userId: userId})
        } catch (e) {
            throw e
        }
    }

}
