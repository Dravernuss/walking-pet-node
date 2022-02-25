import mongoose from "mongoose";

// schema Comment
const schemaComments = {
  date_id: String,
  rating: Number,
  comment: String,
  type: Boolean,
  report_photo_url: String,
  comment_state: String,
  message_user: String,
  message_walker: String,
};

// Comment model
const Comment = mongoose.model("Comment", schemaComments, "comments");

export default Comment;
