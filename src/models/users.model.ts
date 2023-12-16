import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: false,
    },
    password: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      enum: ["driver", "rider"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "active"],
    },
    is_verified: {
      type: Boolean,
    },
    is_login_verified: {
      type: Boolean,
    },
    licence_number: {
      type: String,
    },
    pancard_number: {
      type: String,
    },
    language: {
      type: String,
    },
    profile_photo: {
      type: String,
    },
    addhar_card: {
      type: String,
    },
    vehicle_permit: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
