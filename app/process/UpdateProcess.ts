import {ProcessRepository} from "../../db/contracts/ProcessRepository";
import {IUpdateProcess} from "../../entities/Process";

export class UpdateProcess {
    constructor(readonly repository: ProcessRepository) {
    }

    execute = async (data: IUpdateProcess, processId: number) => {
        return await this.repository.update(data, processId)
    }
}