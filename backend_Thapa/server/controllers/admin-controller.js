import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";

// nomi@gmail.com Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjlmOTk1MGIwNzBmYWEwNjI1OTcwM2QiLCJlbWFpbCI6Im5vbWlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyMTkyMTE3MCwiZXhwIjoxNzI0NTEzMTcwfQ.7nOds9SrexdRZyiR_b4QjcQCFG5BBETRUC7V5NZQNPQ
// nomi1@gmail.com Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmEzOGUzNjBmOTkwYjdmMzA5ZmE3ODMiLCJlbWFpbCI6Im5vbWkxQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjE5OTQ4MDYsImV4cCI6MTcyNDU4NjgwNn0.n8_ExIroBUNT1CejFOhnhYlwVrrtYoO-2DfmOvrDgYs

// ****************************************************
//     Get All Users
// ****************************************************

const getAllUsers = async (req, res) => {
  try {
    const isAdmin = req.body.isAdmin;
    // const allUser = await User.find().select("-password");
    const allUser = await User.find({}, { password: 0 });
    if (allUser || allUser.length > 0) {
      //  if( isAdmin){
      res
        .status(200)
        .json({ message: "operation successfull", data: allUser });
      //  } else res
      //         .status(401)
      //         .json({ message: "access denied! unauthorized request" });
    } else res.status(404).json({ message: "no user found" });
  } catch (error) {
    res.status(400).json({ message: "operation faild", error });
  }
};
// ****************************************************
//     Delete a user
// ****************************************************

const deleteOneUser = async (req, res) => {
  const { user } = req.body;
  try {
    await User.findOneAndDelete({ email: user.email });
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "could not delete user ", error });
  }
};
// ****************************************************
//     Get All Messages
// ****************************************************
const getAllContacts = async (req, res) => {
  try {
    const allContacts = await Contact.find();
    if (allContacts || allContacts.length > 0) {
      res.status(200).json({
        message: "operation successfull",
        data: allContacts,
      });
    } else {
      res.status(404).json({ message: "no contact found" });
    }
  } catch (error) {
    res.status(400).json({ message: "operation faild", error });
  }
};
// ****************************************************
//     Delete a Contact
// ****************************************************
const deleteOneMessage = async (req, res) => {
  const { message } = req.body;
  try {
    const deletedMessage = Contact.fintOneAndDelete({
      email: message.email,
    });
    if (deletedMessage) {
      res
        .status(200)
        .json({ message: "message deleted successfully" });
    } else {
      res.status(404).json({ message: "no message found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "could not delete message", error });
  }
};

export { getAllUsers, getAllContacts };
