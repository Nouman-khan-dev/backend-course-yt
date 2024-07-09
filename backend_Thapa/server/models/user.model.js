import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// the following method will work before saving the userSchema like a middleware 'save' means before saving

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      "THISISMYSECRETKEY",
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};


userSchema.methods.verifyPassword = async function (password){
  try {
    return await bcrypt.compare(password,this.password )
  } catch (error) {
    console.error("error while comparing the password : ", error)
  }
}

const User = new mongoose.model("User", userSchema);
export { User };
