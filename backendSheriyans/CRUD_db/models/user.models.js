const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/commentsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// mongoose
//   .connect("mongodb://127.0.0.1:3000/testapp")
//   .then(() => console.log("connected to databse"))
//   .catch((err) =>
//     console.log("error in connection of database: ", err)
//   );

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
