// import { Express, Router } from 'express';
import express from "express";

import {
  getUser,
  home,
  login,
  register,
} from "../controllers/auth-controller.js";
import validate from "../middlewares/validate-middleware.js";
import {
  signupSchema,
  loginSchema,
} from "../validators/auth-validator.js";
import { isLogedIn } from "../middlewares/isLogedin.js";

const authRoute = express.Router();

authRoute.get("/", home);

// router.post("/register", register);
authRoute.route("/register").post(validate(signupSchema), register);
//
authRoute.post("/login", validate(loginSchema), login);
authRoute.get("/user", isLogedIn, getUser);

export default authRoute;
