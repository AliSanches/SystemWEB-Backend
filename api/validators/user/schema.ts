import Joi from "joi";

export const authentication = Joi.object({
    email: Joi.string().email().max(200).required(),
    password: Joi.string().max(200).required(),
});

export const creation = Joi.object({
    name: Joi.string().max(200).required(),
    email: Joi.string().email().max(200).required(),
    password: Joi.string().max(200).required(),
    permissions: Joi.object({
        clientes: Joi.number().required().valid(0, 1, 2),
        processos: Joi.number().required().valid(0, 1, 2),
        servicos: Joi.number().required().valid(0, 1, 2),
        usuarios: Joi.number().required().valid(0, 1, 2),
        anotacoes: Joi.number().required().valid(0, 1, 2),
        relatorios: Joi.number().required().valid(0, 1),
        contratos: Joi.number().required().valid(0, 1, 2),
        configuracoes: Joi.number().required().valid(0, 1, 2),
    }).required(),
});

export const update = Joi.object({
    name: Joi.string().max(200),
    enabled: Joi.bool(),
    email: Joi.string().email().max(200),
    password: Joi.string().max(200).allow(""),
    userId: Joi.number().required(),
    permissions: Joi.object({
        clientes: Joi.number().required().valid(0, 1, 2),
        processos: Joi.number().required().valid(0, 1, 2),
        servicos: Joi.number().required().valid(0, 1, 2),
        usuarios: Joi.number().required().valid(0, 1, 2),
        anotacoes: Joi.number().required().valid(0, 1, 2),
        relatorios: Joi.number().required().valid(0, 1),
        contratos: Joi.number().required().valid(0, 1, 2),
        configuracoes: Joi.number().required().valid(0, 1, 2),
    }),
});

export const deleteOne = Joi.object({
    userId: Joi.number().required(),
});

