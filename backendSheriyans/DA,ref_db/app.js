const express = require("express");
const app = express();

const userModel = require("./models/user.model");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname,))
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signin", (req, res) => {
  res.render("signIn");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  let user = await userModel.findOne({ email });

  // res.redirect("/");
});

app.listen(3000, () => {
  console.log("app is listening on port :: 3000");
});
