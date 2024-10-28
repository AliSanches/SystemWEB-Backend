import CalendarioRepository from "../../db/contracts/CalendarioRepository";

export class DeletarTarefa {
    constructor(readonly repository: CalendarioRepository) {}

    execute = async (id: number, idUsuario: number) => {
        let query = await this.repository.deletar(id, idUsuario);

        return query;
    };
}

