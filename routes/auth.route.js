const express = require("express");
const {
  getController,
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");
const protectedMiddleware = require("../middlewares/protected");

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", registerController);
router.get("/logout", logoutController);
router.get("/", protectedMiddleware, getController);

module.exports = router;
