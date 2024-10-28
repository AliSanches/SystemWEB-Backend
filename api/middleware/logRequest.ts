import { NextFunction, Request, Response } from "express";

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
	let start: Date | any = new Date();
	res.on("finish", () => {
		let now: Date | any = new Date();
		let elapsed = now - start;

		now = now.toLocaleTimeString();

		let message = `[${res.statusCode}] ${elapsed}ms ${req.method} ${req.baseUrl}${req.path} - ${now}`;

		console.log(message);
	});

	next();
};
