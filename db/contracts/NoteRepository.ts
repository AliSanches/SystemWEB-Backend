import { ICreateNote, TNote } from "../../entities/Note";

export interface NoteRepository {
	list: (processId: number) => Promise<TNote[]>;
	create: (note: ICreateNote) => Promise<TNote>;
	update: (note: TNote, noteId: number) => Promise<TNote>;
}
