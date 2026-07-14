import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingAnalysis from "../component/Analysis/Loadinganalysis";
import MetricCard from "../component/Analysis/MetricCard";
import ExecutiveOverview from "../component/Analysis/ExecutiveOverview";
import TopStrengths from "../component/Analysis/TopStrengths";
import ATSCoverage from "../component/Analysis/ATSCoverage";
import InterviewFocus from "../component/Analysis/InterviewFocus";
import InterviewQuestions from "../component/Analysis/interviewquetions";
import HRQuestions from "../component/Analysis/hrquetions";
import BehavioralQuestions from "../component/Analysis/behavioural";
import TechnicalStack from "../component/Analysis/technicalstack";

import { Target,Brain,FileCheck } from "lucide-react";
const AnalysisResult = () => {
  const location = useLocation();
const { analysis: apiAnalysis } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);

  // Temporary dummy data
//  const dummyData = {
//   resumeSummary:
//     "Strong MERN Stack developer with good problem-solving skills and solid backend knowledge.",

//   jobMatch: {
//     score: 87,
//   },

//   resumeScore: 91,

//   interviewReadiness: 84,

//   executiveOverview: {
//     verdict:
//       "Excellent match for Full Stack Developer roles with strong frontend and backend capabilities.",
//     recruiterImpression:
//       "Likely to attract recruiter attention due to relevant technical stack, clean resume structure, and competitive programming profile.",
//     confidence: "High",
//   },

//  topStrengths: [
//   {
//     title: "Full Stack Development",
//     description:
//       "Strong experience building MERN applications with authentication, REST APIs, and deployment."
//   },
//   {
//     title: "Problem Solving",
//     description:
//       "Solved 300+ coding problems across LeetCode and GeeksforGeeks."
//   },
//   {
//     title: "Modern React",
//     description:
//       "Uses React Hooks, Redux Toolkit, React Router and Tailwind CSS efficiently."
//   },
//   {
//     title: "Backend Development",
//     description:
//       "Experience with Express.js, MongoDB, JWT Authentication and API design."
//   },
// ],
// atsCoverage: {
//   score: 82,

//   keywords: [
//     "React",
//     "Node.js",
//     "Express",
//     "MongoDB",
//     "JWT",
//     "REST API",
//     "Tailwind CSS",
//     "Redux Toolkit",
//     "Git",
//     "Problem Solving"
//   ]
// },
// interviewFocus: [
//   {
//     topic: "React Hooks",
//     description:
//       "Be comfortable explaining useState, useEffect, useMemo, useCallback and Context API."
//   },
//   {
//     topic: "JWT Authentication",
//     description:
//       "Understand token generation, verification, middleware, and refresh token concepts."
//   },
//   {
//     topic: "MongoDB",
//     description:
//       "Revise aggregation pipeline, indexing, and schema design."
//   },
//   {
//     topic: "REST APIs",
//     description:
//       "Review CRUD operations, HTTP status codes, authentication, and error handling."
//   }
// ],
// interviewQuestions: [
//   {
//     category: "React",
//     question: "Explain the Virtual DOM and how React uses it."
//   },
//   {
//     category: "React",
//     question: "What is the difference between useMemo and useCallback?"
//   },
//   {
//     category: "Backend",
//     question: "Explain the complete JWT Authentication flow."
//   },
//   {
//     category: "Backend",
//     question: "How does Express middleware execute requests?"
//   },
//   {
//     category: "MongoDB",
//     question: "What are indexes in MongoDB?"
//   },
//   {
//     category: "MongoDB",
//     question: "Explain the Aggregation Pipeline."
//   },
//   {
//     category: "Project",
//     question: "What was the biggest challenge while building your Resume Builder?"
//   },
//   {
//     category: "System Design",
//     question: "How would you scale this application to support 100,000 users?"
//   }
// ],
// hrQuestions: [
//   "Tell me about yourself.",
//   "Why do you want to join our company?",
//   "Where do you see yourself in five years?",
//   "Why should we hire you?",
//   "Describe your biggest strength."
// ],
// behavioralQuestions: [
//   "Describe a difficult bug you solved.",
//   "Tell me about a time you worked under pressure.",
//   "Describe a conflict within a team and how you handled it.",
//   "Tell me about a project you are most proud of.",
//   "Describe a situation where you learned a new technology quickly."
// ],
// technicalStack: {
//   frontend: [
//     "React",
//     "Redux Toolkit",
//     "Tailwind CSS",
//     "HTML",
//     "CSS",
//     "JavaScript"
//   ],

//   backend: [
//     "Node.js",
//     "Express.js",
//     "JWT",
//     "REST API"
//   ],

//   database: [
//     "MongoDB",
//     "Mongoose"
//   ],

//   tools: [
//     "Git",
//     "GitHub",
//     "VS Code",
//     "Postman"
//   ]
// },
// };

useEffect(() => {
  if (apiAnalysis) {
    console.log(apiAnalysis);
    setAnalysis(apiAnalysis);
  }
   setLoading(false);
}, [apiAnalysis]);
  if (loading) {
    return <LoadingAnalysis />;
  }

 return (
  <div className="min-h-screen bg-zinc-950 text-white">
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold">
        AI Resume Intelligence
      </h1>

      <p className="text-zinc-400 mt-2">
        Personalized interview preparation report.
      </p>

<div className="grid lg:grid-cols-3 gap-6 mt-10">

  <MetricCard
    title="Job Match"
    value={analysis.jobMatch.score}
    subtitle="Compatibility with JD"
    color="text-indigo-400"
    icon={<Target size={48} />}
  />

  <MetricCard
    title="Resume Score"
    value={analysis.resumeScore}
    subtitle="Overall Resume Quality"
    color="text-green-400"
    icon={<FileCheck size={48} />}
  />

  <MetricCard
    title="Interview Readiness"
    value={analysis.interviewReadiness}
    subtitle="Ready for Interview"
    color="text-yellow-400"
    icon={<Brain size={48} />}
  />
</div>



<ExecutiveOverview
  overview={analysis.executiveOverview}
/>
<TopStrengths
  strengths={analysis.topStrengths}
/>
<ATSCoverage
  ats={analysis.atsCoverage}
/>
<TechnicalStack
  stack={analysis.technicalStack}
/>
<InterviewFocus
  topics={analysis.interviewFocus}
/>
<InterviewQuestions
    questions={analysis.interviewQuestions}
/>
<HRQuestions
  questions={analysis.hrQuestions}
/>

<BehavioralQuestions
  questions={analysis.behavioralQuestions}
/>

      {/* Resume Summary */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 mt-8">

        <h2 className="text-2xl font-semibold">
          Resume Summary
        </h2>

        <p className="text-zinc-300 mt-4 leading-8">
          {analysis.resumeSummary}
        </p>

      </div>

      {/* Resume Highlights
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 mt-8">

        <h2 className="text-2xl font-semibold">
          Resume Highlights
        </h2>

        <div className="mt-6 space-y-4">

          {analysis.resumeHighlights.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <div className="w-3 h-3 rounded-full bg-green-500"></div>

              <p>{item}</p>
            </div>
          ))}

        </div>

      </div> */}

    </div>
  </div>
);
};

export default AnalysisResult;