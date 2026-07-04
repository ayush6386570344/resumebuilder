import Imagekit from "../config/imagekit.js";
import Resume from "../models/resume.js";
import fs from 'fs';

export const createresume=async(req,res)=>{
    try{
        const userid=req.userid;
        const {title}=req.body; 
        const resume=await Resume.create({userid,title});
        return res.status(201).json({message:'Resume created Successfully',resume})

    }catch(err){
       return res.status(400).json({message:"error is occured"})
    }
};
export const deleteresume = async (req,res) => {

    try{
        const userid=req.userid;
        const {resumeid}=req.params;
        await Resume.findOneAndDelete({userid,_id:resumeid});
        return res.status(201).json({message:"Resume deleted Successfully",id:resumeid});
    }
    catch(err){
        return res.status(400).json({message:"some error occur"});
    }
}
export const getresumebyid=async (req,res)=>{
    try{
        const userid=req.userid;
        const {resumeid}=req.params;
        const resume=await Resume.findOne({userid, _id:resumeid});
        if (!resume){
            return res.status(404).json({message:"Resume is not there"})
        }
        resume._v=undefined;
        resume.createdAt=undefined;
        resume.updatedAt=undefined;
        return res.status(201).json({resumedata:resume});
    }
    catch(err){
        return res.status(400).json({message:"some error occur"})
    }
}

//for exporting the resume data in public 
export const getpublicresumebyid=async(req,res)=>{

    try{
        console.log("feerge");
        const {resumeid}=req.params;
        console.log(resumeid);
        const resume=await Resume.findOne({public:true,_id:resumeid});
        if (!resume){
            return res.status(404).json({message:"resume not found"})
        }
        return res.status(201).json({resume});
    }
    catch(err){
        return res.status(400).json({message:"resume not found"})
    }
}

export const updateresume=async (req,res)=>{
    try{
        const userid=req.userid;
        const {resumeid,resumedata,removeBackground}=req.body;
        
        console.log("give me the ",resumeid);
        const image=req.file;
        let copyresumedata;
        if (typeof resumedata === 'string') {
            copyresumedata =await JSON.parse(resumedata);
        } else {
            copyresumedata= structuredClone(resumedata);
        }
        if (image){
            const imagebufferdata=fs.createReadStream(image.path)
            const response = await Imagekit.files.upload({
                    file: imagebufferdata,
                    fileName: 'resume.png',
                    folder:'user-resumes',
                    transformation:{
                        pre:'w-300,h-300,fo-face,z-0.75'+ (removeBackground ? ',e.-bgremove':'')
                    }
                    });
                    copyresumedata.personal_info.image=response.url;
        }
       console.log("I AM  HERE " ,copyresumedata);
       const resume=await Resume.findOneAndUpdate({userid,_id:resumeid},{$set:copyresumedata},{returnDocument:"after"});
       
       return res.status(201).json({resume,message:"update succesfully"});
    }   
    catch(err){
        console.log("fewf");
        return res.status(400).json({message:"error founded"})
    }
}