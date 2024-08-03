import { Post, User, Comment } from "../database/models";

class PostController {
  static async getPosts(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: "author",
          },
          {
            model: Comment,
            as: "comments",
            include: {
              model: User,
              as: "author",
            },
          },
        ],
      });
      res.json(posts);
    } catch (error) {
        // console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }
  static async getBelongPosts(req, res) {
    try {
      const userId = req.user.id;
      const posts = await Post.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: User,
            as: "author",
          },
          {
            model: Comment,
            as: "comments",
            include: {
              model: User,
              as: "author",
            },
          },
        ],
      });
      res.json(posts);
    } catch (error) {
      //   console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async getPost(req, res) {
    try {
      const { id } = req.params;
      const posts = await Post.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            as: "author",
          },
          {
            model: Comment,
            as: "comments",
            include: {
              model: User,
              as: "author",
            },
          },
        ],
      });
      res.json(posts);
    } catch (error) {
      //   console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async createPost(req, res) {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
      const image = req.file;
      // Image URL from Cloudinary
      if (!image) {
        return res.status(400).json({ message: "Image is required" });
      }

      // Check if the uploaded file is an image
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"]; // Add other valid image MIME types if necessary
      if (!validImageTypes.includes(image.mimetype)) {
        return res.status(400).json({
          message: "Invalid image type. Only JPEG, PNG, and GIF are allowed.",
        });
      }

      const imageUrl = image ? image.path : null;

      const post = await Post.create({
        title,
        content,
        userId,
        image: imageUrl,
      });

      //   await post.save();
      return res.json({
        status: 200,
        message: "Post created successfully",
        post,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const userId = req.user.id;
      const image = req.file;
      // Image URL from Cloudinary

      //  find the existing post
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Update the post details
      post.title = title || post.title;
      post.content = content || post.content;
      if (image) {
        post.image = image.path;
      }

      await post.save();
      return res.json({
        status: 200,
        message: "Post updated successfully",
        post,
      });
    } catch (error) {
      //   console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id } });
      return res.json({
        status: 200,
        message: "Post deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }
}

export default PostController;
