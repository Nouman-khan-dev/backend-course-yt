import express, { Router } from "express";
import connectDb from "./utils/db.js";
import authRoute from "./router/auth.router.js";
import contactRoute from "./router/contact-router.js";
const app = express();

const port = 3000;

app.use(express.json());
// app.use(errorMiddleware);
app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at: ${port}`);
    });
  })
  .catch((error) =>
    console.error("Failed to connect", error.message)
  );
