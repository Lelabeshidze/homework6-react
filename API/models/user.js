import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: [
      (firstName) => firstName.length >= 3,
      "firstname should have at least 3 characters",
    ],
  },
  lastName: {
    type: String,
    requeired: true,
    validate: [
      (lastname) => lastname.length >= 3,
      "lastname should have at least 3 characters",
    ],
  },
  email: { type: String, required: true, validate: [validator.isEmail, "invalid email"] },
  sex: { type: String, required: true },
  age: {
    type: Number,
    required: true,
    validate: [(age) => age > 18, "age should be more than 18"],
  },
});

export const User = mongoose.model("User", userSchema);
