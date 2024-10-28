import { NextFunction, Request, Response } from "express";
import * as schema from "./schema";

export const authentication = (req: Request, res: Response, next: NextFunction): void => {
	const { email, password } = req.body;
	const { value, error } = schema.authentication.validate({ email, password });

	if (error) {
		res.status(400).send();
	} else {
		req.body = value;
		next();
	}
};

export const creation = (req: Request, res: Response, next: NextFunction): void => {
	const { name, email, password, permissions } = req.body;
	const { value, error } = schema.creation.validate({ name, email, password, permissions });

	if (error) {
		res.status(400).send();
	} else {
		req.body = value;
		next();
	}
};

interface IUpdateRequest extends Request {
	query: {
		userId: string;
	};
}

export const update = (req: IUpdateRequest, res: Response, next: NextFunction) => {
	const { name, email, password, enabled, permissions } = req.body;
	const userId = parseInt(req.query.userId);
	const { value, error } = schema.update.validate({ name, email, password, enabled, userId, permissions });

	if (error) {
		res.status(400).send();
	} else {
		req.body = value;
		next();
	}
};

interface IDeletionRequest extends Request {
	query: {
		userId: string;
	};
}

export const deletion = (req: IDeletionRequest, res: Response, next: NextFunction) => {
	const userId = parseInt(req.query.userId);
	const { value, error } = schema.deleteOne.validate({ userId });

	if (error) {
		res.status(400).send();
	} else {
		req.body = value;
		next();
	}
};
