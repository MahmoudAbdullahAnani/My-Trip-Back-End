import * as mongoose from 'mongoose';

export const OffersHotelsSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    counters: Number,
    image: String,
    description: String,
    // link: String,
    // gps_coordinates: {
    //   latitude: Number,
    //   longitude: Number,
    // },
    // check_in_time: String,
    // check_out_time: String,
    // rate_per_night: {
    //   lowest: String,
    //   extracted_lowest: Number,
    //   before_taxes_fees: String,
    //   extracted_before_taxes_fees: Number,
    // },
    // total_rate: {
    //   lowest: String,
    //   extracted_lowest: Number,
    //   before_taxes_fees: String,
    //   extracted_before_taxes_fees: Number,
    // },
    // excluded_amenities: [String],
  },
  {
    timestamps: true,
  },
);
