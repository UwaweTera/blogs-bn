/* eslint-disable require-jsdoc */

import { Comment } from "../database/models/index";

export default async function IsCommentExist(req, res, next) {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      return res
        .status(404)
        .json({ status: 404, message: "Comment does not exist" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: "server error" });
  }
}
