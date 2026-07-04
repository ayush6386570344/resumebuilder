

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();
  const {user}=useSelector(state=>state.auth)

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <nav className="flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-2xl font-bold">Resume builder</h1>

        <div className="hidden md:flex items-center gap-8">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/stories">Stories</a>
          <a href="/pricing">Pricing</a>
        </div>

        <button hidden={user} onClick={()=>navigate('/app?state=login')}  className="hidden md:block px-6 py-2.5 bg-indigo-600 rounded-full">
          Login
        </button>
        <Link to='/app' className='hidden md:block px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white' hidden={!user} > Dashboard</Link>
  
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/stories">Stories</a>
          <a href="/pricing">Pricing</a>

          <button onClick={() => setIsMenuOpen(false)}>
            ✕
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-20">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold">
            Intelligent AI tools built to help.
          </h1>

          <p className="mt-4 text-gray-300 max-w-lg">
            Create,edit and download professional resumes with AI-powered assistance.
          </p>

          <div className="flex gap-4 mt-8">
            <button onClick={()=>navigate('/app?state=register')} className="bg-indigo-600 px-7 py-3 rounded-md hidden={user}">
              Get Started
            </button>

            <button className="border border-gray-500 px-6 py-3 rounded-md">
              Watch Demo
            </button>
          </div>
        </div>

        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-4.png"
          alt="hero"
          className="max-w-md mt-10 md:mt-0"
        />
      </section>
    </div>
  );
};

export default Hero;