import React from "react";
import { Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-16 px-6 md:px-16 lg:px-24 border-t border-zinc-800">

      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12">


        {/* Brand */}
        <div className="max-w-sm">

          <h1 className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
            <Sparkles size={28}/>
    HireSense AI
          </h1>


          <p className="mt-5 text-sm leading-7">
            AI-powered resume builder that helps you create ATS-friendly
            resumes, analyze job compatibility, improve skills, and prepare
            for interviews.
          </p>


          <div className="flex gap-4 mt-6">

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-500 transition"
            >
              <FaGithub size={22}/>
            </a>


            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-500 transition"
            >
             <FaLinkedin size={22}/>
            </a>


            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-500 transition"
            ><FaLinkedin size={22}/>
            </a>


          </div>

        </div>




        {/* Product */}

        <div>

          <h3 className="text-white font-semibold">
            Product
          </h3>

          <ul className="mt-4 space-y-3 text-sm">

            <li>
              <a href="/" className="hover:text-indigo-500">
                Resume Builder
              </a>
            </li>


            <li>
              <a href="/" className="hover:text-indigo-500">
                AI Resume Analysis
              </a>
            </li>


            <li>
              <a href="/" className="hover:text-indigo-500">
                ATS Score Checker
              </a>
            </li>


            <li>
              <a href="/" className="hover:text-indigo-500">
                Interview Preparation
              </a>
            </li>

          </ul>

        </div>




        {/* Features */}

        <div>

          <h3 className="text-white font-semibold">
            AI Features
          </h3>


          <ul className="mt-4 space-y-3 text-sm">

            <li>
              Gemini AI Resume Enhancement
            </li>

            <li>
              Job Description Matching
            </li>

            <li>
              Skill Recommendations
            </li>

            <li>
              Professional Summary Generator
            </li>

          </ul>


        </div>





        {/* Legal */}

        <div>

          <h3 className="text-white font-semibold">
            Company
          </h3>


          <ul className="mt-4 space-y-3 text-sm">

            <li>
              <a href="/" className="hover:text-indigo-500">
                About
              </a>
            </li>


            <li>
              <a href="/" className="hover:text-indigo-500">
                Contact
              </a>
            </li>


            <li>
              <a href="/" className="hover:text-indigo-500">
                Privacy Policy
              </a>
            </li>


            <li>
              <a href="/" className="hover:text-indigo-500">
                Terms & Conditions
              </a>
            </li>

          </ul>

        </div>



      </div>




      {/* Bottom */}

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-800 text-sm text-center">

        © 2026 HireSense AI. All rights reserved.

      </div>


    </footer>
  );
};


export default Footer;