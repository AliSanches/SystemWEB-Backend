import { NextFunction, Request, Response } from "express";
import child_process from "child_process";

const checkAvailableSpace = (req: Request, res: Response, next: NextFunction) => {
    let espacoUtilizado = child_process.execSync("du -m uploads", { stdio: "pipe", encoding: "utf8" });
    espacoUtilizado = espacoUtilizado.trim().split("M")[0];
    espacoUtilizado = espacoUtilizado.split("\t")[0];

    //in megabytes
    let espacoContratado = 1024;

    if (+espacoUtilizado < espacoContratado) next();
    else {
        res.sendStatus(507);
    }
};

export default checkAvailableSpace;

