import mongoose from "mongoose"

import {ENV} from "./env.js"

const connectDB = async() => {
    try{
        if (!ENV.DB_URL) {
            throw new Error("DB_URL is not defined in environment variables")
        }
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log("Connected to MongoDB" , conn.connection.host);
    }catch(error){
        console.error("error connecting to mongoDB" , error);
        process.exit(1)      //0 : success , 1: failure
    }
}

export default connectDB;