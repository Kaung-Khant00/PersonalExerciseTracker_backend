const User = require("../Schema/User");
const { generateToken } = require("../utils/JWT.js");
const { serverErrorResponse } = require("../utils/Response.js");
const { validateEmail } = require("../utils/validator.js");

const cookieOptions = {
  secret: process.env.COOKIE_SECRET,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken({ userId: user._id });
    res.cookie("token", token, cookieOptions);
    user.password = undefined;
    return res.status(200).json({
      user,
      message: "Logged in successfully",
    });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Please provide a valid email." });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }
  try {
    // check if the email is already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // create the user
    const user = await User.create({
      userName: username,
      email,
      password,
    });

    //generate token
    const token = generateToken({ userId: user._id });
    res.cookie("token", token, cookieOptions);
    user.password = undefined;
    return res.status(201).json({ user, message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    return serverErrorResponse(res, err);
  }
};

exports.logoutController = async (req, res) => {
  try {
    // Clear the httpOnly cookie
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};
exports.getController = async (req, res) => {
  return res
    .status(200)
    .json({ user: req.user, message: "Protected route accessed" });
};
