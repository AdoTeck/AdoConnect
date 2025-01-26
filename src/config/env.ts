import dotenv from "dotenv"

dotenv.config()

export const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  SMTP_HOST: process.env.SMTP_HOST || "smtp.example.com",
  SMTP_PORT: Number.parseInt(process.env.SMTP_PORT || "587", 10),
  SMTP_USER: process.env.SMTP_USER || "your-smtp-username",
  SMTP_PASS: process.env.SMTP_PASS || "your-smtp-password",
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@yourdomain.com",
}

