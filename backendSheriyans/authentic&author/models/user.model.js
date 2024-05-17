const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("successfully connected to the database"))
  .catch((e) => console.log(e));

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
});

const user = mongoose.model("User", userSchema);

module.exports = user;
