import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);


        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB successfully");
        })

        connection.on("error", (err) => {
            console.log(
                "MongoDB connection error, Please make sure MongoDB is running",
                err);
            process.exit();
        })

    } catch (error) {
        console.log("Error connecting to database");
        console.log(error);
    }
}