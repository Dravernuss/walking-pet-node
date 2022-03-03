import mongoose from "mongoose";

// schema Pet
const schemaPets = {
  user_id: String,
  name: String,
  age: Number,
  size: String,
  nature: String,
  additional_information: { type: String, default: "" },
  breed: String,
  gender: String,
  photo_url: String,
  carnet_url: { type: String, default: "" },
};

// Pet model
const Pet = mongoose.model("Pet", schemaPets, "pets");

export default Pet;
