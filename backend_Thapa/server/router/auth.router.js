// import { Express, Router } from 'express';
import express from "express";

import {
  home,
  login,
  register,
} from "../controllers/auth-controller.js";
import validate from "../middlewares/validate-middleware.js";
import signupSchema from "../validators/auth-validator.js";

const app = express();

const router = express.Router();

router.get("/", home);

// router.post("/register", register);
router.route("/register").post(validate(signupSchema), register);
//
router.post("/login", login);

export default router;
