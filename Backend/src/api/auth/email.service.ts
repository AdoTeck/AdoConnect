import nodemailer from "nodemailer"

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  })

  static async sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to,
      subject,
      text,
      html,
    })
  }

  static async sendOTPEmail(email: string, otp: string): Promise<void> {
    await this.sendEmail(email, "Your OTP for verification", `Your OTP is: ${otp}`, `<b>Your OTP is: ${otp}</b>`)
  }

  static async sendPasswordResetLink(email: string, resetToken: string): Promise<void> {
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`
    await this.sendEmail(
      email,
      "Password Reset Link",
      `Click this link to reset your password: ${resetLink}`,
      `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    )
  }
}

