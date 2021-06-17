const Router = require("express");
const router = Router();

const createUser = require("../controller/user");
const verifySignup = require("../middlewares/verifySignup");
const authJwt = require("../middlewares/authJwt");

router.post(
  "/users",
  [authJwt.verifyToken, authJwt.isAdmin],
  verifySignup.checkDuplicateUsernameOrEmail,
  createUser
);

module.exports = router;
