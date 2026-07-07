import React from "react";
import { Zap, Sparkles, FileText, Share2 } from "lucide-react";
import Title from "./title";

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <>
      <div className="bg-black">
        <div className="flex items-center justify-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-5 py-2 w-fit mx-auto">
          <Zap width={14} className="text-indigo-400" />
          <span className="text-gray-400">Simple Process</span>
        </div>

        <Title
          title="Build your resume"
          description="Create a professional ATS-friendly resume in minutes using AI-powered tools, modern templates, and seamless customization."
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
            {/* Feature 1 */}
            <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
              <div
                className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors ${
                  !isHover ? "border-violet-300 bg-violet-100" : ""
                }`}
              >
                <Sparkles className="size-6 text-violet-600" />

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-700">
                    AI Resume Optimization
                  </h3>

                  <p className="text-sm text-slate-600 max-w-xs">
                    Improve your resume with Google Gemini AI by generating
                    professional, ATS-friendly content and enhancing resume
                    quality instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
              <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
                <FileText className="size-6 text-green-600" />

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-700">
                    Multiple Resume Templates
                  </h3>

                  <p className="text-sm text-slate-600 max-w-xs">
                    Select from professionally designed resume templates with
                    real-time preview, customization, and instant PDF download.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
              <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
                <Share2 className="size-6 text-orange-600" />

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-700">
                    Cloud Storage & Sharing
                  </h3>

                  <p className="text-sm text-slate-600 max-w-xs">
                    Save resumes securely, upload profile images, and share your
                    resume instantly using a unique public link from anywhere.
                  </p>
                </div>
              </div>
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