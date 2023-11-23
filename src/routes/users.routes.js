import { Router } from "express";
import userControllers from "../controllers/users.controllers.js";
import validateUser from "../middlewares/validateUser.middlewares.js";
import validateToken from "../middlewares/validateToken.middlewares.js";
import { userSchema } from "../schemas/newUser.schemas.js";

const usersRouter = Router();

usersRouter.post("/users/signup", validateUser(userSchema), userControllers.postSignUp);
usersRouter.get("/users", validateToken(), userControllers.getUserById);

export default usersRouter;