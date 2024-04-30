import * as mongoose from 'mongoose';

export const customersSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    avatar: String,
    comment: String
  },
  {
    timestamps: true,
  },
);
