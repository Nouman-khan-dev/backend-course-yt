const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("hey");
});
app.get("/create", async (req, res) => {
  let newUser = await userModel.create({
    username: "Nomi",
    email: "nomi@gmail.com",
    password: "2,3,3,3,",
  });
  res.send(newUser);
});

app.get("/fb", (req, res) => {
  res.send("this is fb page");
});

app.listen(3000, () => {
  console.log("your app is listening on 3000");
});
