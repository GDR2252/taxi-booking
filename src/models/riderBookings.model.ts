// import mongoose from "mongoose";

// const riderBookingSchema = new mongoose.Schema(
//   {
//     first_name: {
//       type: String,
//       required: true,
//     },
//     last_name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     number_of_guest: {
//       type: Number,
//     },
//     pickup_date_time: {
//       type: Date,
//     },
//     pickup_locations: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "pickup_locations",
//     },
//     destination_locations: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "destination_locations",
//     },
//     action: {
//       type: String,
//       required: true,
//       enum: ["created", "request_sended_to_driver","accepted_request_to_driver","cancel_request_rider","reject_request_to_driver"],
//     },
//   },
//   { timestamps: true }
// );

// const RiderBooking = mongoose.model("rider_bookings", riderBookingSchema);

// export default RiderBooking;
