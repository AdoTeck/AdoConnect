import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { registerSchema,sendOTPSchema,verifyOTPSchema ,loginSchema } from "./auth.schema";

const router = Router();

router.post(
  "/signup",
  validationMiddleware(registerSchema),
  AuthController.register,
);
router.get("/signup");
router.post('/send-otp', validationMiddleware(sendOTPSchema), AuthController.sendOTP.bind(AuthController));
router.post('/verify-otp', validationMiddleware(verifyOTPSchema), AuthController.verifyOTP.bind(AuthController));
// router.post('/login', validationMiddleware(loginSchema), AuthController.login);

export const authRoutes = router;
