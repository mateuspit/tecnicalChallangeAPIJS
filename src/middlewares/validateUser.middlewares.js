import httpStatus from "http-status";

export default function validadeUser(schema) {
    return ((req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(httpStatus.BAD_REQUEST).send(errorMessages);
        next();
    });
}