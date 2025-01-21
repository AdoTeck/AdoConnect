"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { FormField } from "@/components";
import { useGSAPAnimation } from "@/hooks";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const containerRef = useGSAPAnimation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", {
        email: data.email,
      });
      toast.success("Password reset link sent to your email");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error sending reset link:", error);
      toast.error("Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light to-secondary-light px-4">
      <Toaster position="top-center" />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        ref={containerRef}
      >
        <div className="bg-background-light p-10">
          <h2 className="animate-in mb-8 text-center text-3xl font-extrabold text-primary-dark">
            Forgot Password
          </h2>
          <p className="animate-in mb-6 text-center text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>
          <p className="animate-in mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <a
              href="/auth/login"
              className="font-medium text-[#6D28D9] transition-colors hover:text-primary-dark"
            >
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
