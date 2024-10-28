import { NextFunction, Request, Response } from "express";
import * as schema from "./schema";

interface IServiceRequest extends Request {
	user: any;
}

export const create = (req: IServiceRequest, res: Response, next: NextFunction) => {
	const { value, error } = schema.create.validate(req.body);

	if (error) {
		res.status(400).send();
	} else {
		req.body = { data: value, user: req.user };
		next();
	}
};

export const get = (req: IServiceRequest, res: Response, next: NextFunction) => {
	const { value, error } = schema.get.validate(req.params.id);

	if (error) {
		res.status(400).send();
	} else {
		req.body = { data: value, user: req.user };
		next();
	}
};

export const update = (req: IServiceRequest, res: Response, next: NextFunction) => {
	const { value, error } = schema.update.validate(req.body);

	if (error) {
		res.status(400).send();
	} else {
		req.body = { data: value, user: req.user };
		next();
	}
};
