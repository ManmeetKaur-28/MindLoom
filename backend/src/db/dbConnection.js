import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`
        );

        // console.log(connectionInstance);
        // console.log("user is", connectionInstance.connection.host);
        console.log("database connected successfully");
    } catch (error) {
        console.log("mongodb connection error ", error);
        process.exit(1);
    }
};

export default connectDB;
