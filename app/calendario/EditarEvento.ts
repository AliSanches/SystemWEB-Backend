import CalendarioRepository from "../../db/contracts/CalendarioRepository";
import { TTarefa } from "../../entities/Calendario";

export class EditarEvento {
    constructor(readonly repository: CalendarioRepository) {}

    execute = async (tarefa: TTarefa, idUsuario: number) => {
        let query = await this.repository.editar(tarefa, idUsuario);

        return query;
    };
}

