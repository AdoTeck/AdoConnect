"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import {
  FaShieldAlt,
  FaMobileAlt,
  FaKey,
  FaLock,
  FaUserShield,
  FaFingerprint,
} from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { OTPInput } from "@/components";
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
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const onSubmit = async (data: OTPFormData) => {
    setIsLoading(true);
    console.log("OTP verification attempt with:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
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
    if (resendDisabled && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
      setResendTimer(30);
    }
    return () => clearInterval(interval);
  }, [resendDisabled, resendTimer]);

  const handleResendOTP = () => {
    setResendDisabled(true);
    // Add logic to resend OTP here
    console.log("Resending OTP...");
  };

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
        <div className="w-full md:w-1/2 p-10 bg-background-light right-section">
          <h2 className="text-3xl font-extrabold text-primary-dark text-center mb-8 animate-in">
            Enter OTP
          </h2>
          <p className="text-center text-gray-600 mb-6 animate-in">
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
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center animate-in">
            <button
              onClick={handleResendOTP}
              disabled={resendDisabled}
              className={`text-sm font-medium ${
                resendDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#6D28D9] hover:text-primary-dark transition-colors"
              }`}
            >
              {resendDisabled
                ? `Resend OTP in ${resendTimer}s`
                : "Didn't receive the OTP? Resend"}
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600 animate-in">
            Back to{" "}
            <a
              href="/auth/login"
              className="font-medium text-[#6D28D9] hover:text-primary-dark transition-colors"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
