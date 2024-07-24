import express from "express";
import serviceController from "../controllers/service-controller.js";
import { isLogedIn } from "../middlewares/isLogedin.js";

const serviceRoute = express.Router();
serviceRoute.route("/services").get(serviceController);

export default serviceRoute;
