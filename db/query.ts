import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const listUsers = async () => {
    const query = await prisma.user.findMany({
        include: {
            contacts: true,
        },
    });

    return query;
};

const addContact = async () => {
    const query = await prisma.user.update({
        where: {
            id: 2,
        },
        data: {
            contacts: {
                connect: {
                    id: 1,
                },
            },
        },
    });
};

const sendMessage = async () => {
    const query = await prisma.message.create({
        data: {
            content: "de 3 para 1",
            senderId: 3,
            receiverId: 1,
        },
    });

    return query;
};

const getConversation = async () => {
    const query = await prisma.message.findMany({
        where: {
            OR: [
                {
                    senderId: 1,
                    receiverId: 3,
                },
                {
                    senderId: 3,
                    receiverId: 1,
                },
            ],
        },
    });

    return query;
};

const deleteAllMessages = async () => {
    const query = await prisma.message.deleteMany();
};

const getContacts = async () => {
    const query = await prisma.user.findFirst({
        where: {
            id: 2,
        },
        select: {
            contacts: true,
        },
    });

    return query;
};

const execute = async () => {
    let now = Date.now();
    let results = await getContacts();

    let finish = Date.now() - now;

    console.log(results);
    console.log("IN: ", finish);
};

execute();

