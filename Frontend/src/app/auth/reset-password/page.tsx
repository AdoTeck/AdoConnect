"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormField } from "@/components";
import { useGSAPAnimation } from "@/hooks";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const containerRef = useGSAPAnimation();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    console.log("Reset password attempt with:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light to-secondary-light px-4">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        ref={containerRef}
      >
        <div className="bg-background-light p-10">
          <h2 className="animate-in mb-8 text-center text-3xl font-extrabold text-primary-dark">
            Reset Password
          </h2>
          <p className="animate-in mb-6 text-center text-gray-600">
            Enter your new password below.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="animate-in">
              <FormField
                label="New Password"
                type="password"
                name="password"
                placeholder="Enter your new password"
                errorMessage={errors.password?.message}
                register={register("password")}
              />
            </div>
            <div className="animate-in">
              <FormField
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                errorMessage={errors.confirmPassword?.message}
                register={register("confirmPassword")}
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
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
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
