import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import {
  registerSchema,
  sendOTPSchema,
  verifyOTPSchema,
  loginSchema,
  resendOTPSchema,
} from "./auth.schema";

const router = Router();

router.post(
  "/signup",
  validationMiddleware(registerSchema),
  AuthController.register,
);
router.get("/signup");
router.post(
  "/send-otp",
  validationMiddleware(sendOTPSchema),
  AuthController.sendOTP,
);
router.post(
  "/resend-otp",
  validationMiddleware(resendOTPSchema),
  AuthController.resendOTP,
);
router.post(
  "/verify-otp",
  validationMiddleware(verifyOTPSchema),
  AuthController.verifyOTP,
);
router.post("/login", validationMiddleware(loginSchema), AuthController.login);

export const authRoutes = router;
