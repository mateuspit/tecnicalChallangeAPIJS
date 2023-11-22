import Joi from "joi";

export const userSchema = Joi.object({
    nome: Joi.string().required().min(2),
    email: Joi.string().email().required(),
    senha: Joi.string().min(5).required(),
    telefones: Joi.object({
        numero: Joi.string().required().length(9),
        DDD: Joi.string().required().length(2)
    }).required()
});