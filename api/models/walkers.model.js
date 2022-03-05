import mongoose from "mongoose";

// schema Walkers
const schemaWalkers = {
  role: { type: String, default: "walker" },
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  phone: String,
  district: String,
  address: String,
  photo_url: String,
  avalaible: { type: Boolean, default: false },
  price: Number,
  avalaible_districts: Array,
  greeting: String,
  presentation: String,
  rating: Number,
};

// Walker model
const Walker = mongoose.model("Walker", schemaWalkers, "walkers");

export default Walker;
