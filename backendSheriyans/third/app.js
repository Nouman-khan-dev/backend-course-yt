const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("hey");
});
app.get("/create", async (req, res) => {
  let newUser = await userModel.create({
    username: "NomiK",
    email: "nomi@gmail.com",
    password: "2,3,3,3,",
  });
  res.send(newUser);
});
app.get("/update", async (req, res) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { username: "Nomi" },
    { email: "Nouman@gamil.com" },
    { new: true }
  );
  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  const users = await userModel.find({ username: "Nomi" }); // also can use findOne() which will return an object
  res.send(users);
});
app.get("/delete", async (req, res) => {
  const users = await userModel.findOneAndDelete({
    username: "NomiK",
  });
  res.send("user deleted");
});

app.get("/fb", (req, res) => {
  res.send("this is fb page");
});

app.listen(3000, () => {
  console.log("your app is listening on 3000");
});
