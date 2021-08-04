const ExpressError = require("./helpers/ExpressError");
const User = require("./models/user");
const passport = require("passport");

module.exports.isLoggedIn = passport.authenticate("jwt", { session: false });
module.exports.signIn = passport.authenticate("local", { session: false });
