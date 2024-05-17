const express = require("express");
const app = express();
// const bcryptjs = require("bcryptjs");
const cookieParser = require("cookie-parser");
const path = require("path");
const ejs = require("ejs");
const bcrypt = require("bcryptjs");
const userModel = require("./models/user.model");
const { brotliCompress } = require("zlib");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async function (req, res) {
  const users = await userModel.find();
  res.render("index", { users });
  console.log(users);
});

app.post("/create", function (req, res) {
  const { name, email, password, age } = req.body;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  const user = userModel.create({ name, email, password: hash, age });
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("app is listening on 3000");
});

/*
  const myPlaintextPassword = "mysecretpassword";
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(myPlaintextPassword, salt);

  console.log("hashed password:", hash);
  res.send(hash);
  bcryptjs.compareSync(
    "mysecretpassword",
    hash,
    function (err, result) {
      console.log(result);
    }
  );
*/
