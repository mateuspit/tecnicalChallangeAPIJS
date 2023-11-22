import { Router } from "express";
import authControllers from "../controllers/auth.controllers.js";
import validateUser from "../middlewares/validateUser.middlewares.js";
import { loginSchema } from "../schemas/login.schemas.js";

const authenticationRouter = Router();

authenticationRouter.post("/users/signin", validateUser(loginSchema), authControllers.postSignIn);

export default authenticationRouter;