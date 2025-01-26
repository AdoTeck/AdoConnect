import mongoose, { type Document, Schema } from "mongoose"

export interface IOTP extends Document {
  email: string
  otp: string
  createdAt: Date
}

const otpSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "10m" },
})

export const OTP = mongoose.model<IOTP>("OTP", otpSchema)

