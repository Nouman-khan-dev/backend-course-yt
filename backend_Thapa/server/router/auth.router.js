// import { Express, Router } from 'express';
import express from "express";
import {
  home,
  login,
  register,
} from "../controllers/auth-controller.js";
const app = express();
const router = express.Router();

router.get("/", home);

router.post("/register", register);
//
router.post("/login", login);
export default router;
