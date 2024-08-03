/* eslint-disable require-jsdoc */

import { Post } from "../database/models/index";

export default async function IsBelongPost(req, res, next) {
  try {

    const post = await Post.findOne({ where: { id: req.params.id } });
    const user = req.user;

    if (post.userId !== user.id) {
      return res.status(403).json({
        status: 403,
        message: "You don't have permission to access this post",
      });
    }

    next();
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ status: 500, error: "server error" });
  }
}
