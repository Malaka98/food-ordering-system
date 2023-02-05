import {model, Schema} from "mongoose";

const cartItem = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    cart: {
        type: [cartItem],
        default: []
    },
});

export const food = model("cart", cartSchema);
