import mongoose from "mongoose";

// schema Date
const schemaDates = {
  user_id: String,
  user_name: String,
  walker_id: String,
  walker_name: String,
  pets_id: Array,
  pets_name: Array,
  district_selected: String,
  date_day: Date,
  date_hour: String,
  date_time: Number,
  total_price: Number,
  date_state: String,
  calificated: Boolean,
};

// Date model
const AskForDate = mongoose.model("Date", schemaDates, "dates");

export default AskForDate;
