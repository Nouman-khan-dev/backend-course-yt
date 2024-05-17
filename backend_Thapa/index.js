import express, { Router } from "express";
import connectDb from "./utils/db.js";
import router from "./router/auth.router.js";
const app = express();
const port = 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at: ${port}`);
    });
  })
  .catch((error) =>
    console.error("Failed to connect", error.message)
  );

app.use("/", router);
app.use("/auth", router);
app.use("/fb", router);
