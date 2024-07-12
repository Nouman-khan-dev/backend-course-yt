import { Contact } from "../models/contact.model.js";

const contactForm = async (req, res) => {
  // res.send("hi");
  const { username, email, message } = req.body;
  console.log(req.body);
  try {
    const newMessage = await Contact.create({
      username,
      email,
      message,
    });
    console.log("done");
    return res.status(200).json({
      message: "message send successfully",
      newMessage,
    });
  } catch (error) {
    console.error("errr");
    return res.status(500).json({
      message: "message not delivered",
      error: error.message,
    });
  }
};

export default contactForm;
