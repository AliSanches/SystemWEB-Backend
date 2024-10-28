import Joi from "joi";

export const create = Joi.object({
	name: Joi.string().allow("").required(),
});

export const get = Joi.object({
	id: Joi.number().required(),
});

export const update = Joi.object({
	id: Joi.number().required(),
	name: Joi.string().allow("").required(),
	enabled: Joi.bool().required()
});

export const remove = Joi.object({
	id: Joi.number().required(),
});
