import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, 'first name must be at least 3 characters long'],
    },
    totalOrderPrice: Number,
    description: String,
    user_id: String,
    currency: String,
    email: String,
    metadata: String,
    paidAt: Date,
  },
  {
    timestamps: true,
  },
);
