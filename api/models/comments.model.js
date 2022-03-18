import mongoose from "mongoose";

// schema Comment
const schemaComments = {
  date_id: String,
  user_id: String,
  user_name: String,
  walker_id: String,
  rating: Number,
  comment: String,
  type: String,
  report_photo_url: { type: String, default: "" },
  comment_state: { type: String, default: "No Revisado" },
  message_user: { type: String, default: "" },
  message_walker: { type: String, default: "" },
  created_at: { type: Date, default: Date.now() },
};

// Comment model
const Comment = mongoose.model("Comment", schemaComments, "comments");

export default Comment;
