import mongoose from "mongoose";
import User from "./users.model";

const resetTokensSchema: any = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    token: {
      type: String,
    },
    expire_at: { type: Date, default: Date.now, expires: 300 },
  },
  { timestamps: true }
);

const ResetToken = mongoose.model("reset_tokens", resetTokensSchema);

export default ResetToken;
