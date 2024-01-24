import * as mongoose from 'mongoose';

export const NotificationsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    exDate: Date,
  },
  {
    timestamps: true,
  },
);
