"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBookReader,
  FaCode,
  FaLaptopCode,
  FaProjectDiagram,
  FaPuzzlePiece,
  FaVideo,
} from "react-icons/fa";
import { z } from "zod";

import { FormField } from "@/components";
import { useGSAPAnimation } from "@/hooks";
import { signUpSchema } from "@/utils";
import { redirect } from "next/navigation";

const FeatureItem = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="animate-in flex items-center space-x-3 text-white">
    <Icon className="size-6" />
    <span>{text}</span>
  </div>
);

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const containerRef = useGSAPAnimation();
  const [isLoading, setIsLoading] = useState(false);

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
      agreeToTerms: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        data,
      );
      const {
        data: { token, user },
      } = response.data;

      // Store token securely
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", user.email);

      await axios.post(
        "http://localhost:8080/api/auth/send-otp",
        { email: user.email },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Sign up successful! Please check your email for OTP.");
      setTimeout(() => {
        redirect("/auth/otp");
      }, 1000);
    } catch (error) {
      console.error("Sign up error:", error);
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        console.log("Error response:", errorResponse);
        if (errorResponse) {
          // Display detailed error messages from backend
          if (Array.isArray(errorResponse.errors)) {
            errorResponse.errors.forEach((err: string) => {
              toast.error(err);
            });
          } else {
            toast.error(errorResponse.message || "An error occurred.");
          }
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light to-secondary-light px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="relative flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        ref={containerRef}
      >
        {/* Left Section */}
        <div className="left-section hidden items-center justify-center bg-gradient-to-br from-primary-dark to-secondary-dark p-10 md:flex md:w-1/2">
          <div className="space-y-6 text-center">
            <h2 className="animate-in text-4xl font-extrabold leading-snug text-white">
              EduTainment <br /> Hub
            </h2>
            <FeatureItem icon={FaBookReader} text="Interactive Learning" />
            <FeatureItem icon={FaLaptopCode} text="Coding Challenges" />
            <FeatureItem icon={FaPuzzlePiece} text="Brain Teasers" />
            <FeatureItem icon={FaVideo} text="Educational Videos" />
            <FeatureItem icon={FaProjectDiagram} text="Project Collaboration" />
            <FeatureItem icon={FaCode} text="Coding Tutorials" />
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section w-full bg-background-light p-10 md:w-1/2">
          <h2 className="animate-in mb-8 text-center text-3xl font-extrabold text-primary-dark">
            Sign Up
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit, () => {
              toast.error("Please correct the form errors before submitting.");
            })}
            className="space-y-6"
          >
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-md transition duration-200 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() =>
                toast.error("Google sign-up is not implemented yet.")
              }
            >
              <svg
                className="mr-3 size-5 min-h-[20px] min-w-[20px]"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              <span className="font-medium text-gray-700">
                Sign up with Google
              </span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background-light px-2 text-gray-500">
                  Or sign up with email
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                type="tel"
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
                placeholder="Confirm your password"
                showPasswordToggle={true}
                errorMessage={errors.confirmPassword?.message}
                register={register("confirmPassword")}
              />
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                type="checkbox"
                className="text-primary-DEFAULT size-4 rounded border-gray-300 focus:ring-primary-light"
                {...register("agreeToTerms")}
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-primary-DEFAULT hover:text-primary-dark"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-500">
                {errors.agreeToTerms.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#6D28D9] px-4 py-3 text-lg font-semibold text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="-ml-1 mr-3 size-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <p className="animate-in mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-medium text-[#6D28D9] transition-colors hover:text-primary-dark"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
