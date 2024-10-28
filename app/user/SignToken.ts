import jwt from "jsonwebtoken";

export default class SignToken {
    constructor() {}

    execute = (data: any): string => {
        const token = jwt.sign({ ...data }, process.env.SECRET, {
            expiresIn: "10h",
        });

        return token;
    };
}

