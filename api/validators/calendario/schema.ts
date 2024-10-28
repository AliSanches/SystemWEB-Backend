import Joi from "joi";

export const editarTarefa = Joi.object({
    id: Joi.number().required(),
    titulo: Joi.string().required().allow(""),
    texto: Joi.string().required().allow(""),
    data: Joi.string().required(),
});

export const novaTarefa = Joi.object({
    titulo: Joi.string().required().allow(""),
    texto: Joi.string().required().allow(""),
    data: Joi.string().required(),
});

export const buscaPorData = Joi.object({
    data: Joi.string().required(),
});

export const deletarTarefa = Joi.object({
    id: Joi.number().required(),
});

