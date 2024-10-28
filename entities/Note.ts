export type TNote = {
	id: number;
	userId: number;
	processId: number;
	title: string;
	text?: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export interface ICreateNote extends Pick<TNote, "text" | "title" | "processId" | "userId"> {}
