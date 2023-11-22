import { Router } from "express";
import userControllers from "../controllers/users.controllers.js";
import validateUser from "../middlewares/validateUser.middlewares.js";
import { userSchema } from "../schemas/newUser.schemas.js";

const usersRouter = Router();

usersRouter.post("/users/signup", validateUser(userSchema), userControllers.postSignUp);
//rentalsRouter.post("/rentals/:id/return", finishRental)
//rentalsRouter.get("/rentals", getRentals);
//rentalsRouter.delete("/rentals/:id", deleteRentals)

export default usersRouter;