const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/auth.route.js");
const activityRoutes = require("./routes/activities.route.js");
const connectDB = require("./connectDB.js");
const protectedMiddleware = require("./middlewares/protected.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/activities", protectedMiddleware, activityRoutes);
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

module.exports = app;
