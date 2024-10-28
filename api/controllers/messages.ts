import { Request, Response } from "express";
import { MessageDatabaseRepository } from "../../db/repositories/MessageDatabaseRepository";
import { UserDatabaseRepository } from "../../db/repositories/UserDatabaseRepository";

export const getContacts = async (req: Request, res: Response) => {
    const { userId } = req.params;
    let repo = new MessageDatabaseRepository();

    const query = await repo.listContacts(+userId);
    res.send(query);
};

export const getChat = async (req: Request, res: Response) => {
    const repo = new MessageDatabaseRepository();
    const { userId, contactId } = req.params;

    const query = await repo.getChat(+userId, +contactId);
    res.send(query);
};

export const sendMessage = async (req: Request, res: Response) => {
    const repo = new MessageDatabaseRepository();
    const { userId, contactId } = req.params;
    const { content } = req.body;

    const query = await repo.sendMessage(content, +userId, +contactId);
    res.send(query);
};

export const getNotifications = async (req: any, res: Response) => {
    const repo = new MessageDatabaseRepository();
    const { id } = req.user;

    const data = await repo.getNotifications(id);
    res.send(data);
};

export const getNotAdded = async (req: any, res: Response) => {
    let { userId } = req.params;

    let repo = new MessageDatabaseRepository();
    let contacts = await repo.listContacts(+userId);
    let contactsIds = [] as any[];
    contacts!.contacts.map((contact) => {
        contactsIds.push(contact.id);
    });

    const userRepo = new UserDatabaseRepository();
    let users = await userRepo.list();

    let contactsNotAdded = [] as any[];

    for (let userIndex in users) {
        if (!contactsIds.includes(users[userIndex].id) && users[userIndex].id != userId) {
            contactsNotAdded.push(users[userIndex]);
        }
    }

    res.send(contactsNotAdded);
};

export const addContact = async (req: any, res: Response) => {
    let repo = new UserDatabaseRepository();

    let data = req.body;

    let query = await repo.addContact(data.user, data.contact);
    res.sendStatus(201);
};

export const removeContact = async (req: any, res: Response) => {
    let repo = new UserDatabaseRepository();

    let data = req.body;

    let query = await repo.removeContact(data.user, data.contact);
    res.sendStatus(200);
};

