import express from "express";
import path from "path";
import {ENV} from "./lib/env.js";
import cors from "cors";


const app = express();

app.use(cors({
  origin: "https://prepify.vercel.app",
  credentials: true
}));


const __dirname = path.resolve();  //path.resolve() Returns the absolute path of the current working directory

app.get("/health" , (req ,res) => {
    res.status(200).json({msg : "app is running fine"})
})

app.get("/books" , (req ,res) => {
    res.status(200).json({msg : "books endpoint"})
})

//making our app ready for deployment
if(ENV.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")));   
    // __dirname = backend    ".. " will move it one up that is to intervue folder --> then to frontend and then dist
}

app.get("/{*any}" , (req , res)=>{    //if any other endpoint other then mentioned here , display the react app
    res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"))
})

app.listen(ENV.PORT, ()=>{
    console.log("server is running on port" , ENV.PORT)
})