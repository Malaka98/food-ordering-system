import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgUri: {
    type: Number,
    required: true,
  },
  description: {
    type: Number,
    required: true,
  },
});

export const food = mongoose.model("food", foodSchema);
