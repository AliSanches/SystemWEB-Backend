import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        titulo: Joi.string().required(),
        categoria: Joi.number().required(),
        subcategoria: Joi.number().required(),
        texto: Joi.string().required(),
    });

    const { value, error } = schema.validate(req.body);

    if (error) {
        res.status(400).send();
    } else {
        req.body = {
            ...value,
            categoria: undefined,
            categoriaId: value.categoria,
            subcategoria: undefined,
            subcategoriaId: value.subcategoria,
        };
        next();
    }
};

