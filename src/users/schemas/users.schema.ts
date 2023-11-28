import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    role: String,
    age: Number,
    phoneNumber: String,
    address: String,
    active: Boolean,
    verificationCode: String,
  },
  {
    timestamps: true,
  },
);
