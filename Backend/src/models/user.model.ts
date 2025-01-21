import mongoose, { type Document, Schema } from "mongoose"

export interface IUser extends Document {
  userName: string
  fullName: string
  email: string
  otp?: string
  phoneNumber: string
  password: string
  agreeToTerms: boolean
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    otp: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },
    agreeToTerms: {
      type: Boolean,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.model<IUser>("User", userSchema)

