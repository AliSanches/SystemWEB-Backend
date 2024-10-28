import { NoteRepository } from "../contracts/NoteRepository";
import { ICreateNote, TNote } from "../../entities/Note";
import { prismaClient } from "../prismaClient";

export class NoteDatabaseRepository implements NoteRepository {
	async list(processId: number) {
		// noinspection TypeScriptValidateTypes
		const query = await prismaClient.note.findMany({
			where: {
				processId,
			},
			include: {
				user: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return query;
	}

	async create(note: ICreateNote): Promise<TNote> {
		const query = await prismaClient.note.create({
			data: note,
		});

		return query;
	}

	update = async (note: TNote, noteId: number): Promise<TNote> => {
		const query = await prismaClient.note.update({
			where: {
				id: noteId,
			},
			data: note,
		});

		return query;
	};
}
