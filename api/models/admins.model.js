import mongoose from "mongoose";

// schema Admin
const schemaAdmins = {
  role: String,
  name: String,
  email: String,
  password: String,
};

// Admin model
const Admin = mongoose.model("Admin", schemaAdmins, "admins");

export default Admin;
