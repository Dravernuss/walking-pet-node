import mongoose from "mongoose";

// schema WalkersRegistrations
const schemaWalkersRegistrations = {
  walker_id: String,
  dni_url: String,
  experience: String,
  reaction: String,
  tools: String,
  certification: Boolean,
  registration_state: String,
  admin_comment: String,
};

// WalkersRegistrations model
const WalkersRegistration = mongoose.model(
  "Walkers_Registration",
  schemaWalkersRegistrations,
  "walkers_registrations"
);

export default WalkersRegistration;
