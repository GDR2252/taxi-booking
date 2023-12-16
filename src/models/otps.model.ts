import mongoose from "mongoose";
import User from "./users.model";

const otpSchema: any = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    otp: {
      type: Number,
    },
    otp_type:{
      type: String,
      enum: ["signUp", "signIn"],
    },
    expire_at: { type: Date, default: Date.now, expires: 300 },
  },
  { timestamps: true }
);

const Otp = mongoose.model("otps", otpSchema);

export default Otp;
