exports.serverErrorResponse = (res, err) => {
  return res.status(500).json({ message: "Server Error", log: err.message });
};
