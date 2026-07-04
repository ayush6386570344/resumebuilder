import mongoose, { mongo } from "mongoose";
const connectdb=async()=>{
    try{
        mongoose.connection.on("connected",()=>{console.log("database connected succesfully")})
        let mongodburi=process.env.MONGODB_URI;
        const projectname="resume-builder";
        if(!mongodburi){
            throw new Error("MONGODB_URI environment variable not set")
        }
        if (mongodburi.endsWith('/')){
            mongodburi=mongodburi.slice(0,-1)
        }
        await mongoose.connect(`${mongodburi}/${projectname}`)
    }
    catch(error){
        console.log("Error connecting to mongodb:",error)
    }
}
export default connectdb;