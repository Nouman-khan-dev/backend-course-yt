import express from "express";
import {
  getAllUsers,
  getAllContacts,
} from "../controllers/admin-controller.js";
const adminRoute = express.Router();

adminRoute.route("/users").get(getAllUsers);
adminRoute.route("/contacts").get(getAllContacts);

export default adminRoute;
