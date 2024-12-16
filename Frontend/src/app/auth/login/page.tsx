"use client";

import { useState } from "react";
import { useGSAPAnimation } from "../../hooks/useGSAPAnimation.ts";
import { FaVideo, FaProjectDiagram, FaCode } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const containerRef = useGSAPAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", email, password);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center px-4 overflow-hidden">
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="grid-pattern"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="10"
                height="10"
                fill="none"
                stroke="#229ABD"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Floating SVG Shape */}
        <svg
          className="absolute bottom-0 right-0 opacity-20 w-64 h-64 animate-floating"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <path
            fill="#229ABD"
            d="M38.7,-49.2C51.4,-40.9,64.1,-28.4,67.1,-14.7C70,0.9,63.2,15.6,56.2,29.5C49.1,43.5,41.7,56.8,30.4,63.8C19.1,70.8,4,71.4,-11.3,67.8C-26.6,64.2,-42.1,56.5,-50.2,44.8C-58.2,33.1,-58.8,17.5,-60.5,1.5C-62.3,-14.5,-65.3,-29,-59.4,-40.5C-53.5,-52,-38.8,-60.6,-24.7,-66.8C-10.6,-73,3,-76.8,13.4,-71.3C23.8,-65.9,31.1,-51.5,38.7,-49.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div
        className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex relative"
        ref={containerRef}
      >
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#229ABD] to-[#126D8F] p-10 items-center justify-center">
          <div className="space-y-6 text-center animate-in">
            <h2 className="text-4xl font-extrabold text-white leading-snug">
              Student <br /> Solutions Hub
            </h2>
            <FeatureItem icon={FaVideo} text="Video Tutorials & Reels" />
            <FeatureItem icon={FaProjectDiagram} text="Project Assistance" />
            <FeatureItem icon={FaCode} text="Developer Guidance" />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-10 bg-gray-50">
          <h2 className="text-3xl font-extrabold text-[#020344] text-center mb-8 animate-in">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="animate-in">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#229ABD] focus:border-[#229ABD] transition"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="animate-in">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#229ABD] focus:border-[#229ABD] transition"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="animate-in">
              <button
                type="submit"
                className="w-full py-3 px-4 text-white bg-[#229ABD] rounded-lg font-semibold text-lg shadow-lg hover:bg-[#126D8F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#229ABD] transition-transform duration-200 hover:scale-105"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 animate-in">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-[#229ABD] hover:text-[#126D8F] transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center justify-center space-x-3 text-white animate-in">
      <Icon className="w-8 h-8" />
      <span className="text-lg font-medium">{text}</span>
    </div>
  );
}
