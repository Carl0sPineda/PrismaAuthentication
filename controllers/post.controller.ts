import { prisma } from "../server";
import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/handle.response";
const IMAGE_BASE_URL = "http://localhost:8000/uploads/";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { title, userId } = req.body;
  try {
    const imageFileName = req.file?.filename;

    const post = await prisma.post.create({
      data: {
        title,
        userId,
        // image: imageFileName,
        image: imageFileName ? `${IMAGE_BASE_URL}${imageFileName}` : undefined,
      },
    });
    res.status(201).json(post);
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

export default { createPost, getAllPosts };
