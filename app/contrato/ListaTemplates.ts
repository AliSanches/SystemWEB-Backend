import { ContratoRepository } from "./../../db/contracts/ContratoRepository";

class ListaTemplates {
    constructor(readonly repository: ContratoRepository) {}

    execute = async () => {
        let templates = this.repository.list();

        return templates;
    };
}

export { ListaTemplates };
