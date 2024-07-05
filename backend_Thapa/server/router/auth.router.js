// import { Express, Router } from 'express';
import express from "express";
import { home, register } from "../controllers/auth-controller.js";
const app = express();
const router = express.Router();

router.get("/", home);

router.post("/register", register);
//

export default router;
