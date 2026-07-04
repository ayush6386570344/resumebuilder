import Resume from "../models/resume.js";
import ai  from "../config/ai.js";
// controller for enhancing professional summary
export const enhanceprofessionalsummary=async(req,res)=>{

    try{
        const {usercontent}=req.body;
        if (!usercontent){
            return res.status(400).json({message:"provide all the data"});
        }
        const  response=await ai.chat.completions.create({
            model:process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content: "You are an expert in resume writing.Your task is to enhance the professional summary of a resume.The summary should be 1-2 sentences also highlighting key skills,experience and career objectives.Make it compelling and ATS-Friendly ans only return text no options or anything else.Mention these all only if user mention it otherwise correct the english provide by the user" 
                },
                {
                    role: "user",
                    content: usercontent,
                },
            ],
        });
        const enhancedcontent=response.choices[0].message.content;
        console.log("i am in professional summary",enhancedcontent);
        return res.status(200).json({enhancedcontent});

    }
    catch(err){
        console.log(err);
         return res.status(400).json({message:"errors occured"});
    }
}
// for enhancing job description
export const enhancejobdescription=async(req,res)=>{
    try{
        const {usercontent}=req.body;
        console.log(usercontent);
        if (!usercontent){
            return res.status(400).json({message:"provide all the data"});
        }
        const  response=await ai.chat.completions.create({
            model:process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content:"You are an expert in resume writing.Your task is to enhance the job description of a resume.The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements.Use action verbs and quatifiable results where possible.Make it ATS-Friendly and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: usercontent,
                },
            ],
        });
        const enhancedcontent=response.choices[0].message.content;
        console.log("i am in job desc",enhancedcontent);
        return res.status(200).json({enhancedcontent});

    }
    catch(err){
    console.log("AI ERROR:", err?.status || err);

    if (err?.status === 429) {
        return res.status(429).json({
            message: "Too many requests. Please wait a moment and try again."
        });
    }

    return res.status(500).json({
        message: err.message || "Internal server error"
    });
}
}

//controller for uploading resume to the database
export const uploadexistingresume=async (req,res)=>{
    try{
        const {resumetext,title}=req.body;
        const userid=req.userid;
        if (!resumetext){
            return res.status(400).json({message:"provide all the data"});
        }

        const systemprompt="You are an expert AI agent to extract data from resume."
        const userprompt=`extract the data from theis resume:${resumetext}
        Provide data in the following json format with no additional text before or after:
        { professional_summary:{type:String,default:" "},
    accent_color:{type:String,default:'#3B82F6'},
    skills:[{type:String}],
    personalinfo:{
        image:{type:String,default:''},
        full_name:{type:String,default:''},
        profession:{type:String,default:''},
        email:{type:String,default:''},
        phone:{type:String,default:''},
        location:{type:String,default:''},
        linkedin:{type:String,default:''},
        website:{type:String,default:''},
    },
    experience:[
        {
            company:{type:String},
            position:{type:String},
            start_date:{type:String},
            end_date:{type:String},
            description:{type:String},
            is_current:{type:Boolean},
        }
    ],
    project:[
        {
        name:{type:String},
        // type:{type:String}, currently i am not using it
        description:{type:String}
        }
    ],
    education:[
        {
            insitution:{type:String},
            degree:{type:String},
            field:{type:String},
            graduation_date:{type:String},
            gpa:{type:String},
        }
    ]}`
     const  response=await ai.chat.completions.create({
            model:process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content:systemprompt
                },
                {
                    role: "user",
                    content: userprompt
                },
            ],
        });
        const extracteddata=response.choices[0].message.content;
        const parseddata=JSON.parse(extracteddata);
        const newresume=await Resume.create({userid,title,...parseddata});
        res.json({resumeid:newresume._id})
    }
     catch(err){
         return res.status(400).json({message:"errors occured"});
    }
    
}
