import { ContratoRepository } from "../../db/contracts/ContratoRepository";

class CadastroTemplate {
    constructor(readonly repository: ContratoRepository) {}

    execute = async ({ contrato, titulo }: { contrato: string; titulo: string }) => {
        try {
            let data = await this.repository.create(titulo, contrato);
            return data;
        } catch {
            return false;
        }
    };
}

export { CadastroTemplate };
