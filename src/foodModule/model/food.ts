import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imgUri: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export const food = mongoose.model("foods", foodSchema);
