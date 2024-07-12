// import { Express, Router } from 'express';
import express from "express";

import {
  home,
  login,
  register,
} from "../controllers/auth-controller.js";
import validate from "../middlewares/validate-middleware.js";
import {
  signupSchema,
  loginSchema,
} from "../validators/auth-validator.js";

const authRoute = express.Router();

authRoute.get("/", home);

// router.post("/register", register);
authRoute.route("/register").post(validate(signupSchema), register);
//
authRoute.post("/login", validate(loginSchema), login);

export default authRoute;
