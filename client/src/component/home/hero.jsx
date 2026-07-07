import React, { useState } from "react";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between w-full py-5 px-6 md:px-16 lg:px-24">
        <h1 className="text-3xl font-bold text-indigo-400">
          ResumeForge AI
        </h1>

        {!user ? (
          <button
            onClick={() => navigate("/app?state=login")}
            className="hidden md:block px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-full transition"
          >
            Login
          </button>
        ) : (
          <Link
            to="/app"
            className="hidden md:block px-7 py-2.5 bg-green-500 hover:bg-green-600 rounded-full transition"
          >
            Dashboard
          </Link>
        )}

        <button
          className="md:hidden text-3xl"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8 text-xl">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-3xl"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

        {/* Left */}
        <div className="max-w-xl">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">
              AI Powered Resume Builder
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Build an <span className="text-indigo-500">ATS-Friendly</span>{" "}
            Resume in Minutes
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            ResumeForge AI helps you create professional resumes using
            Google Gemini AI, modern templates, live preview,
            image upload, and one-click PDF download.
          </p>

          {/* Features */}
          <div className="space-y-4 mt-8">

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500 w-5 h-5" />
              <span>AI-powered resume optimization</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500 w-5 h-5" />
              <span>ATS-friendly resume templates</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500 w-5 h-5" />
              <span>Real-time preview & cloud storage</span>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10">

            {!user && (
              <button
                onClick={() => navigate("/app?state=register")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-7 py-3 rounded-lg font-medium transition"
              >
                Get Started
                <ArrowRight size={18} />
              </button>
            )}

        

          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-4.png"
            alt="Resume Builder"
            className="max-w-lg w-full drop-shadow-2xl"
          />
        </div>

      </section>
    </div>
  );
};

export default Hero;