import express from "express";
import {
  getAllUsers,
  getAllContacts,
} from "../controllers/admin-controller.js";
import { isLogedIn } from "../middlewares/isLogedin.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
const adminRoute = express.Router();

adminRoute
  .route("/users")
  .get(isLogedIn, adminMiddleware, getAllUsers);
adminRoute
  .route("/contacts")
  .get(isLogedIn, adminMiddleware, getAllContacts);

export default adminRoute;
