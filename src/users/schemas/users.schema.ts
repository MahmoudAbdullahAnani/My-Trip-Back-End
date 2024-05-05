import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, 'first name must be at least 3 characters long'],
    },
    passportNumber: String,
    country: String,
    nationality: String,
    gender: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    role: String,
    avatar: String,
    age: Number,
    phoneNumber: String,
    address: String,
    active: Boolean,
    verificationCode: String,
    verificationAccountCode: String,
    chatSocketId: String,
    chatSocketAdminId: String,
    notification: [
      {
        id: { type: mongoose.Schema.ObjectId },
        isSee: Boolean,
        title: String,
        content: String,
        date: Date,
      },
    ],
    pendingFriends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);
