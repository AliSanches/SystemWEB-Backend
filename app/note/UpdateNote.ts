import {NoteRepository} from "../../db/contracts/NoteRepository";
import {TNote} from "../../entities/Note";

export class UpdateNote {
    constructor(readonly repository: NoteRepository) { }

    async execute(note: TNote, noteId: number): Promise<TNote> {
        return await this.repository.update(note, noteId);
    }
}