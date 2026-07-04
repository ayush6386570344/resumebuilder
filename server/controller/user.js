import bcrypt from 'bcrypt'
import User from '../models/user.js';
import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken'
import Resume from '../models/resume.js';
const generatetoken=(userid)=>{
    const token=jwt.sign({userid},process.env.SECRET_KEY,{expiresIn:'7d'});
    return token;
}
export const registeruser=async (req,res)=>{
    try{
            const {name,email,password}=req.body;
    if (!name || !email || !password){
        return res.status(400).json({message:"fill all the input"})
    }
    const checkemail=await User.findOne({email});
    if (checkemail){
          return res.status(400).json({message:"email already exist"});
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const newuser= await User.create({
        name,email,password:hashedpassword
    })
    newuser.password=undefined;
    const token=generatetoken(newuser._id);
    return res.status(201).json({message:"user register succesfully",token,user:newuser});
    }
    catch(err){
       return  res.status(400).json({message:"some error is coming."})
    }
}

// API type:post

export const loginuser= async (req,res)=>{
    try{

        const {email,password}=req.body;
        const user=await User.findOne({email});
        if (!user){
          return   res.status(404).json({message:"Email id do not exist"})
        }
       
        const passwordmatch= await bcrypt.compare(password,user.password);
        if (!passwordmatch){
           return  res.status(400).json({message:"Incorrect Password"})
        }
        const token=generatetoken(user._id);
        user.password=undefined
        return res.status(201).json({message:"Login Successful",token,user})
    }
    catch(err){
       return res.status(400).json({message:"Error occuredl",err})
    }
}

//controller for getting user by id
// api type=get 

export const getuserbyid=async(req,res)=>{
    try{
        const userid=req.userid;
        //these userid will be added to request by middleware 
        const user=await User.findById(userid);
        if (!user){
           return  res.status(404).json({message:"user not found"})
        }
        user.password=undefined;
       return  res.status(200).json({user})
    }
    catch(err){
        return res.status(400).json({message:"Some error occured",err})
    }

}

// for getting user resumme 
export const getuserresumes=async(req,res)=>{
    try{
        const userid=req.userid;
        
        const userresumes=await Resume.find({userid});
        
        if (!userresumes){
           return res.status(404).json({message:"Can't get resume"});
        }
        return res.status(200).json({userresumes})
    }
    catch(err){
        return res.status(400).json({message:"Some error occured",err})
    }
}