import express from "express";
import postController from "../controllers/post.controller";
// import validations from "../middlewares/validations";
import uploadMiddleware from "../middlewares/uploads";

const router = express.Router();

router.post(
  "/posts",
  // validations.validatePostRequest,
  uploadMiddleware.single("image"),
  postController.createPost
);
router.get("/posts", postController.getAllPosts);

export default router;
