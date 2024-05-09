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
});

app.get("/delete/:id", async function (req, res) {
  const user = await userModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await userModel.create({
    name: name,
    email: email,
    password: password,
  });
  res.redirect("/read");
});

app.get("/edit/:id", async function (req, res) {
  const user = await userModel.findOne({ _id: req.params.id });
  res.render("update", { user });
});

app.post("/update/:id", async function (req, res) {
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name || name,
      email: req.body.email,
      password: req.body.password,
    },
    { returnOrgnal: false }
  );

  res.redirect("/read");
});

app.listen(3000, function () {
  console.log("your server is listening on 3000");
});
