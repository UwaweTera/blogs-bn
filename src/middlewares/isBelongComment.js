/* eslint-disable require-jsdoc */

import { Post, Comment } from "../database/models/index";

export default async function IsBelongComment(req, res, next) {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    const user = req.user;
    if (comment.userId !== user.id) {
      return res.status(403).json({
        status: 403,
        message: "You don't have permission to access this Comment",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: "server error" });
  }
}
