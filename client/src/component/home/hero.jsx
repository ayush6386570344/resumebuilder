import React, { useState } from "react";
import { Sparkles, CheckCircle, ArrowRight, Brain, Target, FileCheck } from "lucide-react";
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
          HireSense AI
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



      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">


        {/* Left Content */}

        <div className="max-w-xl">


          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 mb-6">

            <Sparkles className="w-4 h-4 text-indigo-400"/>

            <span className="text-sm text-gray-300">
              AI Resume Intelligence Platform
            </span>

          </div>



          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">

            Build{" "}
            <span className="text-indigo-500">
              ATS-Optimized
            </span>{" "}
            Resumes With AI

          </h1>



          <p className="text-gray-400 mt-6 text-lg leading-8">

            HireSense AI helps you create professional resumes,
            analyze job descriptions, improve ATS compatibility,
            and prepare for interviews using advanced AI.

          </p>



          {/* Features */}

          <div className="space-y-5 mt-8">


            <div className="flex items-center gap-3">

              <Brain className="text-indigo-400 w-5 h-5"/>

              <span>
                AI-powered resume improvement & professional summary generation
              </span>

            </div>



            <div className="flex items-center gap-3">

              <Target className="text-green-400 w-5 h-5"/>

              <span>
                Job description matching with ATS compatibility score
              </span>

            </div>



            <div className="flex items-center gap-3">

              <FileCheck className="text-yellow-400 w-5 h-5"/>

              <span>
                Resume analysis, skill recommendations & interview preparation
              </span>

            </div>


          </div>




          {/* Buttons */}

          <div className="flex gap-4 mt-10">


            {!user && (

              <button
                onClick={() => navigate("/app?state=register")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-7 py-3 rounded-lg font-medium transition"
              >

                Create Resume

                <ArrowRight size={18}/>

              </button>

            )}



            {user && (

              <Link
                to="/app/resume-analysis"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-7 py-3 rounded-lg font-medium transition"
              >

                Analyze Resume

                <ArrowRight size={18}/>

              </Link>

            )}


          </div>


        </div>




        {/* Right Side */}

        <div className="relative flex justify-center">


          <div className="absolute w-72 h-72 bg-indigo-600/30 blur-3xl rounded-full">
          </div>


          <img

           src="/image.png"
            alt="AI Resume Builder"

            className="relative max-w-lg w-full drop-shadow-2xl"

          />


        </div>


      </section>


    </div>
  );
};


export default Hero;