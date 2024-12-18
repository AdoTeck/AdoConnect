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
