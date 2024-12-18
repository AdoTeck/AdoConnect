import { z } from "zod";

export const signUpSchema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters long"),
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });