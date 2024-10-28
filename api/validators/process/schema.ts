import Joi from "joi";

export const create = Joi.object({
	name: Joi.string().required(),
	serviceId: Joi.number().required(),
	customerId: Joi.number().required(),
});

export const finish = Joi.object({
	texto: Joi.string().required().allow(""),
});

export const reopen = Joi.object({
	texto: Joi.string().required().allow(""),
});
