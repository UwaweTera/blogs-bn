const Joi = require("joi");

const messageSchema = Joi.object({
  message: Joi.string().min(3).required(),
  postId: Joi.string().required(),
});

const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  next();
};

export { validatePost };
