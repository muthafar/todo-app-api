const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../helpers/catchAsync");
const users = require("../controllers/users");
const { signIn } = require("../middleWares");

router.post(
  "/signup",

  catchAsync(users.signup)
);

router.post("/signin", signIn, catchAsync(users.signin));

router.get("/logout", users.logout);

router.get("/currentuser", (req, res) => {
  res.send(req.user);
});

module.exports = router;
