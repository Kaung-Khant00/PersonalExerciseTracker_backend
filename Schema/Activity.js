const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  avgSpeed: {
    type: Number,
    required: true,
  },
  maxSpeed: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  rideIntensity: {
    type: String,
    enum: ["Easy", "Medium", "Hard", "Extreme"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

ActivitySchema.statics.getActivities = async function (userId) {
  const match = {};
  if (userId) {
    match.userId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : userId;
  }

  return this.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalDistance: { $sum: "$distance" },
        totalDuration: { $sum: "$duration" },
        maxDistance: { $max: "$distance" },
        minDistance: { $min: "$distance" },
        maxDuration: { $max: "$duration" },
        minDuration: { $min: "$duration" },
        maxAvgSpeed: { $max: "$avgSpeed" },
        minAvgSpeed: { $min: "$avgSpeed" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
};

module.exports = mongoose.model("Activity", ActivitySchema);
