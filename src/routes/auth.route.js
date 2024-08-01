import { Router } from "express";
import UserController from "../controllers/userController";
import { validateLogin, validateSignup } from "../validations/userValidation";

const route = Router();

route.post("/signup", validateSignup, UserController.register);
route.post("/login", validateLogin, UserController.login);

export default route;
