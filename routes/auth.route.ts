import express from "express";
import authController from "../controllers/auth.controller";
import validation from "../middlewares/validations";

const router = express.Router();

router.post(
  "/register",
  validation.validateRegisterRequest,
  authController.RegisterUser
);
router.post(
  "/login",
  validation.validateLoginRequest,
  authController.LoginUser
);

export default router;
