import { Request, Response } from "express";
import { GedDataBaseRepository } from "../../db/repositories/GedDataBaseRepository";
import child_process from "child_process";

import path from "path";
import fs from "fs";

export const get = async (req: Request, res: Response): Promise<void> => {
    const GedRepository = new GedDataBaseRepository();
    const getGed = await GedRepository.getAttachment();

    let espacoUtilizado = child_process.execSync("du -m uploadsGed", { stdio: "pipe", encoding: "utf8" });
    espacoUtilizado = espacoUtilizado.trim().split("M")[0];
    espacoUtilizado = espacoUtilizado.split("\t")[0];

    //in megabytes
    let espacoContratado = 1024;

    let porcentagemDeUso = (+espacoUtilizado / espacoContratado) * 100;
    porcentagemDeUso = Math.floor(porcentagemDeUso);

    res.status(200).json({ getGed, espacoContratado, espacoUtilizado: +espacoUtilizado, porcentagemDeUso });
};

export const getAnexoPorId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const GedRepository = new GedDataBaseRepository();
    const response = await GedRepository.getAttachmentById(+id);

    res.status(200).json(response);
};

export const getPasta = async (req: Request, res: Response): Promise<void> => {
    const search = req.body.search;

    const GedRepository = new GedDataBaseRepository();
    const getPastas = await GedRepository.getPastas(search);

    res.status(200).json({ getPastas });
};

export const createPasta = async (req: Request, res: Response): Promise<void> => {
    const { data } = req.body;

    const GedRepository = new GedDataBaseRepository();
    const response = await GedRepository.createPasta(data);

    res.status(200).json({ response });
};

export const upload = async (req: Request, res: Response): Promise<void> => {
    const repository = new GedDataBaseRepository();
    const file = req.file!;

    await repository.attachFile(file.filename, file.originalname, req.body.description, +req.body.categoria);

    res.sendStatus(200);
};

export const deleteFolder = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const repository = new GedDataBaseRepository();

    await repository.deleteFolder(+id);

    res.sendStatus(200);
};

export const deleteFile = async (req: Request, res: Response): Promise<void> => {
    const repository = new GedDataBaseRepository();
    const { fileId } = req.params;

    const file = await repository.getAttachmentId(+fileId);

    let pt = path.join(__dirname, "..", "..", "uploadsGed", file!.name);
    fs.unlinkSync(pt);

    await repository.deleteFile(+fileId);

    res.sendStatus(200);
};

export const renameFile = async (req: Request, res: Response) => {
    const repository = new GedDataBaseRepository();
    const { fileId } = req.params;
    const { description } = req.body;

    const file = await repository.renameFile(+fileId, description);

    res.json(file);
};

export const download = async (req: Request, res: Response): Promise<void> => {
    const repository = new GedDataBaseRepository();
    const { fileId } = req.params;

    const fileData = await repository.getAttachmentId(+fileId);

    let pt = path.join(__dirname, "..", "..", "uploadsGed", fileData!.name);
    let file = fs.readFileSync(pt);

    res.setHeader("Content-Disposition", `attachment; filename="${fileData?.original_name}"`);
    res.send(file);
};

