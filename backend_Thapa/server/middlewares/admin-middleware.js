import { User } from "../models/user.model.js";

const adminMiddleware = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = req.user;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const isAdmin = foundUser.isAdmin;

    if (isAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "access denied! unauthorized request" });
    }
  } catch (error) {
    console.error("Error while checking admin status:", error);
    res
      .status(500)
      .json({ message: "Server Error while checking admin status" });
  }
};

export default adminMiddleware;
//

// ==================================================

//

// import { User } from "../models/user.model.js";

// const adminMiddleware = async (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   const user = req.user;
//   try {
//     const isAdmin = await User.findOne({ email: user.email })
//       .select("isAdmin")
//       .then((user) => user?.isAdmin);

//     isAdmin
//       ? next()
//       : res
//           .status(401)
//           .json({ message: "access denied! unauthorized request" });
//   } catch (error) {
//     next(error);
//   }
// };

// export default adminMiddleware;
