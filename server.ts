import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import express, { Request, Response } from "express";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";

export const prisma = new PrismaClient();
const app = express();

async function main() {
  // Middleware
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.disable("x-powered-by");
  app.use(express.static("public"));

  // Health Checker
  app.get("/api/healthchecker", (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "Welcome to the API",
    });
  });

  // Routes
  app.use("/api/auth", authRouter);
  app.use("/api", userRouter);
  app.use("/api", postRouter);

  app.all("*", (req: Request, res: Response) => {
    return res.status(404).json({
      status: "fail",
      message: `Route: ${req.originalUrl} not found`,
    });
  });

  const PORT = 8000;
  app.listen(PORT, () => {
    console.info(`Server started on http://localhost:${PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
