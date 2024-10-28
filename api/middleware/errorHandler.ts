import { NextFunction, Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err.message === "err_employment_not_found") res.status(404).send();
    if (err.message === "err_email_key") res.status(422).json("Email já cadastrado");
    if (err.message === "err_wrong_credentials") res.status(401).json(err.message);

    res.status(500);
    res.send();
};

export default errorHandler;
