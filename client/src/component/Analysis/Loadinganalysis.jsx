import React, { useEffect, useState } from "react";
import { Brain, CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  "Resume Uploaded",
  "Resume Content Extracted",
  "Understanding Job Description",
  "Matching Resume with Company",
  "Generating Resume Insights",
  "Creating Interview Questions",
  "Building Career Recommendations",
  "Finalizing Report"
];

const LoadingAnalysis = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) return prev + 1;
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const progress = Math.min(
    (currentStep / steps.length) * 95,
    100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center px-6">

      <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl p-10">

        <div className="flex justify-center">
          <Brain className="w-16 h-16 text-indigo-500 animate-pulse" />
        </div>

        <h1 className="text-center text-3xl font-bold text-white mt-5">
          AI Resume Intelligence
        </h1>

        <p className="text-center text-zinc-400 mt-2">
          Please wait while AI prepares your personalized report.
        </p>

        <div className="mt-10 space-y-5">

          {steps.map((step, index) => (

            <div
              key={index}
              className="flex items-center gap-4"
            >

              {index < currentStep ? (

                <CheckCircle2 className="text-green-500 w-6 h-6" />

              ) : index === currentStep ? (

                <Loader2 className="text-indigo-500 animate-spin w-6 h-6" />

              ) : (

                <div className="w-6 h-6 rounded-full border border-zinc-600" />

              )}

              <span
                className={`text-lg ${
                  index <= currentStep
                    ? "text-white"
                    : "text-zinc-500"
                }`}
              >
                {step}
              </span>

            </div>

          ))}

        </div>

        <div className="mt-10">

          <div className="w-full h-3 rounded-full bg-zinc-800">

            <div
              className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />

          </div>

          <p className="text-center text-zinc-400 mt-3">
            {Math.floor(progress)}%
          </p>

        </div>

      </div>

    </div>
  );
};

export default LoadingAnalysis;