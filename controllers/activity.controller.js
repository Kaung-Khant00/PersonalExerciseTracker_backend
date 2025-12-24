const { default: mongoose } = require("mongoose");
const Activity = require("../Schema/Activity");
const { serverErrorResponse } = require("../utils/Response");
const {
  validateActivityData,
  validateUpdateActivityData,
} = require("../utils/validator");

exports.createActivity = async (req, res) => {
  const { userId, title, avgSpeed, maxSpeed, distance, duration } = req.body;
  validateActivityData(req.body, res);

  try {
    const newActivity = await Activity.create({
      userId,
      title,
      avgSpeed,
      maxSpeed,
      distance,
      duration,
    });

    return res
      .status(201)
      .json({ message: "Activity created", activity: newActivity });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

exports.getActivitiesByUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  try {
    const activities = await Activity.find({ userId: req.params.userId });

    return res.status(200).json({ activities });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

exports.getActivities = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const activities = await Activity.find({ userId: req.user.id });
    return res.status(200).json({ activities });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

exports.updateActivity = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.activityId)) {
    return res.status(400).json({ message: "Invalid Activity ID" });
  }
  if (!req.body) {
    return res.status(400).json({ message: "No data provided for update" });
  }
  validateUpdateActivityData(req.body, res);
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.activityId,
      req.body,
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json({ activity: updatedActivity, message: "Activity updated" });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

exports.deleteActivity = async (req, res) => {
  try {
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};
