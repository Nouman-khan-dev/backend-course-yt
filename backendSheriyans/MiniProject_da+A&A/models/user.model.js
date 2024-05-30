const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("connected to the database"))
  .catch((err) =>
    console.log(
      "error while connecting to the data base the eror :: ",
      err
    )
  );

const userSchema = mongoose.Schema({
  name: String,

  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  profileImg: {
    type: String,
    default: "defaultDp.jpg",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
