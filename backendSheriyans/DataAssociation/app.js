const express = require("express");
const app = express();
const userModel = require("./models/user.model.js");
const postModel = require("./models/post.model.js");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create-user", async (req, res) => {
  const user = await userModel.create({
    name: "Nomi",
    email: "nomi@gmail.com",
    age: 21,
  });
  res.send(user);
});

app.get("/create-post", async (req, res) => {
  const post = await postModel.create({
    title: "This is my post Title",
    postData: "this is my post data",
    user: "664a1d25991ac9b18f051a4b",
  });

  let user = await userModel.findOne({
    _id: "664a1d25991ac9b18f051a4b",
  });
  user.posts.push(post._id);
  user.save();

  res.send(post);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
