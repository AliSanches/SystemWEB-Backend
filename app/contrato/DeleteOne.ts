import { ContratoRepository } from "./../../db/contracts/ContratoRepository";

class DeleteOne {
    constructor(readonly contratoRepository: ContratoRepository) {}

    execute = async (idContrato) => {
        let contratoDeletado = await this.contratoRepository.deleteOne(+idContrato);

        return contratoDeletado;
    };
}

export { DeleteOne };
