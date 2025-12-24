const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  title: {
    type: String,
    default: "",
  },
  avgSpeed: {
    type: Number,
    require: true,
  },
  maxSpeed: {
    type: Number,
    require: true,
  },
  distance: {
    type: Number,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Activity", ActivitySchema);
