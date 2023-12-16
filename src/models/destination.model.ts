import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    rider_booking_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "rider_bookings",
    },
    destination_address: {
      type: String,
    },
    destination_city: {
      type: String,
    },
    destination_state: {
      type: String,
    },
    destination_zip_code: {
      type: Number,
    },
  },
  { timestamps: true }
);

const destinationLocations = mongoose.model("destination_locations", destinationSchema);

export default destinationLocations;
