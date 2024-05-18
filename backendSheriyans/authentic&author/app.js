const express = require("express");
const app = express();
// const bcryptjs = require("bcryptjs");
const cookieParser = require("cookie-parser");
const path = require("path");
const ejs = require("ejs");
const bcrypt = require("bcryptjs");
const userModel = require("./models/user.model");
const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async function (req, res) {
  const users = await userModel.find();
  res.render("index", { users });
  // console.log(users);
});

app.post("/create", function (req, res) {
  const { name, email, password, age } = req.body;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  const user = userModel.create({ name, email, password: hash, age });

  let token = jwt.sign({ email }, "shhhh.");
  res.cookie("token", token);

  res.redirect("/");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) return res.send("user not found");
  const isMatch = await bcrypt.compare(
    password,
    user.password,
    function (err, result) {
      if (err) return console.log(res.send("error"));
      if (result) return res.send("success");
    }
  );
  if (!isMatch) return res.send("password is incorrect");
});

app.get("/logout", function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("app is listening on 3000");
});
