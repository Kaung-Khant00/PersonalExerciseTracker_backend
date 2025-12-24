const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Schema/User");

const protectedMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decodedUserId = jwt.verify(token, process.env.JWT_SECRET).userId;
    const user = await User.findById(decodedUserId);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", log: err.message });
  }
};

module.exports = protectedMiddleware;
