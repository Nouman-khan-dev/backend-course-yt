import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";

// nomi@gmail.com Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjlmOTk1MGIwNzBmYWEwNjI1OTcwM2QiLCJlbWFpbCI6Im5vbWlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyMTkyMTE3MCwiZXhwIjoxNzI0NTEzMTcwfQ.7nOds9SrexdRZyiR_b4QjcQCFG5BBETRUC7V5NZQNPQ
// nomi1@gmail.com Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmEzOGUzNjBmOTkwYjdmMzA5ZmE3ODMiLCJlbWFpbCI6Im5vbWkxQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjE5OTQ4MDYsImV4cCI6MTcyNDU4NjgwNn0.n8_ExIroBUNT1CejFOhnhYlwVrrtYoO-2DfmOvrDgYs

// ****************************************************
//     Get All Users
// ****************************************************

const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({}, { password: 0 });
    if (allUser || allUser.length > 0) {
      res
        .status(200)
        .json({ message: "operation successfull", data: allUser });
    } else res.status(404).json({ message: "no user found" });
  } catch (error) {
    res.status(400).json({ message: "operation faild", error });
  }
};
// ****************************************************
//     Delete a user
// ****************************************************

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res
        .status(200)
        .json({ message: "user deleted successfully", deletedUser });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "could not delete user ", error });
  }
};
// ****************************************************
//     update a user
// ****************************************************

// first get a user
const getUserToUpdate = async (req, res) => {
  const userId = req.params.id;
  try {
    if (userId) {
      const user = await User.findById(userId).select("-password");
      if (user) {
        res.status(200).json({ message: "user found", user });
      } else {
        res.status(400).json({ message: "user not found" });
      }
    } else {
      res.status(400).json({ message: "useer Id not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "server error while getting user", error });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          isAdmin: userData.isAdmin,
        },
      },
      {
        new: true,
      }
    );

    if (updatedUser) {
      res
        .status(200)
        .json({ message: "user updated successfully", updatedUser });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "could not update user ", error });
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
  const id = req.params.id;

  try {
    const deletedMessage = await Contact.findByIdAndDelete(id);
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

export {
  getAllUsers,
  getAllContacts,
  deleteUser,
  getUserToUpdate,
  updateUser,
  deleteOneMessage,
};
