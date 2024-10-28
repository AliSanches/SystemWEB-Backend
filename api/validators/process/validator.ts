import { NextFunction, Request, Response } from "express";
import * as schema from "./schema";

interface IRequest extends Request {
	user: any;
}
export const create = (req: IRequest, res: Response, next: NextFunction) => {
	const { value, error } = schema.create.validate(req.body);

	if (error) {
		res.status(400).send();
	} else {
		req.body = { data: value, user: req.user };
		next();
	}
};

export const finish = (req: Request, res: Response, next: NextFunction) => {
	const { value, error } = schema.finish.validate(req.body);

	if (error) {
		res.status(400).send();
	} else {
		req.body = { texto: value.texto };
		next();
	}
};

export const reopen = (req: Request, res: Response, next: NextFunction) => {
	const { value, error } = schema.reopen.validate(req.body);

	if (error) {
		res.status(400).send();
	} else {
		req.body = { texto: value.texto };
		next();
	}
};
