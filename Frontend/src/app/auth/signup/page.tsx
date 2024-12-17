"use client";

import { useState } from "react";
import { useGSAPAnimation } from "../../hooks/useGSAPAnimation.ts";
import { FaVideo, FaProjectDiagram, FaCode } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const containerRef = useGSAPAnimation();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign-up attempt with:", {
      userName,
      email,
      password,
      confirmPassword,
      fullName,
      phoneNumber,
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-100 to-teal-100 flex items-center justify-center px-4 overflow-hidden">
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
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="User Name"
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
              />
              <FormField
                label="Full Name"
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
              <FormField
                label="Email Address"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <FormField
                label="Phone Number"
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
              <PasswordField
                label="Password"
                id="password"
                value={password}
                showPassword={showPassword}
                onChange={(e) => setPassword(e.target.value)}
                toggleVisibility={togglePasswordVisibility}
              />
              <PasswordField
                label="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                showPassword={showConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                toggleVisibility={toggleConfirmPasswordVisibility}
              />
            </div>

            <div className="animate-in">
              <button
                type="submit"
                className="w-full py-3 px-4 text-white bg-[#229ABD] rounded-lg font-semibold text-lg shadow-lg hover:bg-[#126D8F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#229ABD] transition-transform duration-200 hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 animate-in">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-medium text-[#229ABD] hover:text-[#126D8F] transition-colors"
            >
              Log in
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

function FormField({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2 animate-in">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#229ABD] focus:border-[#229ABD] transition"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

function PasswordField({
  label,
  id,
  value,
  showPassword,
  onChange,
  toggleVisibility,
}: {
  label: string;
  id: string;
  value: string;
  showPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleVisibility: () => void;
}) {
  return (
    <div className="space-y-2 relative animate-in">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#229ABD] focus:border-[#229ABD] transition"
          placeholder={`Enter your ${label.toLowerCase()}`}
          required
        />
        <div
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
          onClick={toggleVisibility}
        >
          {showPassword ? (
            <IoEyeOff className="w-6 h-6 text-gray-500" />
          ) : (
            <IoEye className="w-6 h-6 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
}
