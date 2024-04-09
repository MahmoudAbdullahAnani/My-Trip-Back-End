import * as mongoose from 'mongoose';

export const PopularDestinations = new mongoose.Schema(
  {
    titleAR: String,
    titleEN: String,
    img: String,
  },
  {
    timestamps: true,
  },
);
