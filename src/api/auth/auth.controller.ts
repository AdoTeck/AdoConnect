import type { Request, Response } from "express"
import { AuthService } from "./auth.service"
import { successResponse } from "../../success-engine/response"

export class AuthController {
  static async register(req: Request, res: Response) {
    const result = await AuthService.register(req.body)
    successResponse(res, result, "OTP sent for registration")
  }

  static async verifyOTP(req: Request, res: Response) {
    const { email, otp } = req.body
    const result = await AuthService.verifyOTP(email, otp)
    successResponse(res, result, "User registered successfully")
  }

  static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body)
    successResponse(res, result, "User logged in successfully")
  }

  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body
    const result = await AuthService.forgotPassword(email)
    successResponse(res, result, "OTP sent for password reset")
  }

  static async resetPassword(req: Request, res: Response) {
    const { email, otp, newPassword } = req.body
    const result = await AuthService.resetPassword(email, otp, newPassword)
    successResponse(res, result, "Password reset successfully")
  }
}

