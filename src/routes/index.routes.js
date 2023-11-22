import { Router } from "express";
import usersRouter from "./users.routes.js";
import authenticationRouter from "./auth.routes.js";

const router = Router();
router.use(usersRouter);
router.use(authenticationRouter);
//router.use(authenticationRouter);

export default router;