import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { successResponse } from "../../success-engine/response";

export class AuthController {
  static async register(req: Request, res: Response) {
    const result = await AuthService.register(req.body);
    successResponse(res, result, "User registered successfully");
  }
  static async sendOTP(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    await AuthService.sendOTP(email);
    res.status(200).json({ message: "OTP sent successfully" });
  }

  static async resendOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await AuthService.resendOTP(email);
      res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
      console.error("Error in resendOTP controller:", error);
      res.status(500).json({ message: "Failed to resend OTP" });
    }
  }

  static async verifyOTP(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;
    const isValid = await AuthService.verifyOTP(email, otp);
    if (isValid) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  }

  static async forgetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body
      await AuthService.forgetPassword(email)
      res.status(200).json({ message: "Password reset link sent to your email" })
    } catch (error) {
      console.error("Forgot password error:", error)
      res.status(500).json({message : "An error occurred" })
    }
  }
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body
      await AuthService.resetPassword(token, newPassword)
      res.status(200).json({ message: "Password reset successful" })
    } catch (error) {
      console.error("Reset password error:", error)
      res.status(500).json({ message:"An error occurred" })
    }
  }

  static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);
    successResponse(res, result, "User logged in successfully");
  }
}
