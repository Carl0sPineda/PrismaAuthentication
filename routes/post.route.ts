import express from "express";
import postController from "../controllers/post.controller";
import validations from "../middlewares/validations";

const router = express.Router();

router.post(
  "/posts",
  validations.validatePostRequest,
  postController.createPost
);
router.get("/posts", postController.getAllPosts);

export default router;
