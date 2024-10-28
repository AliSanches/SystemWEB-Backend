import { ContratoRepository } from "../../db/contracts/ContratoRepository";

class EditarTemplate {
    constructor(readonly repository: ContratoRepository) {}

    execute = async (id, data) => {
        try {
            let contrato = await this.repository.edit(id, data);
            return contrato;
        } catch {
            return false;
        }
    };
}

export { EditarTemplate };
