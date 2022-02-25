import mongoose from "mongoose";

// schema Pet
const schemaPets = {
  user_id: String,
  name: String,
  age: Number,
  size: String,
  nature: String,
  additional_information: String,
  breed: String,
  gender: String,
  photo_url: Date,
  carnet_url: String,
};

// Pet model
const Pet = mongoose.model("Pet", schemaPets, "pets");

export default Pet;
