import { CreateNote } from "../../app/note/CreateNote";
import { GetNotes } from "../../app/note/GetNotes";
import { NoteDatabaseRepository } from "../../db/repositories/NoteDatabaseRepository";
import { mock } from "jest-mock-extended";

const process = {
	id: Math.floor(Math.random() * (40 - 10)),
	createdAt: new Date(),
	updatedAt: new Date(),
	startDate: new Date(),
	endDate: null,
	name: "process 1",
	customerId: 1,
	serviceId: 1,
};

const note = {
	id: Math.floor(Math.random() * (40 - 10)),
	createdAt: new Date(),
	updatedAt: new Date(),
	userId: 1,
	title: "note 1",
	text: "note 1",
	processId: 1,
};

describe("Process unit tests ▼", () => {
	/* it.skip("should return a list of notes", async () => {
		const noteRepository = mock<NoteDatabaseRepository>();
		noteRepository.list.mockResolvedValue([note, note]);

		const getNotes = new GetNotes(noteRepository);
		const notes = await getNotes.execute(11);

		expect(notes).toBeInstanceOf(Array);
		expect(notes.length).toBe(2);
		expect(notes[0]).toMatchObject(note);
	}); */

	it.only("should return the created note", async () => {
		const noteRepository = mock<NoteDatabaseRepository>();
		noteRepository.create.mockResolvedValue(note);

		const createNote = new CreateNote(noteRepository);
		const newNote = await createNote.execute({ ...note, processId: 11 });

		expect(newNote).toMatchObject(note);
	});
});
