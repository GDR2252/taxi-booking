import mongoose from "mongoose";
import User from "./users.model";

const riderRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    car_type: {
      type: String,
    },
    pickup_location: {
      type: String,
    },
    destination_location: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
  },
  { timestamps: true }
);

const RiderRequest = mongoose.model("rider_requests", riderRequestSchema);

export default RiderRequest;
