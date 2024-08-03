import mongoose from "mongoose";

const post_schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    unauth_uuid: { type: String },
    type: {
      type: String,
      required: true,
      enum: ["linkedin-post", "blog-post", "twitter-thread"],
    },
    transcription_key: { type: String },
    audio_file_key: { type: String },
    extra_info: { type: Object },
  },
  {
    timestamps: true,
  }
);

export const POST = mongoose.models.Post || mongoose.model("Post", post_schema);
