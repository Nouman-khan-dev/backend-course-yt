const express = require("express");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname,))
app.use(cookieParser());

// ********************== / ==***********

app.get("/", async (req, res) => {
  const users = await userModel.find();

  res.render("index", { users });
});
app.get("/register", (req, res) => {
  res.render("register");
});

// ********************== register ==***********

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User already registered");

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  const newUser = await userModel.create({
    name: name,
    password: hash,
    email,
  });

  let token = jwt.sign({ email, password }, "shhhh.");

  res.cookie("token", token);
  // res.send("registered");
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// ********************== Login==***********

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user)
    return res.send(
      "incorrect email or password, please enter a valid email or password"
    );

  const validPassword = bcrypt.compare(
    password,
    user.password,
    (err, result) => {
      if (result) {
        let token = jwt.sign({ email, password }, "shhhh.");
        res.cookie("token", token);
        res.redirect("/profile");
      } else if (err) {
        console.log("error while checking the password:: ", err);
        res.send(
          "incorrect email or password, please enter a valid email or password"
        );
      } else if (!result) {
        res.send(
          "incorrect email or password, please enter a valid email or password"
        );
      }
    }
  );
});
// ********************== LOG OUT ==***********

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});
// ********************== PROFILE==***********
app.get("/profile", isLoggedIn, async (req, res) => {
  const email = req.user.email;
  const user = await userModel.findOne({ email });

  email
    ? res.render("profile", { user })
    : res.send("You must have to logi first");
});

function isLoggedIn(req, res, next) {
  if (!req.cookies.token) {
    res.redirect("/login");
  } else {
    let data = jwt.verify(req.cookies.token, "shhhh.");
    req.user = data;
    next();
  }
}

app.listen(3000, () => {
  console.log("app is listening on port :: 3000");
});
