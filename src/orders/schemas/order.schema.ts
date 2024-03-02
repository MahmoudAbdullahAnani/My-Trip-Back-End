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
    evt_id: String,
    description: String,
    address: String,
    user_id: String,
    currency: String,
    email: String,
    payment_method_types: String,
    payment_intent: String,
    status: String,
    metaData: {
      description: String,
      logo: String,
      price: String,
      timeGo: String,
      timeSet: String,
      user_id: String,
    },
  },
  {
    timestamps: true,
  },
);
