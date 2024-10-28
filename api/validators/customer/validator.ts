import { NextFunction, Request, Response } from "express";
import * as schema from "./schema";

interface ICustomerRequest extends Request {
    user: any;
}

export const listing = (req: Request, res: Response, next: NextFunction): void => {
    const { number, search } = req.query;
    const { value, error } = schema.listing.validate({ number, search });

    if (error) {
        res.status(400).send();
    } else {
        req.body = value;
        next();
    }
};

export const creation = (req: Request, res: Response, next: NextFunction): void => {
    const {
        name,
        motherName,
        cpf,
        rg,
        rgIssuer,
        cep,
        uf,
        city,
        neighborhood,
        street,
        mail,
        phone,
        birthplace,
        profession,
        civil,
        customerSince,
        gender,
        birthdate,
        serie,
        ctps,
        numberFolder,
        pis,
        responsibleFolder,
        smartPhone,
        statusCustomer,
        origin,
        stateLife,
        education,
        payment,
        passwordINSS,
        imageProfile,
    } = req.body;
    const { value, error } = schema.creation.validate({
        name,
        gender,
        birthdate,
        motherName,
        cpf,
        rg,
        rgIssuer,
        cep,
        uf,
        city,
        neighborhood,
        street,
        mail,
        phone,
        birthplace,
        profession,
        civil,
        customerSince,
        serie,
        ctps,
        numberFolder,
        pis,
        responsibleFolder,
        smartPhone,
        statusCustomer,
        origin,
        stateLife,
        education,
        payment,
        passwordINSS,
        imageProfile,
    });

    if (error) {
        res.status(400).send();
    } else {
        req.body = value;
        next();
    }
};

export const get = (req: ICustomerRequest, res: Response, next: NextFunction): void => {
    const { id } = req.params;
    const { value, error } = schema.get.validate({ id });

    if (error) {
        res.status(400).send();
    } else {
        req.body = { data: value, user: req.user };
        next();
    }
};

export const update = (req: Request, res: Response, next: NextFunction): void => {
    const { value, error } = schema.update.validate(req.body);

    if (error) {
        res.status(400).send();
    } else {
        req.body = value;
        next();
    }
};

export const deletion = (req: ICustomerRequest, res: Response, next: NextFunction): void => {
    const { id } = req.params;
    const { value, error } = schema.deletion.validate({ id });

    if (error) {
        res.status(400).send();
    } else {
        req.body = { data: value, user: req.user };
        next();
    }
};

