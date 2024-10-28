import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

interface ICheckUserEnabled extends Request {
	user: {
		id: number;
		iat: number;
	};
}

const checkUserEnabled = async (req: ICheckUserEnabled, res: Response, next: NextFunction): Promise<void> => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	if (user && user.enabled) {
        next();
	} else {
		res.status(401).send();
	}
};

export default checkUserEnabled;
