import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "Blog application",
    version: "1.0.0",
    description: "Blog application API Documentation",
  },
  basePath: "/api",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "Auth", description: "Auth" },
    { name: "Posts", description: "Posts" },
    { name: "Comments", description: "Comments" },
  ],

  paths: {
    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login a user",
        description: "Login a user",
        operationId: "loginUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                email: "root@example.com",
                password: "root123",
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Add a user",
        description: "Add a user",
        operationId: "addOneUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                name: "john doe",
                email: "test@example.com",
                password: "password",
              },
              required: true,
            },
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/posts": {
      get: {
        tags: ["Posts"],
        summary: "Get Posts",
        description: "Get all posts",
        operationId: "getPosts",
        security: [],
        responses: {
          200: {
            description: "All Posts",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/posts/{id}": {
      get: {
        tags: ["Posts"],
        summary: "Get Post",
        description: "Get One posts",
        operationId: "getPost",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Post id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Posts",
          },
          404: {
            description: "Posts not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/posts": {
      post: {
        tags: ["Posts"],
        summary: "Add a Post",
        description: "Add a Post",
        operationId: "addPost",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Post's title",
                  },
                  content: {
                    type: "string",
                    description: "Post's content",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                    description: "Post's image",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Post created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/posts/{id}": {
      put: {
        tags: ["Posts"],
        summary: "Edit a Post",
        description: "Edit a Post",
        operationId: "editPost",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Post id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Post's title",
                  },
                  content: {
                    type: "string",
                    description: "Post's content",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                    description: "Post's image",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Post created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/posts/{id}": {
      delete: {
        tags: ["Posts"],
        summary: "Delete Post",
        description: "Delete One posts",
        operationId: "deletePost",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Post id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Post deleted",
          },
          401: {
            description: "unauthorized",
          },
          404: {
            description: "Posts not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/posts/comments/{id}": {
      put: {
        tags: ["Comments"],
        summary: "Update Comment",
        description: "Update comments belong to post",
        operationId: "deleteComments",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Comment id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Update comment",
          },
          403: {
            description: "Comment not belong to you",
          },
          404: {
            description: "Comment not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/posts/comments/{id}": {
      delete: {
        tags: ["Comments"],
        summary: "Delete Comments",
        description: "Delete comment belong to post",
        operationId: "deleteComment",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Comment id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "comment deleted",
          },
          403: {
            description: "Comment not belong to you",
          },
          404: {
            description: "Comment not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "User's username",
          },
          email: {
            type: "string",
            description: "User's email",
          },
          password: {
            type: "string",
            description: "User's password",
          },
        },
      },
      Post: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Post's title",
          },
          content: {
            type: "string",
            description: "Post's content",
          },
          file: {
            type: "file",
            description: "Post's file",
          },
          userId: {
            type: "string",
            description: "Post's author",
          },
        },
      },
      Comment: {
        type: "object",
        properties: {
          comment: {
            type: "string",
            description: "Post comment content",
          },
          userId: {
            type: "string",
            description: "Comment's author",
          },
          postId: {
            type: "string",
            description: "Post's Id to comment",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
