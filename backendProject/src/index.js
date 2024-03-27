// import { dotenv } from "dotenv";
import { config } from "dotenv";
// config({ path: process.ENV })
import connectDB from "./db/index.js";

config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at Port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERR", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log("App is listitng on port ", process.env.MONGODB_URL);
    });
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
})();
*/
