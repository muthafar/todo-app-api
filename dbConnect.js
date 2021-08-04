const mongoose = require("mongoose");

module.exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_CONN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB is up and running ");
    })
    .catch(e => {
      console.log(e);
    });
  mongoose.set("useCreateIndex", true);
};
