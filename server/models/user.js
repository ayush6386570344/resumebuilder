import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const user= new mongoose.Schema({
    name:{
        type:String,required:true
    },
    email:{
        type:String,require:true,unique:true
    },
    password:{type:String,required:true,unique:true},
},{timestamps:true})

user.method.comparepassword=function(password){
    return bcrypt.compareSync(password,this.password);
}
const User=mongoose.model("User",user);
export default User

 