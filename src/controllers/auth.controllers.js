import httpStatus from "http-status";
import authServices from "../services/auth.services.js";

const ERROR_MESSAGE_NOT_FOUND = "User not found";
const ERROR_MESSAGE_INVALID_PASSWORD = "Invalid password";
const USER_AUTH_ERROR_MESSAGE = { mensagem: "Usuário e/ou senha inválidos" };

export async function postSignIn(req, res) {
    const { email, senha } = req.body;
    const userLogin = {
        password: senha,
        email
    };

    try {
        const signInOutput = await authServices.login(userLogin);

        return res.status(httpStatus.OK).send(signInOutput);
    }
    catch (err) {
        if (err.message === ERROR_MESSAGE_NOT_FOUND)
            return res.status(httpStatus.NOT_FOUND).send(USER_AUTH_ERROR_MESSAGE);

        if (err.message === ERROR_MESSAGE_INVALID_PASSWORD)
            return res.status(httpStatus.UNAUTHORIZED).send(USER_AUTH_ERROR_MESSAGE);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
}

const authControllers = {
    postSignIn,
};

export default authControllers;