const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.route.js");
const activityRoutes = require("./routes/activities.route.js");
const connectDB = require("./connectDB.js");
const protectedMiddleware = require("./middlewares/protected.js");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://192.168.100.71:5173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

/* app.use("/", (req, res) => {
  console.log("API is running...");
  return res.status(200).json({ message: "API is running..." });
}); */

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/activities", protectedMiddleware, activityRoutes);
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
  connectDB();
});

module.exports = app;
