import { User } from "../models/user.model.js";

import bcrypt from "bcrypt";

// ------------------------------------------------
//               -- Home  --
// ------------------------------------------------

const home = async (req, res) => {
  try {
    console.log("hello");
    res.send("hi");
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------------------
//               -- register  --
// ------------------------------------------------

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10,);

    // console.log("hashed: ", hashedPassword);
    const newUser = await User.create({
      username,
      email,
      password,
      phone,
    });

    res.status(201).json({
      msg: "registeration successfull!",
      newUser,
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    res.status(500).json("internel server error: ", error);
  }
};

// ------------------------------------------------
//               -- Login  --
// ------------------------------------------------

const login = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("body: ", req.body);
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all the fields!" });
  }

  //
  // ****
  // checking if all the functionality is working
  // ****
  //
  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist!" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid credentials!" });
    }
    return res
      .status(200)
      .json({
        msg: "login successfull!",
        user: user,
      })
      .cookie("token", await user.generateToken());
  } catch (error) {
    res.status(500).json("internel server error: ", error);
  }
};

export { home, register, login };
