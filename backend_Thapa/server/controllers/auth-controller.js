import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { response } from "express";

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

const register = async (req, res, next) => {
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
    return res.status(201).json({
      message: "registeration successfull!",
      newUser,
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internel server error: ", error: error });
    /*next(error);*/
  }
};

// ------------------------------------------------
//               -- Login  --
// ------------------------------------------------

const login = async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all the fields!" });
  }

  //
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist!" });
    }
    const isPasswordCorrect = await user.verifyPassword(password);
    if (isPasswordCorrect) {
      // const token = await user.generateToken();
      // console.log(awaituser.generateToken());
      return res.status(200).json({
        message: "login successfull!",
        user: user,
        token: await user.generateToken(),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid credentials!" });
    }
  } catch (error) {
    res.status(500).json("internel server error: ", error);
  }
};

// ------------------------------------------------
//               -- get user  --
// ------------------------------------------------

const getUser = async (req, res) => {
  const user = req.user;
  try {
    const userData = await User.findOne({ email: user.email });
    if (userData) {
      return res.status(200).json({ userData });
    } else {
      res.status(400).json({ message: "user does not recognize" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server Error" });
  }
};

export { home, register, login, getUser };
