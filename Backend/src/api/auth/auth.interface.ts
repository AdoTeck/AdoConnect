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
