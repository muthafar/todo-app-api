if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { isLoggedIn } = require("./middleWares");
const { jwtLogin } = require("./helpers/jwt");
const cors = require("cors");
const { dbConnect } = require("./dbConnect");
const ExpressError = require("./helpers/ExpressError");
const User = require("./models/user");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

dbConnect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

passport.use(jwtLogin);

passport.use(new LocalStrategy(User.authenticate()));

app.use("/api/todos", todoRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { message = "Something Went Wrong", statusCode = "500" } = err;
  res.status(statusCode).json({
    message,
    statusCode,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER IS Running PORT ${PORT}`);
});
