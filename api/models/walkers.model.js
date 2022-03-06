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
  photo_url: { type: String, default: "" },
  avalaible: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  avalaible_districts: { type: Array, default: [] },
  greeting: { type: String, default: "" },
  presentation: { type: String, default: "" },
  rating: { type: Number, default: 0 },
};

// Walker model
const Walker = mongoose.model("Walker", schemaWalkers, "walkers");

export default Walker;
