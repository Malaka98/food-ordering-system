import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  phone_number: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
});

export const user = mongoose.model("user", userSchema);
