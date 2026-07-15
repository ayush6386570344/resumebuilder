import Resume from "../models/resume.js";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import Analysis from "../models/anlysisstore.js";
import fs from "fs";
import pdfParse from "pdf-parse";
import genai  from "../config/aiservices.js";
import { openrouter } from "../config/aiservices.js";
import gemini from "../config/aiservices.js"
import ai from "../config/ai.js";

export async function generateAI(prompt) {
    try {
        const response = await gemini.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        return response.text;
    } catch (err) {

        // Gemini Busy?
        if (
            err.message.includes("503") ||
            err.message.includes("UNAVAILABLE")
        ) {

            console.log("Gemini busy. Switching to OpenRouter...");

            const completion =
                await openrouter.chat.completions.create({
                    model: "openrouter/free",

                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                });

            return completion.choices[0].message.content;
        }

        throw err;
    }
}

// controller for enhancing professional summary
export const enhanceprofessionalsummary=async(req,res)=>{
    try{
        const {usercontent}=req.body;
        console.log("i am in enhace profitl",usercontent);
        if (!usercontent){
            return res.status(400).json({message:"provide all the data"});
        }
        const prompt=`${usercontent} You are an expert in resume writing.Your task is to enhance the professional summary of a resume that i provided in user content.The summary should be 1-2 sentences also highlighting key skills,experience and career objectives.Make it compelling and ATS-Friendly ans only return text no options or anything else.Mention these all only if user mention it otherwise correct the english provide by the user`
 const enhancedcontent=await generateAI(prompt);
 console.log(enhancedcontent);
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

        const prompt=`${usercontent} You are an expert in resume writing.Your task is to enhance the job description of a resume that is in usercontent.The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements.Use action verbs and quatifiable results where possible.Make it ATS-Friendly and only return text no options or anything else.`
        // const  response=await ai.chat.completions.create({
        //     model:process.env.OPENAI_MODEL,
        //     messages: [
        //         {   role: "system",
        //             content:"You are an expert in resume writing.Your task is to enhance the job description of a resume.The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements.Use action verbs and quatifiable results where possible.Make it ATS-Friendly and only return text no options or anything else."
        //         },
        //         {
        //             role: "user",
        //             content: usercontent,
        //         },
        //     ],
        // });
        // const enhancedcontent=response.choices[0].message.content;
        // console.log("i am in job desc",enhancedcontent);
        const enhancedcontent=await generateAI(prompt);
        console.log(enhancedcontent)
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
export const analysis=async(req,res)=>{
    try{
        const buffer=fs.readFileSync(req.file.path);
        const pdfData=await pdfParse(buffer);
        const resumeText=pdfData.text;
        const jobDescription=req.body.jobDescription;
 const prompt = `
You are an expert ATS Resume Analyzer, Senior Technical Recruiter and Senior Software Engineer.

Resume:
${resumeText}

Job Description:
${jobDescription}

Analyze the resume and return ONLY valid JSON.

Return the JSON in EXACTLY this format.

{
  "resumeSummary": "",

  "jobMatch": {
    "score": 0
  },

  "resumeScore": 0,

  "interviewReadiness": 0,

  "executiveOverview": {
    "verdict": "",
    "recruiterImpression": "",
    "confidence": ""
  },

  "topStrengths": [
    {
      "title": "",
      "description": ""
    }
  ],

  "atsCoverage": {
    "score": 0,
    "keywords": []
  },

  "technicalStack": {
    "frontend": [],
    "backend": [],
    "database": [],
    "tools": []
  },

  "interviewFocus": [
    {
      "topic": "",
      "description": ""
    }
  ],

  "interviewQuestions": [
    {
      "category": "",
      "question": ""
    }
  ],

  "hrQuestions": [
    {
      "question": "",
      "reason": ""
    }
  ],

  "behavioralQuestions": [
    {
      "question": "",
      "reason": ""
    }
  ]
}

Rules:

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT wrap JSON inside \`\`\`.
4. Every field must exist.
5. If there is no data, return an empty array.
6. jobMatch.score, resumeScore, interviewReadiness and atsCoverage.score must be numbers between 0 and 100.
7. Categorize technologies into frontend, backend, database and tools.
8. interviewFocus should contain the most important topics the candidate should revise before the interview.
9. interviewQuestions should contain 8 technical interview questions based on both the resume and job description.
10. HR and Behavioral questions should be personalized using the candidate's resume.
11. Do not omit any field.
12. If a section has no information, return an empty array [] or an empty string "" as appropriate.
13. Do not invent new keys.
14. The JSON must exactly match the schema above.
Return ONLY JSON.
`;
// const result = await genai.models.generateContent({
//         model: "gemini-3.5-flash",
//         contents: prompt,
//     });
const text = await generateAI(prompt);

const cleanText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

console.log("AI Response:");
console.log(cleanText);

const analysis = JSON.parse(cleanText);
// console.log(analysis);

        res.json({
            success:true,
            analysis
        })
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message,success:false})
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
