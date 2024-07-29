import mongoose from "mongoose";

const user_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verification_code: { type: String },
    verified: { type: Boolean, default: false },

    credits: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", user_schema);
