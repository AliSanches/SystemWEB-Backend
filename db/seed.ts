import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import HashPassword from "../app/user/HashPassword";

export const seed = async () => {
    const hashPassword = new HashPassword();

    const password = hashPassword.execute("admin");

    const query = await prisma.user.create({
        data: {
            email: "admin@admin.com",
            name: "root",
            password,
            permissions: {
                create: {
                    clientes: 2,
                    processos: 2,
                    servicos: 2,
                    usuarios: 2,
                    anotacoes: 2,
                    configuracoes: 2,
                    contratos: 2,
                    relatorios: 1,
                    ged: 2,
                },
            },
        },
    });

    await prisma.config.create({
        data: {
            empresa: "Nome da empresa",
        },
    });

    return query;
};

const execute = async () => {
    let query = await seed();
    console.log(query);
};

execute();

