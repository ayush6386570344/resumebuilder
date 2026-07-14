import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import http from "http";
import connectdb from "./config/db.js";
import userRouter from "./routes/userroutes.js";
import resumerouter from "./routes/resumeroutes.js";
import airouter from "./routes/airouter.js";
// import Invokegeminiai from "./config/aiservices.js";
const app = express();
const server=http.createServer(app);
const dbpath="mongodb+srv://ayushsinghkh2005:ayush%401973@cluster0.qbnlqip.mongodb.net/userdataofresumebuilder?appName=Cluster0";
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Server is live"));
app.use('/api/users',userRouter);
app.use('/api/ai',airouter);
app.use('/api/resumes',resumerouter);
mongoose.connect(dbpath).then(()=>{
    server.listen(port,()=>{
        console.log(`Server is running on the port http://localhost:${port}`);
    })
}).catch((err)=>{
    console.log("error in connecting",err);
});
