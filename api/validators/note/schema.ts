import Joi from "joi";

export const create = Joi.object({
	processId: Joi.number().required(),
	title: Joi.string().required().allow(""),
	text: Joi.string().required().allow(""),
});

export const update = Joi.object({
	title: Joi.string().required().allow(""),
	text: Joi.string().required().allow(""),
});
