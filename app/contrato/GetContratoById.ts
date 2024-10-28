import { ContratoRepository } from "./../../db/contracts/ContratoRepository";

class GetContratoById {
    constructor(readonly repository: ContratoRepository) {}

    execute = async (id) => {
        let contrato = this.repository.getById(id);

        return contrato;
    };
}

export { GetContratoById };
