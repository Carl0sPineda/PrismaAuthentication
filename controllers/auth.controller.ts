import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../server";
import { generateToken } from "../utils/generate.token";
import { handleResponse } from "../utils/handle.response";

const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return handleResponse(
        res,
        409,
        "Email already exists, please use another email address"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    handleResponse(res, 201, "Registered successfully, please login");
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return handleResponse(res, 401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return handleResponse(res, 401, "Invalid credentials");
    }

    const token = generateToken(user);

    res.status(200).json({
      status: 200,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        otp_enabled: user.otp_enabled,
      },
    });
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

export default {
  RegisterUser,
  LoginUser,
};
