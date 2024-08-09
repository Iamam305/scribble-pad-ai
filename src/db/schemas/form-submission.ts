import mongoose from "mongoose";

const form_submission_schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  form_type: { type: String },
  message: { type: String },
});

export const FormSubmission =
  mongoose.models.FormSubmission ||
  mongoose.model("FormSubmission", form_submission_schema);
