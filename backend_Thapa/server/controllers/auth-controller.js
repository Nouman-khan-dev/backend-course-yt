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
    console.log("error:", error);
  }
};

export { home, register };
