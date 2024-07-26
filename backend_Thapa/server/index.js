import express, { Router } from "express";
import connectDb from "./utils/db.js";
import authRoute from "./router/auth.router.js";
import contactRoute from "./router/contact-router.js";
import cors from "cors";
import serviceRoute from "./router/service-router.js";
import adminRoute from "./router/admin-router.js";
const app = express();

const port = 3000;

app.use(express.json());

const crosOptions = {
  origin: "htttp://localhost:5173",
  methods: "GET, POST , PUT ,DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors());

// app.use(errorMiddleware);
app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.use("/api", serviceRoute);
app.use("/api/admin", adminRoute);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at: ${port}`);
    });
  })
  .catch((error) =>
    console.error("Failed to connect", error.message)
  );
