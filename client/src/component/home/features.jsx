import React from "react";
import { Sparkles, Share2 } from "lucide-react";
import Title from "./title";
import {
  Brain,
  Target,
  BadgeCheck,
  FileText,
  MessageSquare,
  Download,
  Zap,
} from "lucide-react";

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

const features = [
  {
    icon: Brain,
    title: "AI Resume Analysis",
    description:
      "Upload your resume and receive AI-powered feedback, ATS score, strengths and improvement suggestions.",
    color: "indigo",
  },
  {
    icon: Target,
    title: "Job Match Analysis",
    description:
      "Compare your resume with any Job Description and identify missing skills instantly.",
    color: "blue",
  },
  {
    icon: BadgeCheck,
    title: "ATS Optimization",
    description:
      "Improve ATS compatibility using AI-generated recommendations.",
    color: "green",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "Create professional resumes using modern templates and real-time preview.",
    color: "violet",
  },
  {
    icon: MessageSquare,
    title: "Interview Preparation",
    description:
      "Practice Technical, HR and Behavioral interview questions tailored to your role.",
    color: "orange",
  },
  {
    icon: Download,
    title: "One Click Export",
    description:
      "Download and share your resume as a professional PDF instantly.",
    color: "pink",
  },
];
  return (
    <>
      <div className="bg-black">
        <div className="flex items-center justify-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-5 py-2 w-fit mx-auto">
          <Zap width={14} className="text-indigo-400" />
          <span className="text-gray-400">Simple Process</span>
        </div>

        <Title
          title="Everything You Need to Get Hired"
          description="Build ATS-friendly resumes, compare them with job descriptions, discover missing skills, improve your resume score and prepare for Technical, HR & Behavioral interviews using AI."
        />

        <div className="flex flex-col md:flex-row items-center justify-center">
          <img
            className="max-w-2xl w-full xl:-ml-32"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
            alt=""
          />

          <div
            className="px-4 md:px-0"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <h2 className="text-3xl font-bold text-white mb-8">
  Features
</h2>
            
<div className="grid md:grid-cols-2 gap-6">

  {features.map((feature, index) => {

    const Icon = feature.icon;

    return (

      <div
        key={index}
        className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1"
      >

        <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">

          <Icon className="text-indigo-400" size={24} />

        </div>

        <h3 className="text-xl font-semibold text-white mt-5">

          {feature.title}

        </h3>

        <p className="text-gray-400 mt-3 leading-7">

          {feature.description}

        </p>

      </div>

    );
  })}

</div>
           
            
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

          * {
            font-family: 'Poppins', sans-serif;
          }
        `}</style>
      </div>
    </>
  );
};

export default Features;