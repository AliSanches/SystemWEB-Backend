import { Request, Response } from "express";
import { CalendarioDatabaseRepository } from "../../db/repositories/CalendarioDatabaseRepository";
import { CriarEvento } from "../../app/calendario/CriarEvento";
import { ListarPorData } from "../../app/calendario/ListarPorData";
import { EditarEvento } from "../../app/calendario/EditarEvento";
import { DeletarTarefa } from "../../app/calendario/DeletarTarefa";
import { google } from "googleapis";
import { UserDatabaseRepository } from "../../db/repositories/UserDatabaseRepository";

type user = {
    id: number;
    name: string;
    email: string;
    password: string;
    permissions: object;
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
};

let clientId = process.env.GOOGLE_CLIENT_ID;
let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
let redirectURL = `${process.env.BACKEND_URL}/calendario/google-success`;

const oauth2client = new google.auth.OAuth2(clientId, clientSecret, redirectURL);
const calendar = google.calendar({
    version: "v3",
    auth: oauth2client,
});

interface ReqTarefa extends Request {
    user: user;
}

export const criarTarefa = async (req: ReqTarefa, res: Response) => {
    let repository = new CalendarioDatabaseRepository();
    let criarEvento = new CriarEvento(repository);

    let query = await criarEvento.execute(req.body, req.user.id);
    res.send(query);
};

export const editarTarefa = async (req: ReqTarefa, res: Response) => {
    let repository = new CalendarioDatabaseRepository();
    let editar = new EditarEvento(repository);

    let query = await editar.execute(req.body, req.user.id);

    res.send(query);
};

export const deletarTarefa = async (req: ReqTarefa, res: Response) => {
    let repository = new CalendarioDatabaseRepository();
    let deletar = new DeletarTarefa(repository);

    let { id }: { id: number } = req.body;

    let query = await deletar.execute(id, req.user.id);

    res.send(query);
};

export const listarPorData = async (req: ReqTarefa, res: Response) => {
    let repository = new CalendarioDatabaseRepository();
    let listar = new ListarPorData(repository);

    let query = await listar.execute(req.body.data, req.user.id);

    res.send(query);
};

export const googleLogin = async (req: ReqTarefa, res: Response) => {
    let clientId = process.env.GOOGLE_CLIENT_ID;
    let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    let redirectURL = `${process.env.BACKEND_URL}/calendario/google-success`;

    const { userId } = req.params as { userId: string };
    const oauth2client = new google.auth.OAuth2(clientId, clientSecret, redirectURL);

    const authorizationUrl = oauth2client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar.events"],
        include_granted_scopes: true,
        prompt: "consent",
        state: userId,
    });

    res.redirect(authorizationUrl);
};

export const googleSuccess = async (req: Request, res: Response) => {
    let clientId = process.env.GOOGLE_CLIENT_ID;
    let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    let redirectURL = `${process.env.BACKEND_URL}/calendario/google-success`;

    let { code, scope, state } = req.query as { code: string; scope: string; state: string };

    const oauth2client = new google.auth.OAuth2(clientId, clientSecret, redirectURL);
    let { tokens } = await oauth2client.getToken(code);

    let repo = new UserDatabaseRepository();
    await repo.saveGoogleToken(+state, tokens.access_token, tokens.refresh_token);

    res.redirect(
        `${process.env.FRONTEND_URL}/#/app/agenda/google-sucesso?token=${tokens.access_token}&refresh=${tokens.refresh_token}`
    );
};

export const createGoogleTask = async (req: any, res: Response) => {
    let user = req.user;
    let { summary, description } = req.query;

    oauth2client.setCredentials({
        access_token: user.google_token,
        refresh_token: user.google_refreshToken,
    });

    let date = new Date(req.body.data);

    const query = await calendar.events.insert({
        //@ts-ignore
        calendarId: "primary",
        requestBody: {
            start: {
                dateTime: date,
            },
            end: {
                dateTime: date,
            },
            summary,
            description,
        },
    });

    res.send(query);
};

