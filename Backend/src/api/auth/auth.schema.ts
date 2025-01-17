import { z } from "zod";

const emailSchema = z
  .string()
  .email()
  .refine(
    (email) => {
      const parts = email.split("@");
      return parts.length === 2 && parts[1].includes(".");
    },
    {
      message:
        "Invalid email format. Must contain '@' and '.' in the domain part.",
    },
  );

export const registerSchema = z.object({
  userName: z.string().min(1, "Username is required"), // Username must not be empty
  fullName: z.string().min(1, "Full name is required"), // Full name must not be empty
  email: emailSchema, // Reuse the refined email schema
  phoneNumber: z.string().refine((number) => /^\d{10,15}$/.test(number), {
    message:
      "Phone number must contain only digits and be 10-15 characters long",
  }), // Validate phonenumber
  password: z.string().min(6, "Password must be at least 6 characters long"), // Password validation
  agreeToTerms: z.boolean(), // Terms agreement
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const sendOTPSchema = z.object({
  email: emailSchema,
});
export const verifyOTPSchema = z.object({
  email: emailSchema,
  otp : z.string().min(6),
});
