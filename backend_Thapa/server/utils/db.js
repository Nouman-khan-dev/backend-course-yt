import mongoose from "mongoose";
const uri = "mongodb://localhost:27017/mernThapa";

const connectDb = async () => {
  // run();
  try {
    await mongoose
      .connect(uri)
      .then(() => console.log("db connected"))
      .catch((err) =>
        console.log("error while db connection : ", err)
      );
  } catch (error) {
    console.log("Error connecting to the database: ", error);
    process.exit(1); // Term
  }
};
export default connectDb;
