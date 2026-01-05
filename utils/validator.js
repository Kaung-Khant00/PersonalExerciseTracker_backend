exports.validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

exports.validateNumericField = (value, fieldName, res, required = false) => {
  if (required && (value === undefined || value === null)) {
    return res.status(400).json({ message: `${fieldName} is required` });
  }
  if (value !== undefined && value !== null) {
    if (isNaN(value)) {
      return res.status(400).json({ message: `${fieldName} must be a number` });
    }
    if (value < 0) {
      return res
        .status(400)
        .json({ message: `${fieldName} must be non-negative` });
    }
    if (value === 0) {
      return res.status(400).json({ message: `${fieldName} cannot be zero` });
    }
  }
};

exports.validateActivityData = (data, res) => {
  const { maxSpeed, distance, duration, title, rideIntensity } = data;
  if (title.length > 200) {
    return res
      .status(400)
      .json({ message: "Title cannot exceed 200 characters" });
  }
  exports.validateNumericField(maxSpeed, "Max Speed", res, true);
  exports.validateNumericField(distance, "Distance", res, true);
  exports.validateNumericField(duration, "Duration", res, true);
  validateRideIntensity(rideIntensity, res);
};
exports.validateUpdateActivityData = (data, res) => {
  const { title, maxSpeed, distance, duration, rideIntensity } = data;
  if (!title && !maxSpeed && !distance && !duration) {
    return res
      .status(400)
      .json({ message: "At least one field must be provided for update" });
  }
  if (title.length > 200) {
    return res
      .status(400)
      .json({ message: "Title cannot exceed 200 characters" });
  }
  exports.validateNumericField(maxSpeed, "Max Speed", res, false);
  exports.validateNumericField(distance, "Distance", res, false);
  exports.validateNumericField(duration, "Duration", res, false);
  validateRideIntensity(rideIntensity, res);
};

function validateRideIntensity(rideIntensity, res) {
  const validIntensities = ["Low", "Medium", "Hard", "Extreme"];
  if (!validIntensities.includes(rideIntensity)) {
    return res.status(400).json({
      message: `rideIntensity must be one of: ${validIntensities.join(", ")}`,
    });
  }
  return true;
}
