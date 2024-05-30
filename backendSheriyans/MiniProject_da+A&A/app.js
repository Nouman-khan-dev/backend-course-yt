const express = require("express");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user.model");
const postModel = require("./models/post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const upload = require("./config/multerconfig");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// ********************== / ==***********

app.get("/", async (req, res) => {
  const users = await userModel.find();

  res.render("index", { users });
});

// ********************== register get ==***********

app.get("/register", (req, res) => {
  res.render("register");
});

// ********************== register post ==***********

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
  const posts = await postModel.find().populate();

  email
    ? res.render("profile", { user, posts })
    : res.send("You must have to login first");
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

app.post("/create-post", isLoggedIn, async (req, res) => {
  const { title, content } = req.body;
  const user = await userModel.findOne({ email: req.user.email });

  const post = await postModel.create({
    author: user._id,
    title,
    content,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});
app.get("/like/:id", isLoggedIn, async (req, res) => {
  let id = req.params.id;
  const post = await postModel.findOne({ _id: id });
  const user = await userModel.findOne({ email: req.user.email });

  if (post.likes.includes(user._id)) {
    let index = post.likes.indexOf(user._id);

    post.likes.splice(index, 1);
    post.save();
    console.log("index: ", index, " post.likes", post.likes);
  } else {
    post.likes.push(user._id);
    post.save();
    console.log("post.likes", post.likes);
  }

  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id });
  const user = await userModel.findOne({ email: req.user.email });

  res.render("edit", { post, id: post._id });

  console.log("post update: old ", post);
});
app.post("/update/:id", async (req, res) => {
  const updatedPost = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true }
  );
  // await updatedPost.save();
  console.log(" updated post  : ", updatedPost);
  res.redirect("/profile");
});

// ********************== profile upload  ==***********

app.get("/profile/upload", (req, res) => {
  res.render("profileImgUpload");
});
// ********************== upload post ==***********

app.post(
  "/upload",
  isLoggedIn,
  upload.single("image"),
  async (req, res) => {
    res.redirect("/profile");

    const newUser = await userModel.findOneAndUpdate(
      { email: req.user.email },
      {
        profileImg: req.file.filename,
      },
      { new: true }
    );
    console.log("new User: ", req.file);

    await newUser.save();
  }
);

app.listen(3000, () => {
  console.log("app is listening on port :: 3000");
});
