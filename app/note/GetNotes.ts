import { NoteRepository } from "../../db/contracts/NoteRepository";

export class GetNotes {
	constructor(readonly noteRepository: NoteRepository) {}

	async execute(processId: number) {
		const notes = await this.noteRepository.list(processId);
		return notes;
	}
}
