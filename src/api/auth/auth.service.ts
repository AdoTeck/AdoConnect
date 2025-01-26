import bcrypt from "bcrypt";
import { User, IUser } from "../../models/user.model";
import { OTP } from "../../models/otp.model";
import type { RegisterInput, LoginInput } from "./auth.interface";
import { BadRequestError, UnauthorizedError, InternalServerError } from "../../success-engine/error";
import { emailService } from "../../services/email.service";
import { generateToken } from '../../shared/jwt';

export class AuthService {
  static async register(input: RegisterInput) {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email: input.email, otp });

    try {
      await emailService.sendOTP(input.email, otp);
      return { message: "OTP sent to email for verification" };
    } catch (error) {
      throw new InternalServerError("Failed to send OTP");
    }
  }

  static async verifyOTP(email: string, otp: string) {
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      throw new BadRequestError("Invalid OTP");
    }

    // Delete the OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    // Generate a random password
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email: email,
      password: hashedPassword,
      name: email.split("@")[0], // Temporary name, can be updated later
    });

    await user.save();

    // Send credentials to user's email
    try {
      await emailService.sendCredentials(email, email, password);
    } catch (error) {
      throw new InternalServerError("Failed to send credentials");
    }

    const userId = user._id as unknown as string;
    const token = generateToken(userId);

    return { user: { id: userId, email: user.email, name: user.name }, token };
  }

  static async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email });
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const userId = user._id as unknown as string;
    const token = generateToken(userId);
    return { user: { id: userId, email: user.email, name: user.name }, token };
  }

  static async forgotPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email, otp });

    try {
      await emailService.sendOTP(email, otp);
      return { message: "OTP sent to email for password reset" };
    } catch (error) {
      throw new InternalServerError("Failed to send OTP");
    }
  }

  static async resetPassword(email: string, otp: string, newPassword: string) {
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      throw new BadRequestError("Invalid OTP");
    }

    // Delete the OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: "Password reset successfully" };
  }
}

