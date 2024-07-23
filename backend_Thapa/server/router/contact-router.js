import express from "express";
import contactForm from "../controllers/contact-controller.js";
import validate from "../middlewares/validate-middleware.js";
import messageValidator from "../validators/message-validator.js";

const contactRoute = express.Router();
contactRoute.route("/form").post(contactForm);
// validate(messageValidator)
export default contactRoute;
