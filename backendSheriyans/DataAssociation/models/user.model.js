const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/dataAssociation")
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch((err) => {
    console.log("err while connecting to database :: ", err);
  });

const userSchema = Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  age: Number,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
