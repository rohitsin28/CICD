import mongoose from "mongoose";

export const dbConn = async() => {
    try {
        // await mongoose.connect("mongodb://localhost:27017/testDocker").catch(console.error);
        // await mongoose.connect("mongodb://host.docker.internal:27017/testDocker").catch(console.error);
        await mongoose.connect("mongodb://root:example@mongo:27017/testDocker?authSource=admin");
        console.log("Mongo db successfully connected")
    } catch (error) {
        throw Error('Something went wrong',error);
    }
}
