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
  const { userId, avgSpeed, maxSpeed, distance, duration } = data;
  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }
  if (title.length > 200) {
    return res
      .status(400)
      .json({ message: "Title cannot exceed 200 characters" });
  }
  exports.validateNumericField(avgSpeed, "Average Speed", res, true);
  exports.validateNumericField(maxSpeed, "Max Speed", res, true);
  exports.validateNumericField(distance, "Distance", res, true);
  exports.validateNumericField(duration, "Duration", res, true);
  if (maxSpeed < avgSpeed) {
    return res
      .status(400)
      .json({ message: "Max Speed cannot be less than Average Speed" });
  }
};
exports.validateUpdateActivityData = (data, res) => {
  const { title, avgSpeed, maxSpeed, distance, duration } = data;
  if (!title && !avgSpeed && !maxSpeed && !distance && !duration) {
    return res
      .status(400)
      .json({ message: "At least one field must be provided for update" });
  }
  if (title.length > 200) {
    return res
      .status(400)
      .json({ message: "Title cannot exceed 200 characters" });
  }
  exports.validateNumericField(avgSpeed, "Average Speed", res, false);
  exports.validateNumericField(maxSpeed, "Max Speed", res, false);
  exports.validateNumericField(distance, "Distance", res, false);
  exports.validateNumericField(duration, "Duration", res, false);
  if (avgSpeed !== undefined && maxSpeed !== undefined && maxSpeed < avgSpeed) {
    return res
      .status(400)
      .json({ message: "Max Speed cannot be less than Average Speed" });
  }
};
