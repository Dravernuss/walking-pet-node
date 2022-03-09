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
  avalaible: { type: Boolean, default: false },
  dni_url: String,
  experience: String,
  reaction: String,
  tools: String,
  certification: Boolean,
  photo_url: String,
  price: { type: Number, default: 0 },
  avalaible_districts: { type: Array, default: [] },
  greeting: { type: String, default: "" },
  presentation: { type: String, default: "" },
  rating: { type: Number, default: 0.5 },
  ready: { type: Boolean, default: false },
  registration_state: { type: String, default: "Sin Revisar" },
  admin_comment: { type: String, default: "" },
};

// Walker model
const Walker = mongoose.model("Walker", schemaWalkers, "walkers");

export default Walker;
