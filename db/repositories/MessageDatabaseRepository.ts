import { NoteRepository } from "../contracts/NoteRepository";
import { ICreateNote, TNote } from "../../entities/Note";
import { prismaClient } from "../prismaClient";

export class MessageDatabaseRepository {
    async listContacts(userId: number) {
        // noinspection TypeScriptValidateTypes
        const query = await prismaClient.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                contacts: true,
            },
        });

        return query;
    }

    async sendMessage(content: string, senderId: number, receiverId: number) {
        const query = await prismaClient.message.create({
            data: {
                content,
                senderId,
                receiverId,
            },
        });

        await prismaClient.notification.create({
            data: {
                content,
                userId: receiverId,
            },
        });

        return query;
    }

    async getChat(userId, contactId) {
        const query = await prismaClient.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        receiverId: contactId,
                    },
                    {
                        senderId: contactId,
                        receiverId: userId,
                    },
                ],
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return query;
    }

    async getNotifications(userId: number) {
        const query = await prismaClient.notification.findFirst({
            where: {
                userId,
                read: false,
            },
        });

        if (query) {
            await prismaClient.notification.update({
                where: {
                    id: query.id,
                },
                data: {
                    read: true,
                },
            });
        }

        return query;
    }
}

