const User = require("../models/user");
const ExpressError = require("../helpers/ExpressError");
const jwt = require("jwt-simple");

const tokenForUser = user => {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, process.env.JWT_SECRET);
};

module.exports.signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);

    res.json({ token: tokenForUser(registerUser) });
  } catch (err) {
    next(new ExpressError(err.message, 400));
  }
};

module.exports.signin = async (req, res, next) => {
  res.json({ token: tokenForUser(req.user) });
};

module.exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "Good Bye" });
};
