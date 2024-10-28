import {ProcessRepository} from "../../db/contracts/ProcessRepository";

export class GetProcess {
    constructor(readonly repository: ProcessRepository) { }

    execute = async (processId: number) => {
        return await this.repository.get(processId);
    }
}