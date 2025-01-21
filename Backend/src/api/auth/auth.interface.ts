export interface RegisterInput {
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  agreeToTerms: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgetPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  otp: string
  newPassword: string
}

