import { NextFunction, Request, Response } from "express";
import * as schema from "./schema";

export const criarTarefa = (req: Request, res: Response, next: NextFunction) => {
    let { value, error } = schema.novaTarefa.validate(req.body);

    if (error) {
        res.status(400).send();
    } else {
        req.body = value;
        next();
    }
};

export const editarTarefa = (req: Request, res: Response, next: NextFunction) => {
    let { value, error } = schema.editarTarefa.validate(req.body);

    if (error) {
        res.status(400).send();
    } else {
        req.body = value;
        next();
    }
};

export const buscarPorData = (req: Request, res: Response, next: NextFunction) => {
    let { value, error } = schema.buscaPorData.validate(req.query);

    if (error) {
        res.status(400).send();
    } else {
        req.body = value;
        next();
    }
};

export const deletarTarefa = (req: Request, res: Response, next: NextFunction) => {
    let { value, error } = schema.deletarTarefa.validate(req.params);

    if (error) {
        res.status(400).send();
    } else {
        req.body = value;
        next();
    }
};

