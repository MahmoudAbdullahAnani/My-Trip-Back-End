import * as mongoose from 'mongoose';

export const CatchDataSchema = new mongoose.Schema(
  {
    openWebsite: {
      user_id: String,
      isGuest: Boolean,
    },
    search: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users',
        },
        isGuest: Boolean,
        systemSearch: String,
        typeSearch: String,

        fromLocation: String,
        toLocation: String,
        fromDate: String,
        toDate: String,
        numberAdults: Number,
        numberChild: Number,
        numberInfant: Number,
        RateingState: Number,
        typeClass: String,
      },
    ],
    chooseTicket: [
      {
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
        carID: String,
        startDateCar: String,
        endDateCar: String,
        distanceCar: String,
        categoryCar: String,
        descriptionCar: String,
        serviceProviderCar: String,
        priceCar: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);
