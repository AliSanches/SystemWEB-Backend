import { GetNotes } from "../../app/note/GetNotes";
import { NoteDatabaseRepository } from "../../db/repositories/NoteDatabaseRepository";
import { Request, Response } from "express";
import { CreateNote } from "../../app/note/CreateNote";
import { UpdateNote } from "../../app/note/UpdateNote";

interface IRequestNote extends Request {
	user: {
		id: number;
	};
}
export const getNotes = async (req: Request, res: Response) => {
	const { processId } = req.params;

	const noteRepository = new NoteDatabaseRepository();
	const getNotesUseCase = new GetNotes(noteRepository);

	const notes = await getNotesUseCase.execute(Number(processId));

	return res.json(notes);
};

export const create = async (req: IRequestNote, res: Response) => {
	const { processId, title, text } = req.body.data;

	const noteRepository = new NoteDatabaseRepository();
	const createNoteUseCase = new CreateNote(noteRepository);

	const note = await createNoteUseCase.execute({
		processId: Number(processId),
		title,
		userId: req.user.id,
		text,
	});

	return res.json(note);
};

export const update = async (req: IRequestNote, res: Response) => {
	const { noteId } = req.params;

	const noteRepository = new NoteDatabaseRepository();
	const updateNote = new UpdateNote(noteRepository);

	const note = await updateNote.execute(req.body.data, +noteId);

	return res.json(note);
};
