import {ProcessRepository} from "../../db/contracts/ProcessRepository";

export class ReopenProcess {
    constructor(readonly repository: ProcessRepository) {}

    execute = async (processId: number, userId: number) => {
        return await this.repository.reopen(processId, userId)
    }
}