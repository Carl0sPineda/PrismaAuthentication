import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateRegisterRequest = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

const validateLoginRequest = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

const validatePostRequest = [
  body("title").notEmpty().withMessage("Title is required"),
  body("userId").notEmpty().withMessage("Userid is required"),
  handleValidationErrors,
];

export default {
  validateRegisterRequest,
  validateLoginRequest,
  validatePostRequest,
};
