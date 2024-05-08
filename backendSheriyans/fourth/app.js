const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user.models.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
  console.log(users);
});
app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await userModel.create({
    name: name,
    email: email,
    password: password,
  });
  res.send(user);
  console.log(user);
});

app.listen(3000, function () {
  console.log("your server is listening on 3000");
});
