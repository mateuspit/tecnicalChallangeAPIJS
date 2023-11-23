import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const TOKEN_PREFIX = "Bearer ";
const JWT_EXPIRED_MESSAGE = "jwt expired";
const JWT_INVALID_MESSAGE = "invalid signature";
const UNAUTHORIZED_MESSAGE = { mensagem: "Não autorizado" };
const EXPIRED_SESSION_MESSAGE = { mensagem: "Sessão inválida" };

export default function validateToken() {
    return ((req, res, next) => {
        const { authorization } = req.headers;
        const token = authorization?.split(TOKEN_PREFIX);

        try {
            const { userId } = jwt.verify(token[1], process.env.JWT_SECRET);
            res.locals.userId = userId;
            next();
        }
        catch (err) {
            if (err.message === JWT_EXPIRED_MESSAGE) return res.status(httpStatus.UNAUTHORIZED).send(EXPIRED_SESSION_MESSAGE);
            if (err.message === JWT_INVALID_MESSAGE) return res.status(httpStatus.UNAUTHORIZED).send(UNAUTHORIZED_MESSAGE);
            return res.status(httpStatus.UNAUTHORIZED).send(UNAUTHORIZED_MESSAGE);
        }
    });
}