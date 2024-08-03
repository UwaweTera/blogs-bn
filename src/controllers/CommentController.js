import { Comment, Post, User } from "../database/models";

class CommentController {
  static async getPostComments(req, res) {
    try {
      const postId = req.params.id;
      const comments = await Comment.findAll({
        where: {
          postId: postId,
        },
        include: {
          model: User,
          as: "author",
        },
      });
      res.json(comments);
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async postComment(req, res) {
    try {
      const { message } = req.body;
      const { id } = req.params;
      const userId = req.user.id;
      if (!id) {
        return res.status(400).json({ error: "Post ID is required" });
      }
      const comment = await Comment.create({
        comment: message,
        postId: id,
        userId,
      });
      res.json({ status: 200, comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }
  static async editComment(req, res) {
    try {
      const { message } = req.body;
      const { id } = req.params;
      const userId = req.user.id;

      //  find the existing post
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Update the post details
      comment.comment = message || comment.comment;
      await comment.save();

      return res.json({
        status: 200,
        message: "Comment updated successfully",
        comment,
      });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }
  static async deleteComment(req, res) {
    try {
      const { id } = req.params;

      await Comment.destroy({ where: { id } });
      return res.json({
        status: 200,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }
}

export default CommentController;
