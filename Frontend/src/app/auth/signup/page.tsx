"use client";

import { useState } from "react";
import { useGSAPAnimation } from "../../hooks/useGSAPAnimation";
import { FaVideo, FaProjectDiagram, FaCode } from "react-icons/fa";
import { FormField, PasswordField } from "../../components/Form/FormFields";
import { FeatureItem } from "../../components/Icons/FeatureItem";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const containerRef = useGSAPAnimation();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Sign-up attempt with:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
              <FormField
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
              <FormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
              <FormField
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
              <PasswordField
                label="Password"
                name="password"
                value={formData.password}
                showPassword={showPassword}
                onChange={handleInputChange}
                toggleVisibility={togglePasswordVisibility}
              />
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                showPassword={showConfirmPassword}
                onChange={handleInputChange}
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
