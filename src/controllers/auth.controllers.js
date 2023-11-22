import httpStatus from "http-status";
import userServices from "../services/users.services.js";


export async function postSignIn(req, res) {
    const { email, senha } = req.body;
    const userLogin = {
        password: senha,
        email
    };

    try {
        const user = userServices.getUserByEmail(userLogin.email);


        return res.status(httpStatus.CREATED).send(userOutput);
    }
    catch (err) {
        if (err.message === "E-mail already registered")
            return res.status(httpStatus.CONFLICT).send({ mensagem: "E-mail já existente" });

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);

    }
}

const authControllers = {
    postSignIn,
};

export default authControllers;