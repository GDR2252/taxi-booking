import UserController from "../controllers/users.controller";
import { Router } from "express";
import { verifyToken, is_Login } from "../middleware/auth";

const router = Router();
const multer = require("multer");
const path = require("path");

// Set up Multer storage and file handling configuration
const storage = multer.diskStorage({
  destination: (req: any, file: any, callback: any) => {
    callback(null, `src/public/uploads`); // Define the destination folder for uploaded files
  },
  filename: (req: any, file: any, callback: any) => {
    callback(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    ); // Use the original file name
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "profile_photo" },
  { name: "addhar_card" },
  { name: "vehicle_permit" },
]);

router.post(`/signUp`, UserController.signUpUser);
router.post(`/signIn`, UserController.signInUser);
router.post(`/signUp/verify-otp`, verifyToken, UserController.signUpOtpVarify);
router.post(`/signIn/verify-otp`, verifyToken, UserController.signInOtpVarify);
router.post(`/resend-otp`, UserController.otpResend);
router.post(`/rider/profile`, UserController.addRiderProfile);
router.post(`/driver/profile`, upload, UserController.addDriverProfile);
router.post(`/driver/profile-detail`, upload, UserController.addDriverProfileDetail);
router.post(`/forgot-password`, UserController.forgotPassword);
router.post(`/reset-password/:token`, UserController.resetPassword);
router.get(`/`, is_Login, UserController.getUser);
router.get(`/:id`, is_Login, UserController.getUserById);
router.put(`/:id`, is_Login, UserController.updateUser);
router.delete(`/:id`, is_Login, UserController.deleteUser);

const userRoutes = router;

export default userRoutes;
