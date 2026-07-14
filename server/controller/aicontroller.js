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
      console.dir(completion, { depth: null });

return completion.choices[0].message.content;

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
// export const analysis=async(req,res)=>{
//     console.log("i am in analysis");
//     try{
//    const resumefile = req.files.resume[0];
// const jdfile = req.files.jobDescription[0];
// const resumeText = await extractText(resumefile);
// const jdText = await extractText(jdfile);       
//         const systemprompt=`You are an experienced Technical Recruiter, ATS Expert, Career Coach, and Senior Software Engineer.

// Your job is to analyze a candidate's resume against a job description.

// Your analysis should be practical, accurate, and constructive.

// Rules:

// 1. Compare ONLY the information present in the resume with the job description.
// 2. Never assume the candidate has skills that are not mentioned.
// 3. If a skill appears in the job description but not in the resume, classify it as a "Recommended Skill", not a "Missing Skill".
// 4. Give constructive suggestions rather than criticism.
// 5. Generate interview questions based on:
//    - technologies mentioned in the resume
//    - projects mentioned in the resume
//    - technologies required in the job description
//    - experience level of the candidate
// 6. Include beginner and advanced questions whenever appropriate.
// 7. Give an ATS compatibility score from 0 to 100.
// 8. Give a Resume-Job Match score from 0 to 100.
// 9. Keep explanations concise.
// 10. Return ONLY valid JSON.
// 11. Do not use markdown.
// 12. Do not include any text outside the JSON.
// 13. Every list should contain meaningful items instead of generic advice.
// 14. If some information is unavailable, return an empty array instead of inventing information.`

// const userprompt=`Analyze the following resume against the provided job description.

// Resume

// ${resumeText}

// -----------------------------------------------------

// Job Description

// ${jdText}

// -----------------------------------------------------

// Return ONLY JSON using the following schema.

// {
//   "overallSummary": "",

//   "resumeMatchScore": 0,

//   "atsScore": 0,

//   "interviewReadiness": 0,

//   "strengths": [],

//   "skillsFound": [],

//   "recommendedSkills": [],

//   "keywordAnalysis": {
//     "matchedKeywords": [],
//     "recommendedKeywords": []
//   },

//   "resumeSuggestions": [],

//   "projectAnalysis": [
//     {
//       "projectName": "",
//       "relevanceScore": 0,
//       "feedback": ""
//     }
//   ],

//   "interviewQuestions": {

//     "technical": [],

//     "projectBased": [],

//     "jobDescriptionBased": [],

//     "behavioral": [],

//     "codingTopics": []
//   },

//   "learningRoadmap": {

//     "highPriority": [],

//     "mediumPriority": [],

//     "lowPriority": []

//   },

//   "finalRecommendation": ""
// }`


//  const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content: systemprompt,
//                 },
//                 {
//                     role: "user",
//                     content: userprompt,
//                 },
//             ],
//         });
// let result = response.choices[0].message.content;
//         // Remove markdown if AI returns ```json ... ```
//         result = result
//             .replace(/```json/g, "")
//             .replace(/```/g, "")
//             .trim();

//         const analysis = JSON.parse(result);

//         const savedAnalysis = await Analysis.create({
//             userId: req.userid,
//             resumeText,
//             jobDescriptionText: jdText,
//             resumeMatchScore: analysis.resumeMatchScore,
//             atsScore: analysis.atsScore,
//             interviewReadiness: analysis.interviewReadiness,
//             analysis,
//         });

//         fs.unlinkSync(resumefile.path);
//         fs.unlinkSync(jdfile.path);

//         return res.status(200).json({
//             success: true,
//             analysisId: savedAnalysis._id,
//             analysis: savedAnalysis.analysis,
//         });
//     }
//     catch (err) {
//         console.log(err);

//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }
// }
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
