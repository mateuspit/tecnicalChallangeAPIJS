import { Router } from "express";
import userControllers from "../controllers/users.controllers.js";
import validateUser from "../middlewares/validateUser.middlewares.js";
import validateToken from "../middlewares/validateToken.middlewares.js";
import { userSchema } from "../schemas/newUser.schemas.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas relacionadas a usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna os dados do usuário.
 *     description: Passando apenas o header com o token, verifica a autentificação e retorna o dados do usuário.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de autenticação no formato 'Bearer <seu_token>'
 *         type: string
 *     responses:
 *       '200':
 *         description: Usuário autenticado e retorno de informações do cadastro
 *         content:
 *           application/json:
 *             example:
 *               id: 25
 *               email: "test@test.com"
 *               name: "Teste da Silva"
 *               DDD: "66"
 *               phone: "123456789"
 *               createdAt: "2023-11-23T14:13:37.299Z"
 *               updatedAt: "2023-11-23T14:13:37.299Z"
 *       '401':
 *         description: Sessão inválida ou não autorizada.
 *         content:
 *           application/json:
 *             examples:
 *               sessaoInvalida:
 *                 value:
 *                   mensagem: "Sessão inválida"
 *               naoAutorizado:
 *                 value:
 *                   mensagem: "Não autorizado"
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JW
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Cria um novo usuário.
 *     description: Cria um novo cadastro de usuário com os dados fornecidos.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: Dados do cadastro do novo usuário
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: "Teste da Silva"
 *             email: "Teste@test.com"
 *             senha: "12345"
 *             telefones:
 *               numero: "123456789"
 *               DDD: "62"
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: 26
 *               data_criacao: "2023-11-23T16:08:56.985Z"
 *               data_atualizacao: "2023-11-23T16:08:56.985Z"
 *               ultimo_login: null
 *               token: null
 *       '409':
 *         description: E-mail já existente
 *         content:
 *           application/json:
 *             example:
 *               mensagem: "E-mail já existente"
 */



const usersRouter = Router();

usersRouter.post("/users/signup", validateUser(userSchema), userControllers.postSignUp);
usersRouter.get("/users", validateToken(), userControllers.getUserById);

export default usersRouter;