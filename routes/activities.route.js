const express = require("express");
const router = express.Router();
const Activity = require("../Schema/Activity");
const {
  createActivity,
  getActivitiesByUser,
  updateActivity,
  deleteActivity,
  getActivities,
} = require("../controllers/activity.controller");

// Create a new activity
router.post("/create", createActivity);
router.get("/user/:userId", getActivitiesByUser);
router.get("/", getActivities);
router.put("/update/:activityId", updateActivity);
router.delete("/delete/:activityId", deleteActivity);

module.exports = router;
