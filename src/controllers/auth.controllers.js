import httpStatus from "http-status";
//import userServices from "../services/users.services.js";
import authServices from "../services/auth.services.js";
import { userNotFoundError } from "../errors/userNotFound.errors.js";


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
        if (err.message === "User not found")
            return res.status(httpStatus.NOT_FOUND).send({ mensagem: "Usuário e/ou senha inválidos" });

        if (err.message === "Invalid password")
            return res.status(httpStatus.CONFLICT).send({ mensagem: "Usuário e/ou senha inválidos" });

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);

    }
}

const authControllers = {
    postSignIn,
};

export default authControllers;