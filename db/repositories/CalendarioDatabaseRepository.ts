import { TCriarTarefa, TTarefa } from "../../entities/Calendario";
import { prismaClient } from "../prismaClient";
import CalendarioRepository from "./../contracts/CalendarioRepository";

export class CalendarioDatabaseRepository implements CalendarioRepository {
    criar = async (tarefa: TCriarTarefa, idUsuario: number): Promise<any> => {
        //adiciona segundos e a timezone br -3
        let data = `${tarefa.data}:00.000-03:00`;
        const query = await prismaClient.tarefa.create({
            data: {
                titulo: tarefa.titulo,
                texto: tarefa.texto,
                data,
                idUsuario,
            },
        });

        return query;
    };

    editar = async (tarefa: TTarefa, idUsuario: number) => {
        const query = await prismaClient.tarefa.update({
            where: {
                id: tarefa.id,
                idUsuario,
            },
            data: {
                titulo: tarefa.titulo,
                texto: tarefa.texto,
                data: new Date(tarefa.data).toISOString(),
            },
        });

        return query;
    };

    listarPorData = async (data: string, idUsuario: number) => {
        let dataInicio = new Date(data).setUTCHours(3);
        let dataFim = new Date(dataInicio).setUTCDate(new Date(dataInicio).getDate() + 1);

        const query = await prismaClient.tarefa.findMany({
            where: {
                data: { gte: new Date(dataInicio), lte: new Date(dataFim) },
                idUsuario,
            },
            orderBy: {
                data: "asc",
            },
        });

        return query;
    };

    deletar = async (id: number, idUsuario: number) => {
        const query = await prismaClient.tarefa.delete({
            where: {
                id,
                idUsuario,
            },
        });

        return query;
    };
}

