import bcrypt from "bcrypt";
import { userNotFoundError } from "../errors/userNotFound.errors.js";
import userServices from "../services/users.services.js";
import { invalidCredentialsError } from "../errors/invalidCredentials.errors.js";
import jwt from "jsonwebtoken";
import sessionRepositories from "../repositories/sessions.repositories.js";

async function login(userInput) {
    const user = await userServices.getUserByEmail(userInput.email);
    if (!user) throw userNotFoundError();

    const isPasswordValid = await bcrypt.compare(userInput.password, user.password);
    if (!isPasswordValid) throw invalidCredentialsError();

    const userSession = await createSession(user.id);

    const signInOutput = {
        id: user.id,
        data_criacao: user.createdAt,
        data_atualizacao: user.updatedAt,
        ultimo_login: userSession.updatedAt,
        token: userSession.token
    };

    return signInOutput;
}

async function createSession(userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30m" });
    return await sessionRepositories.create({
        token,
        userId,
    });
}

const authServices = {
    login,
    createSession
};

export default authServices;