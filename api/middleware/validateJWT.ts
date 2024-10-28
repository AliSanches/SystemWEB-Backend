import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IValidateJWTRequest extends Request {
	user?: any;
	headers: {
		authorization: string;
	};
}

const validateJWT = (req: IValidateJWTRequest, res: Response, next: NextFunction): void => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.SECRET);
		req.user = decoded;

		next();
	} catch (err) {
		let expiredAt: Date | string = new Date(err.expiredAt);
		expiredAt = expiredAt.toLocaleString();
		let message: string =
			err.name === "TokenExpiredError" ? `▼ Token expirado em ${expiredAt} ` : "▼ Token inválido";
		console.log(message);
		res.status(401).json("Unauthorized request");
	}
};

export default validateJWT;
