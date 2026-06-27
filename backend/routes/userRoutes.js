import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getUserProfile,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/profile",
  protect,
  getUserProfile
);

router.post(
    "/verify-otp",
    verifyOTP
);

router.post(
    "/resend-otp",
    resendOTP
);

router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/reset-password",
    resetPassword
);

router.put("/profile", protect, updateUserProfile);

export default router;