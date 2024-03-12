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

export default { getAllUsers };
