import httpStatus from "http-status";
//import sessionRepositories from "../repositories/sessions.repositories";
import jwt from "jsonwebtoken";

export default function validateToken() {
    return ((req, res, next) => {
        const { authorization } = req.headers;
        const token = authorization?.split("Bearer ");

        try {
            const { userId } = jwt.verify(token[1], process.env.JWT_SECRET);
            res.locals.userId = userId;
            next();
        }
        catch (err) {

            if (err.message === "jwt expired") return res.status(httpStatus.UNAUTHORIZED).send({ mensagem: "Sessão inválida" });
            if (err.message === "invalid signature") return res.status(httpStatus.UNAUTHORIZED).send({ mensagem: "Não autorizado" });
            return console.log(err.message);
        }
        //const { userId } = jwt.verify(token[1], process.env.JWT_SECRET, function (err, decoded) {
        //    if (err) {
        //        return (err = {
        //            message: "loucura"
        //        });
        //    }
        //});
        //if (!tokenExist) return res.status(httpStatus.UNAUTHORIZED).send({ mensagem: "Não autorizado" });
    });
    //return console.log("test");
}