import { Router } from "express";
import usersRouter from "./users.routes.js";
import authenticationRouter from "./auth.routes.js";

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Verifica se a aplicação está online
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica se a aplicação está online
 *     description: Verifica se a aplicação está online através de um requisição GET
 *     tags:
 *       - Health
 *     responses:
 *       '200':
 *         description: Aplicação online!
 *         content:
 *           application/json:
 *             example:
 *               I'm online!
 */

const router = Router();
router.use(usersRouter);
router.use(authenticationRouter);

export default router;