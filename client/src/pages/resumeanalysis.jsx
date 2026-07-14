import React, { useState } from "react";
import { FileText, Upload, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../config/api";
import LoadingAnalysis from "../component/Analysis/Loadinganalysis";
import { useSelector } from "react-redux";
const ResumeAnalysis = () => {
  const token=useSelector((state)=>state.auth.token);
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [Loading,setLoading]=useState(false);
  console.log("i am in resume anaylysis");
  if (Loading) {
  return <LoadingAnalysis />;
}
 const handleonclick = async () => {
    if (!resume) {
        toast.error("Please upload your resume.");
        return;
    }

    if (!jd.trim()) {
        toast.error("Please enter the job description.");
        return;
    }

    const formdata = new FormData();
    formdata.append("resume", resume);
    formdata.append("jobDescription", jd);

    setLoading(true);

    try {
        const { data } = await api.post("/api/ai/analysis", formdata, {
            headers: {
                Authorization: token,
            },
        });

        navigate("/app/analysis-result", {
            state: {
                analysis: data.analysis,
            },
        });
    } catch (err) {
        console.log(err);
        toast.error("Error analyzing resume.");
        setLoading(false);
    }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-4xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-8">
          <h1 className="text-4xl font-bold text-white">
            Resume Analysis
          </h1>

          <p className="text-indigo-100 mt-2">
            Upload your resume and paste the company's Job Description to
            receive an AI-powered resume analysis.
          </p>
        </div>

        <div className="p-8 space-y-8">

          {/* Resume Upload */}
          <div>
            <label className="block text-white font-semibold mb-3">
              Upload Resume
            </label>

            <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-2xl h-56 hover:border-indigo-500 transition duration-300 bg-zinc-950">

              <Upload className="w-14 h-14 text-indigo-400 mb-4" />

              <p className="text-lg text-zinc-300 font-medium">
                Click to Upload Resume
              </p>

              <p className="text-sm text-zinc-500 mt-2">
                PDF or DOCX (Max 5MB)
              </p>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setResume(e.target.files[0])}
              />
            </label>

            {resume && (
              <div className="mt-4 flex items-center gap-3 bg-zinc-800 rounded-lg p-4">
                <FileText className="text-green-400" />
                <span className="text-white">{resume.name}</span>
              </div>
            )}
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-white font-semibold mb-3">
              Company Job Description
            </label>

            <textarea
              rows={10}
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the Job Description here..."
              className="w-full rounded-2xl bg-zinc-950 border border-zinc-700 text-white p-5 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-500"
            />
          </div>

          {/* Analyze Button */}
          <button
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-indigo-500/30"
          onClick={handleonclick}
          >
            <Sparkles className="w-6 h-6" />
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;