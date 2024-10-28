import { NextFunction, Request, Response } from "express";
import * as schema from "./schema";

interface IEmploymentRequest extends Request {
    user: any;
}

export const create = (req: IEmploymentRequest, res: Response, next: NextFunction) => {
    const { value, error } = schema.create.validate(req.body);

    if (error) {
        res.status(400).send();
    } else {
        req.body = { data: value, user: req.user };
        next();
    }
};

export const get = (req: IEmploymentRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { value, error } = schema.get.validate({ id });

    if (error) {
        res.status(400).send();
    } else {
        req.body = { data: value, user: req.user };
        next();
    }
};

export const list = (req: IEmploymentRequest, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    const { value, error } = schema.list.validate({ customerId });

    if (error) {
        res.status(400).send();
    } else {
        req.body = { data: value, user: req.user };
        next();
    }
};

export const update = (req: IEmploymentRequest, res: Response, next: NextFunction) => {
    const { value, error } = schema.update.validate(req.body);

    if (error) {
        res.status(400).send();
    } else {
        req.body = { data: value, user: req.user };
        next();
    }
};

export const remove = (req: IEmploymentRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { value, error } = schema.remove.validate({ id });

    if (error) {
        res.status(400).send();
    } else {
        req.body = { data: value, user: req.user };
        next();
    }
};
