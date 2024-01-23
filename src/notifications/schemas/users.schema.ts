import * as mongoose from 'mongoose';

export const NotificationsSchema = new mongoose.Schema(
  {
    isSee: Boolean,
    title: String,
    content: String,
    date: Date,
  },
  {
    timestamps: true,
  },
);
