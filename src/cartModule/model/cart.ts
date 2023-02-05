import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

const cartItem = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        default: null
    },
    itemPrice: {
        type: Number,
        default: 0,
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
