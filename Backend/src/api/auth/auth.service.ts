import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/env";
import { User } from "../../models/user.model";
import { OtpService } from './otp.service';
import { RegisterInput, LoginInput } from "./auth.interface";
import {
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
} from "../../success-engine/error";

export class AuthService {
  static async sendOTP(email: string): Promise<void> {
    const otp = await OtpService.generateOTP(email);
    await OtpService.sendOTPEmail(email, otp);
  }

  static async verifyOTP(email: string, otp: string): Promise<boolean> {
    return OtpService.verifyOTP(email, otp);
  }
  
  static async register(input: RegisterInput) {
    try {
      const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = new User({
        userName: input.userName,
        fullName: input.fullName,
        email: input.email,
        phoneNumber: input.phoneNumber,
        password: hashedPassword,
        agreeToTerms: input.agreeToTerms,
      });

      await user.save();

      const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
        expiresIn: "1d",
      });

      return {
        user: { id: user._id, email: user.email, name: user.userName },
        token,
      };
    } catch (error) {
      console.error("Error while creating user:", error);
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError("Failed to create user");
    }
  }

  // static async login(input: LoginInput) {
  //   const user = await User.findOne({ email: input.email });
  //   if (!user) {
  //     throw new UnauthorizedError('Invalid email or password');
  //   }

  //   const isPasswordValid = await bcrypt.compare(input.password, user.password);
  //   if (!isPasswordValid) {
  //     throw new UnauthorizedError('Invalid email or password');
  //   }

  //   try {
  //     const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1d' });
  //     return { user: { id: user._id, email: user.email, name: user.name }, token };
  //   } catch (error) {
  //     throw new InternalServerError('Failed to generate token');
  //   }
  // }
}
