import { NoteRepository } from "../../db/contracts/NoteRepository";
import { ICreateNote } from "../../entities/Note";

export class CreateNote {
	constructor(readonly noteRepository: NoteRepository) {}

	execute = async (data: ICreateNote) => {
		const note = await this.noteRepository.create(data);
		return note;
	};
}
