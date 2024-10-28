import Joi from "joi";

export const create = Joi.object({
	company: Joi.string().allow(""),
	position: Joi.string().allow(""),
	startDate: Joi.date().required(),
	endDate: Joi.date().required(),
	periodIsSpecial: Joi.boolean().required(),
	considerGracePeriod: Joi.boolean().required(),
	customerId: Joi.number().required(),
});

export const get = Joi.object({
	id: Joi.number().required(),
});

export const list = Joi.object({
	customerId: Joi.number().required(),
});

export const update = Joi.object({
	id: Joi.number().required(),
	company: Joi.string().allow(""),
	position: Joi.string().allow(""),
	startDate: Joi.date(),
	endDate: Joi.date(),
	periodIsSpecial: Joi.boolean(),
	considerGracePeriod: Joi.boolean(),
	gracePeriodMonths: Joi.number(),
});

export const remove = Joi.object({
	id: Joi.number().required(),
});
