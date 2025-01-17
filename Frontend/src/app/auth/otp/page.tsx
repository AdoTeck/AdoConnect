"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FaFingerprint,
  FaKey,
  FaLock,
  FaMobileAlt,
  FaShieldAlt,
  FaUserShield,
} from "react-icons/fa";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { OTPInput } from "@/components";
import { useGSAPAnimation } from "@/hooks";

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

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

type OTPFormData = z.infer<typeof otpSchema>;

export default function OTPPage() {
  const containerRef = useGSAPAnimation();
  const [isLoading, setIsLoading] = useState(false);
  const [resenadDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();

  const onSubmit = async (data: OTPFormData) => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        { otp: data.otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("OTP verified successfully!");
      // Redirect to dashboard or home page
      router.push("/dashboard");
    } catch (error) {
      console.error("OTP verification error:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "OTP verification failed";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resenadDisabled && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
      setResendTimer(30);
    }
    return () => clearInterval(interval);
  }, [resenadDisabled, resendTimer]);

  const handleResendOTP = async () => {
    setResendDisabled(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        "http://localhost:8080/api/auth/resend-otp",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("OTP resent successfully!");
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light to-secondary-light px-4">
      <div
        className="relative flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        ref={containerRef}
      >
        {/* Left Section */}
        <div className="left-section hidden items-center justify-center bg-gradient-to-br from-primary-dark to-secondary-dark p-10 md:flex md:w-1/2">
          <div className="space-y-6 text-center">
            <h2 className="animate-in text-4xl font-extrabold leading-snug text-white">
              Secure <br /> Verification
            </h2>
            <FeatureItem icon={FaShieldAlt} text="Enhanced Security" />
            <FeatureItem icon={FaMobileAlt} text="Mobile Verification" />
            <FeatureItem icon={FaKey} text="One-Time Password" />
            <FeatureItem icon={FaLock} text="Encrypted Communication" />
            <FeatureItem icon={FaUserShield} text="User Protection" />
            <FeatureItem icon={FaFingerprint} text="Identity Confirmation" />
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section w-full bg-background-light p-10 md:w-1/2">
          <h2 className="animate-in mb-8 text-center text-3xl font-extrabold text-primary-dark">
            Enter OTP
          </h2>
          <p className="animate-in mb-6 text-center text-gray-600">
            We've sent a 6-digit code to your registered email or phone number.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="animate-in">
                <Controller
                  name="otp"
                  control={control}
                  render={({ field }) => (
                    <OTPInput
                      length={6}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.otp.message}
                  </p>
                )}
              </div>
            </div>

            <div className="animate-in">
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button w-full rounded-lg bg-[#6D28D9] px-4 py-3 text-lg font-semibold text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
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
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </form>
          <div className="animate-in mt-6 text-center">
            <button
              onClick={handleResendOTP}
              disabled={resenadDisabled}
              className={`text-sm font-medium ${
                resenadDisabled
                  ? "cursor-not-allowed text-gray-400"
                  : "text-[#6D28D9] transition-colors hover:text-primary-dark"
              }`}
            >
              {resenadDisabled
                ? `Resend OTP in ${resendTimer}s`
                : "Didn't receive the OTP? Resend"}
            </button>
          </div>
          <p className="animate-in mt-6 text-center text-sm text-gray-600">
            Back to{" "}
            <a
              href="/auth/login"
              className="font-medium text-[#6D28D9] transition-colors hover:text-primary-dark"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

