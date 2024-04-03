import * as mongoose from 'mongoose';

export const SubSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    msgs: [
      {
        title: String,
        content: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);
export const MsgSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    msg: String,
  },
  {
    timestamps: true,
  },
);
