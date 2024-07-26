import jwt from "jsonwebtoken";
export const isLogedIn = (req, res, next) => {
  const token = req.header("Authorization");
  try {
    if (!token) {
      return res
        .status(401)
        .json({
          error:
            "Access Denied, Unauthorized request! No token found",
        });
    }
    const decoded = jwt.verify(
      token.replace("Bearer", "").trim(),
      "THISISMYSECRETKEY"
    );
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Invalid token", error: error });
    } else {
      console.error("Error while authenticating user:", error);
      res
        .status(500)
        .json({ message: "Server Error while authenticating user" });
    }
  }
};
