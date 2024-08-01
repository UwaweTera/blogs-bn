import express from "express";
import auth from "./auth.route";
import post from "./post.route";
import docrouter from "../documentation/index.doc";

const routes = express.Router();
routes.use("/auth", auth);
routes.use("/posts", post);
routes.use("/api-docs", docrouter);

export default routes;
