import CalendarioRepository from "../../db/contracts/CalendarioRepository";
import { TCriarTarefa } from "../../entities/Calendario";

export class CriarEvento {
    constructor(readonly repository: CalendarioRepository) {}

    execute = async (tarefa: TCriarTarefa, idUsuario: number) => {
        let query = await this.repository.criar(tarefa, idUsuario);

        return query;
    };
}

