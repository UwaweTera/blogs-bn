/* eslint-disable require-jsdoc */

import { Post } from "../database/models/index";

export default async function IsPostExist(req, res, next) {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res
        .status(404)
        .json({ status: 404, message: "Post does not exist" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: "server error" });
  }
}
