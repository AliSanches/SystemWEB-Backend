import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

interface ICheckLastLogin extends Request {
	user: {
		id: number;
		iat: number;
	};
}

const checkLastLogin = async (req: ICheckLastLogin, res: Response, next: NextFunction): Promise<void> => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	const iat = req.user.iat;

	if (user) {
		const lastLogin = user.lastLogin;
		lastLogin ? (iat < lastLogin ? res.status(401).send() : next()) : res.status(401).send();
	} else {
		res.status(401).send();
	}
};

export default checkLastLogin;
