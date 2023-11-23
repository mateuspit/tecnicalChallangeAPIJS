import { Router } from "express";
import authControllers from "../controllers/auth.controllers.js";
import validateUser from "../middlewares/validateUser.middlewares.js";
import { loginSchema } from "../schemas/login.schemas.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas relacionadas a autentificação do usuário
 */

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Login
 *     description: Realiza o login do usuário com os dados fornecidos pelo body gerando um token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Dados do usuário
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "Teste@test.com"
 *             senha: "12345"
 *     responses:
 *       '200':
 *         description: Usuário logado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: 26
 *               data_criacao: "2023-11-23T16:08:56.985Z"
 *               data_atualizacao: "2023-11-23T16:08:56.985Z"
 *               ultimo_login: "2023-11-23T16:15:52.010Z"
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI1LCJpYXQiOjE3MDA3NTYxNTIsImV4cCI6MTcwMDc1Nzk1Mn0.dmADQsckgWgBzbRGJPJMsOk572bOkVuyWCE4qaJkmcM
 *       '401':
 *         description: Senha inválida
 *         content:
 *           application/json:
 *             example:
 *               mensagem: "Usuário e/ou senha inválidos"
*       '404':
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: "Usuário e/ou senha inválidos"
 */

const authenticationRouter = Router();

authenticationRouter.post("/users/signin", validateUser(loginSchema), authControllers.postSignIn);

export default authenticationRouter;