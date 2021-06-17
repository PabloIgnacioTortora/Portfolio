const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const verifySignup = require("../middlewares/verifySignup");

router.post(
  "/signup",
  [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  authController.signUp
);

router.post("/signin", authController.signIn);

module.exports = router;