import * as mongoose from 'mongoose';

export const CatchDataSchema = new mongoose.Schema(
  {
    openWebsite: {
      user_id: String,
      isGuest: Boolean,
    },
    search: {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
      isGuest: Boolean,
      systemSearch: String,
      typeSearch: String,

      fromLocation: String,
      toLocation: String,
      fromDate: Date,
      toDate: Date,
      numberAdults: Number,
      numberChild: Number,
      numberInfant: Number,
      typeClass: String,
    },
    chooseTicket: {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
      isGuest: Boolean,
      CompanyLogo: String,
      isStope: Number,
      durationH: String,
      durationM: String,
      price: String,
      timeGo: String,
      timeSet: String,
    },
  },
  {
    timestamps: true,
  },
);
