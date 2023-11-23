import httpStatus from "http-status";
import userServices from "../services/users.services.js";

export async function postSignUp(req, res) {
    const { email, senha, telefones, nome } = req.body;
    const userInput = {
        password: senha,
        phone: telefones.numero,
        DDD: telefones.DDD,
        name: nome,
        email
    };

    try {
        const userData = await userServices.createUser(userInput);

        const userOutput = {
            id: userData.id,
            data_criacao: userData.createdAt,
            data_atualizacao: userData.updatedAt,
            ultimo_login: null,
            token: null,
        };

        return res.status(httpStatus.CREATED).send(userOutput);
    }
    catch (err) {
        if (err.message === "E-mail already registered")
            return res.status(httpStatus.CONFLICT).send({ mensagem: "E-mail já existente" });

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);

    }
}

export async function getUserByEmailId(req, res) {
    const userId = res.locals.userId;
    try {
        const getUserOutput = await userServices.getUserById(userId);
        return res.status(httpStatus.OK).send(getUserOutput);
    }
    catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
}

const userControllers = {
    postSignUp,
    getUserByEmailId
};

export default userControllers;