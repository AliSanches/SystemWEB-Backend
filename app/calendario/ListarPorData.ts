import CalendarioRepository from "../../db/contracts/CalendarioRepository";

export class ListarPorData {
    constructor(readonly repository: CalendarioRepository) {}

    execute = async (data: string, idUsuario: number) => {
        let query = await this.repository.listarPorData(data, idUsuario);

        return query;
    };
}

