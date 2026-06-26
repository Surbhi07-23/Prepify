import express from "express";
import path from "path";

import {serve} from "inngest/express";
import {ENV} from "./lib/env.js";
import cors from "cors";

import connectDB from "../src/lib/db.js"
import { inngest , inngestFunctions } from "./lib/inngest.js";    //functions = [syncUser , deleteUserFromDB]

const app = express();

app.use(express.json());

//Enable CORS for vercel client
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization", "X-Inngest-SDK", "X-Inngest-Env", "X-Inngest-Signature"], // Allow SDK system headers explicitly
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

//main inngest sync endpoint
app.all("/api/inngest*" , serve({client:inngest , functions : inngestFunctions ,servePath: "/api/inngest"}))


const __dirname = path.resolve();  //path.resolve() Returns the absolute path of the current working directory

// root landing check
app.get("/", (req, res) => {
    res.status(200).send("Prepify Backend Server is Live and Running!");
});

app.get("/health" , (req ,res) => {
    res.status(200).json({msg : "app is running fine"})
})

app.get("/books" , (req ,res) => {
    res.status(200).json({msg : "books endpoint"})
})

// //making our app ready for deployment
// if(ENV.NODE_ENV == "production"){
//     app.use(express.static(path.join(__dirname , "../frontend/dist")));   
//     // __dirname = backend    ".. " will move it one up that is to intervue folder --> then to frontend and then dist
// }

// app.get("/{*any}" , (req , res)=>{    //if any other endpoint other then mentioned here , display the react app
//     res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"))
// })

app.listen(ENV.PORT, ()=> {
    console.log("server is running on port" , ENV.PORT)
    connectDB();
})