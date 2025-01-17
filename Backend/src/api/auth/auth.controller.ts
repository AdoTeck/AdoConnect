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
    res.status(200).json({ message: 'OTP sent successfully' });
  }

  static async verifyOTP(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;
    const isValid = await AuthService.verifyOTP(email, otp);
    if (isValid) {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  }


  // static async login(req: Request, res: Response) {
  //   const result = await AuthService.login(req.body);
  //   successResponse(res, result, 'User logged in successfully');
  // }
}
