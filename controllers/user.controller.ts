import { prisma } from "../server";
import { handleResponse } from "../utils/handle.response";
import { Request, Response, NextFunction } from "express";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    handleResponse(res, 500, error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: true,
      },
    });
    if (!user) {
      handleResponse(res, 404, "User not found");
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    handleResponse(res, 500, error);
  }
};

export default { getAllUsers, getUserById };
