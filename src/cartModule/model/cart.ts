import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

const cartItem = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        default: 0,
        required: true
    },
    itemUri: {
        type: String,
        required: true
    },
    itemCount: {
        type: Number,
        default: 0,
        required: true
    }
});

const cartSchema = new Schema({
    id: {
        type: ObjectId,
        unique: true,
        required: true
    },
    cart: {
        type: [cartItem],
        default: []
    },
    totalPrice: {
        type: Number,
        default: 0
    }
});

export const cart = model("carts", cartSchema);
