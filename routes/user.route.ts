import express from "express";
import authController from "../controllers/user.controller";
import { isAuth } from "../middlewares/verify.token";

const router = express.Router();

router.get("/users", isAuth, authController.getAllUsers);
router.get("/user/:id", authController.getUserById);

export default router;
