import mongoose from "mongoose";

const post_schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      required: true,
      enum: ["linkedin-post", "blogpost", "twitter-thread"],
    },
    transcription_key: { type: String },
  },
  {
    timestamps: true,
  }
);

export const POST =
 mongoose.models.Post || 
mongoose.model("Post", post_schema);
