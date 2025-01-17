import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import { UserRepository } from '../../repositories/user.repository';

export class OtpService {
  
    static async generateOTP(email: string): Promise<string> {
    const otp = otpGenerator.generate(6, { 
  digits: true, 
  upperCaseAlphabets: false, 
  lowerCaseAlphabets: false, 
  specialChars: false 
});
    await UserRepository.updateOTP(email, otp);
    return otp;
  }

  static async verifyOTP(email: string, otp: string): Promise<boolean> {
    const user = await UserRepository.findByEmail(email);
    if (user && user.otp === otp) {
      await UserRepository.updateOTP(email, null); // Clear OTP after successful verification
      return true;
    }
    return false;
  }

  static async sendOTPEmail(email: string, otp: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Your OTP for verification',
      text: `Your OTP is: ${otp}`,
      html: `<b>Your OTP is: ${otp}</b>`,
    });
  }
}