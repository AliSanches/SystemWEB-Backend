import "express-async-errors";
import express from "express";
import cors from "cors";
import userRouter from "./api/routes/user";
import customerRouter from "./api/routes/customer";
import employmentRouter from "./api/routes/employment";
import regrasRouter from "./api/routes/regras";
import servicosRouter from "./api/routes/service";
import processRouter from "./api/routes/process";
import noteRouter from "./api/routes/note";
import anotacoesRouter from "./api/routes/anotacoes";
import configsRouter from "./api/routes/configs";
import contratoRouter from "./api/routes/contrato";
import relatorioRouter from "./api/routes/relatorios";
import ged from "./api/routes/ged";
import calendarioRouter from "./api/routes/calendario";
import messageRouter from "./api/routes/messages";

import { logRequest } from "./api/middleware/logRequest";
import errorHandler from "./api/middleware/errorHandler";

const app = express();
const port = process.env.PORT ? process.env.PORT : 4000;

app.use(express.json());
app.use(cors());
app.use(logRequest);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.disable("etag");

//rotas
app.use("/user", userRouter);
app.use("/customer", customerRouter);
app.use("/employment", employmentRouter);
app.use("/regras", regrasRouter);
app.use("/service", servicosRouter);
app.use("/process", processRouter);
app.use("/note", noteRouter);
app.use("/anotacoes", anotacoesRouter);
app.use("/configs", configsRouter);
app.use("/contrato", contratoRouter);
app.use("/relatorios", relatorioRouter);
app.use("/ged", ged);
app.use("/calendario", calendarioRouter);
app.use("/messages", messageRouter);

//middleware de tratamento de erros
app.use(errorHandler);

app.listen(port, () => {
    console.log(`SIGPREV: Aceitando requisições na porta -> ${port}`);
});

