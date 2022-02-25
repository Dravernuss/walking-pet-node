import mongoose from "mongoose";

// schema User
const schemaUsers = {
  role: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  phone: String,
  district: String,
  address: String,
  avalaible: Boolean,
  photo_url: String,
};

// User model
const User = mongoose.model("User", schemaUsers, "users");

export default User;
