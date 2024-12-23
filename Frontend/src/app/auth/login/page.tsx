"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  FaVideo,
  FaProjectDiagram,
  FaCode,
  FaBookReader,
  FaLaptopCode,
  FaPuzzlePiece,
} from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { FormField } from "@/components";
import { loginSchema } from "@/utils";
import { useGSAPAnimation } from "@/hooks";

const FeatureItem = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="flex items-center space-x-3 text-white animate-in">
    <Icon className="w-6 h-6" />
    <span>{text}</span>
  </div>
);

export default function LoginPage() {
  const containerRef = useGSAPAnimation();
  const [isLoading, setIsLoading] = useState(false);
  type LoginFormData = z.infer<typeof loginSchema>;

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log("Login attempt with:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    const button = document.querySelector(".submit-button");
    if (button) {
      gsap.to(button, {
        scale: isLoading ? 0.95 : 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-primary-light to-secondary-light flex items-center justify-center px-4 overflow-hidden">
      <div
        className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex relative"
        ref={containerRef}
      >
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-dark to-secondary-dark p-10 items-center justify-center left-section">
          <div className="space-y-6 text-center">
            <h2 className="text-4xl font-extrabold text-white leading-snug animate-in">
              ADO Connect <br /> Hub
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
        <div className="w-full md:w-1/2 p-10 bg-background-light right-section">
          <h2 className="text-3xl font-extrabold text-primary-dark text-center mb-8 animate-in">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              {/* Google Login Button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-gray-700 font-medium transition duration-200 ease-in-out"
              >
                <svg
                  className="w-5 h-5 mr-3 min-w-[20px] min-h-[20px]"
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
                <span className="text-gray-700 font-medium">
                  Sign in with Google
                </span>
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background-light text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Email and Password Fields */}
              <div className="animate-in">
                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  errorMessage={errors.email?.message}
                  register={register("email")}
                />
              </div>
              <div className="animate-in">
                <FormField
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  showPasswordToggle={true}
                  errorMessage={errors.password?.message}
                  register={register("password")}
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between animate-in">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-DEFAULT focus:ring-primary-light border-gray-300 rounded"
                    {...register("rememberMe")}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="/auth/forgot-password"
                    className="font-medium text-primary-DEFAULT hover:text-primary-dark"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            <div className="animate-in">
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button w-full py-3 px-4 text-white bg-[#6D28D9] rounded-lg font-semibold text-lg shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors duration-300 ease-in-out"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 animate-in">
            Don't have an account?{" "}
            <a
              href="/auth/signup"
              className="font-medium text-[#6D28D9] hover:text-primary-dark transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
