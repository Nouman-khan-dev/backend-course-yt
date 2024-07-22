import jwt from "jsonwebtoken";
export const isLogedIn = (req, res, next) => {
  const token = req.header("Authorization");
  try {
    if (!token) {
      return res.status(401).json({ error: "Access Denied" });
    } else {
      const decode = jwt.verify(
        token.replace("Bearer", "").trim(),
        "THISISMYSECRETKEY"
      );
      if (decode) {
        req.user = decode;
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error while authenticating user",
    });
  }
  next();
};
