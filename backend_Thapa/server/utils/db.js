import mongoose from "mongoose";
// const uri = "mongodb://localhost:27017/mernThapa";
// const uri =
//   "mongodb+srv://developernomi68:nouman12@cluster0.mongodb.net/backend";
const URI =
  "mongodb+srv://nomiofficial68:s9zYhexZ5hixMaa0@mydb.j1lmvfj.mongodb.net/?retryWrites=true&w=majority&appName=mydb";
const uri =
  "mongodb+srv://developernomi68:nouman12@cluster0.xrwhmrp.mongodb.net/newdb";
// import { MongoClient, ServerApiVersion } from "mongodb";
// const uri =
//   "mongodb+srv://developernomi68:nouman12@cluster0.xrwhmrp.mongodb.net/";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
// "mongodb+srv://developernomi68:nouman12@cluster0.xrwhmrp.mongodb.net/MyDB?retryWrites=true&w=majority&appName=Cluster0";
// let URI =
//   "mongodb+srv://developernomi68:nouman12@cluster0.xrwhmrp.mongodb.net";
// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
const connectDb = async () => {
  // run();
  try {
    await mongoose
      .connect(URI)
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

// mongodb+srv://developernomi68:<password>@cluster0.qie1o5i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
