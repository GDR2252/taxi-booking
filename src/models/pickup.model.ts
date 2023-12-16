import mongoose from "mongoose";

const pickupSchema = new mongoose.Schema(
  {
    rider_booking_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "rider_bookings",
    },
    pickup_address: {
      type: String,
    },
    pickup_city: {
      type: String,
    },
    pickup_state: {
      type: String,
    },
    pickup_zip_code: {
      type: Number,
    },
  },
  { timestamps: true }
);

const pickupLocations = mongoose.model("pickup_locations", pickupSchema);

export default pickupLocations;
