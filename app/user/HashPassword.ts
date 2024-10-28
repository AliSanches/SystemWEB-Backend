import crypto from "crypto";

export default class HashPassword {
	execute = (password: string): string => crypto.createHash("sha256").update(password).digest("hex");
}

export const hashPassword = (password: string): string => {
	return crypto.createHash("sha256").update(password).digest("hex");
};
