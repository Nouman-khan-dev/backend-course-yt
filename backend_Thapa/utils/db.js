import mongoose from 'mongoose';

let URI =
    'mongodb+srv://developernomi68:nouman12@cluster0.xrwhmrp.mongodb.net/';

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Error connecting to the database: ', error);
        process.exit(1); // Term
    }
};
export default connectDb;
