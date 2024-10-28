import { Request, Response } from "express";
import { getAposentadoriaProporcional } from "../../app/prevcalc/AposentadoriaProporcional";
import { getTransicao50 } from "../../app/prevcalc/Transicao50";
import { getTransicao100 } from "../../app/prevcalc/Transicao100";
import { getRegraPontos } from "../../app/prevcalc/RegraPontos";
import { getIdadeProgressiva } from "../../app/prevcalc/IdadeProgressiva";
import { getTransicaoEspecial } from "../../app/prevcalc/TransicaoEspecial";
import { getTransicao100Professor } from "../../app/prevcalc/Transicao100Professor";

export const pedagio = async (req: Request, res: Response) => {
    const pedagio = await getAposentadoriaProporcional(req.params.customerId);
    res.send(pedagio);
};

export const transicao50 = async (req: Request, res: Response) => {
    const transicao50 = await getTransicao50(req.params.customerId);
    res.send(transicao50);
};

export const transicao100 = async (req: Request, res: Response) => {
    const transicao100 = await getTransicao100(req.params.customerId);
    res.send(transicao100);
};

export const transicao100Professor = async (req: Request, res: Response) => {
    const transicao100 = await getTransicao100Professor(req.params.customerId);
    res.send(transicao100);
};

export const regraPontos = async (req: Request, res: Response) => {
    const regraPontos = await getRegraPontos(req.params.customerId);
    res.send(regraPontos);
};

export const idadeProgressiva = async (req: Request, res: Response) => {
    const idadeProgressiva = await getIdadeProgressiva(req.params.customerId);
    res.send(idadeProgressiva);
};

export const transicaoEspecial = async (req: Request, res: Response) => {
    const transicaoEspecial = await getTransicaoEspecial(req.params.customerId);
    res.send(transicaoEspecial);
};

