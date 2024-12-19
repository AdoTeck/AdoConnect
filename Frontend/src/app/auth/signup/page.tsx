"use client";

import { useForm } from "react-hook-form";
import { useGSAPAnimation } from "../../hooks/useGSAPAnimation";
import { FaVideo, FaProjectDiagram, FaCode } from "react-icons/fa";
import { FormField } from "../../components/Form/FormFields";
import { FeatureItem } from "../../components/Icons/FeatureItem";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../libs/utils/validationSchemas.ts";

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const containerRef = useGSAPAnimation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumber: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const result = await response.json();
      console.log("Sign up success:", result);
      alert("Sign up successful!");
    } catch (error) {
      console.error("Sign up error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-100 to-teal-100 flex items-center justify-center px-4 overflow-hidden">
      <div
        className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex relative"
        ref={containerRef}
      >
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#229ABD] to-[#126D8F] p-10 items-center justify-center">
          <div className="space-y-6 text-center">
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
          <h2 className="text-3xl font-extrabold text-[#020344] text-center mb-8">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <button
              type="button"
              className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            >
              <svg
                className="w-5 h-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                  fill="#fbbb00"
                />
                <path
                  d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                  fill="#518ef8"
                />
                <path
                  d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                  fill="#28b446"
                />
                <path
                  d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                  fill="#f14336"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                Sign in with Google
              </span>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="User Name"
                name="userName"
                placeholder="Enter your username"
                errorMessage={errors.userName?.message}
                register={register("userName")}
              />

              <FormField
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                errorMessage={errors.fullName?.message}
                register={register("fullName")}
              />

              <FormField
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                errorMessage={errors.email?.message}
                register={register("email")}
              />
              <FormField
                label="Phone Number"
                type="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                errorMessage={errors.phoneNumber?.message}
                register={register("phoneNumber")}
              />

              <FormField
                label="Password"
                name="password"
                placeholder="Enter your password"
                showPasswordToggle={true}
                errorMessage={errors.password?.message}
                register={register("password")}
              />

              <FormField
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Enter your confirm password"
                showPasswordToggle={true}
                errorMessage={errors.confirmPassword?.message}
                register={register("confirmPassword")}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-white bg-[#229ABD] rounded-lg font-semibold text-lg shadow-lg hover:bg-[#126D8F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#229ABD] transition-transform duration-200 hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
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
