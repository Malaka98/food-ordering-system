import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

const checkoutSchema = new Schema({
    userId: {
        type: ObjectId,
        unique: true,
        required: true
    },
    orderDetails: {
        type: Object,
        required: true
    },
    paymentDetails: {
        type: Object,
        required: true
    },
    // timestamps: {
    //     createdAt: 'created_at', // Use `created_at` to store the created date
    //     updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    // }
})

export const checkout = model("checkout", checkoutSchema)
