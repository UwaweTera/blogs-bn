import { Router } from "express";
import PostController from "../controllers/PostController";
import extractToken from "../middlewares/ExtractToken";
import { storage } from "../utils/cloudinary";
import multer from "multer";
import IsPostExist from "../middlewares/isPostExist";
import { validatePost } from "../validations/postValidation";
import CommentController from "../controllers/CommentController";
import IsBelongPost from "../middlewares/isBelongPost";
import IsCommentExist from "../middlewares/isCommentExist";
import IsBelongComment from "../middlewares/isBelongComment";

const route = Router();
const upload = multer({ storage });

route.get("/", PostController.getPosts);
route.get("/user", extractToken, PostController.getBelongPosts);
route.get("/:id", IsPostExist, PostController.getPost);

route.post(
  "/",
  extractToken,
  upload.single("image"),
  PostController.createPost
);

route.put(
  "/:id",
  extractToken,
  IsPostExist,
  IsBelongPost,
  upload.single("image"),
  PostController.updatePost
);

route.delete(
  "/:id",
  extractToken,
  IsPostExist,
  IsBelongPost,
  PostController.deletePost
);

// on comments

route.get("/:id/comments", IsPostExist, CommentController.getPostComments);
route.post("/:id/comments", extractToken, CommentController.postComment);
route.put(
  "/:id/comments",
  extractToken,
  IsCommentExist,
  IsBelongComment,
  CommentController.editComment
);
route.delete(
  "/comments/:id",
  extractToken,
  IsCommentExist,
  IsBelongComment,
  CommentController.deleteComment
);

export default route;
