import express from "express";
import {
  getAllUsers,
  getAllContacts,
  deleteUser,
  updateUser,
  getUserToUpdate,
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
adminRoute.route("/users/delete/:id").delete(deleteUser);
adminRoute.route("/users/:id").get(getUserToUpdate);
adminRoute.route("/users/:id/update").patch(updateUser);

export default adminRoute;
