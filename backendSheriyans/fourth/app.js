const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/read", (req, res) => {
  res.render("read");
});
app.post("/create", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  res.send("ok");
});

app.listen(3000, function () {
  console.log("your server is listening on 3000");
});
