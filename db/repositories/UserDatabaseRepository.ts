import { prismaClient as db } from "../../db/prismaClient";
import { User, TUser, ICreateUser } from "../../entities/User";
import UserRepository, { ICreateUserReturn } from "../contracts/UserRepository";

class UserDatabaseRepository implements UserRepository {
    create = async (user: ICreateUser): Promise<ICreateUserReturn> => {
        try {
            return await db.user.create({
                data: {
                    name: user.name,
                    password: user.password,
                    email: user.email,
                    permissions: {
                        create: {
                            ...user.permissions,
                        },
                    },
                },
                include: {
                    permissions: true,
                },
            });
        } catch (err) {
            const message = err.meta.target.includes("email") ? "err_email_key" : "err_create_user";
            throw new Error(message);
        }
    };

    get = async (id: number): Promise<User> => {
        try {
            const query = await db.user.findUnique({
                where: {
                    id,
                },
                include: {
                    permissions: true,
                },
            });

            return query!;
        } catch {
            throw new Error("err_get_user");
        }
    };

    findByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        try {
            return await db.user.findFirst({
                where: {
                    email: email,
                    password: password,
                },
                include: {
                    permissions: true,
                    contacts: true,
                },
            });
        } catch {
            throw new Error("err_wrong_credentials");
        }
    };

    delete = async (id: number): Promise<boolean> => {
        try {
            db.user
                .delete({
                    where: {
                        id,
                    },
                })
                .catch((err) => {
                    throw new Error("err_delete_user");
                });

            return true;
        } catch (err) {
            throw new Error("err_delete_user");
        }
    };

    update = async (user: TUser): Promise<TUser> => {
        try {
            return await db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    lastLogin: user.lastLogin,
                    enabled: user.enabled,
                    permissions: {
                        update: {
                            data: {
                                anotacoes: user.permissions?.anotacoes,
                                clientes: user.permissions?.clientes,
                                processos: user.permissions?.processos,
                                servicos: user.permissions?.servicos,
                                usuarios: user.permissions?.usuarios,
                                relatorios: user.permissions?.relatorios,
                                contratos: user.permissions?.contratos,
                                configuracoes: user.permissions?.configuracoes,
                            },
                        },
                    },
                },
                include: {
                    permissions: true,
                },
            });
        } catch (err) {
            let message: string;
            err.meta.target.includes("email") ? (message = "err_email_key") : (message = "err_update_user");
            throw new Error(message);
        }
    };

    list = async (): Promise<any[]> => {
        try {
            const query = await db.user.findMany({
                include: {
                    permissions: true,
                    contacts: true,
                },
            });

            return query;
        } catch {
            throw new Error("err_list_users");
        }
    };

    addContact = async (id1, id2) => {
        const query = await db.user.update({
            where: {
                id: id1,
            },
            data: {
                contacts: {
                    connect: {
                        id: id2,
                    },
                },
                contactOf: {
                    connect: {
                        id: id2,
                    },
                },
            },
        });

        return query;
    };

    removeContact = async (id1, id2) => {
        const query = await db.user.update({
            where: {
                id: id1,
            },
            data: {
                contacts: {
                    disconnect: {
                        id: id2,
                    },
                },
                contactOf: {
                    disconnect: {
                        id: id2,
                    },
                },
            },
        });

        return query;
    };

    saveGoogleToken = async (id, token, refreshToken) => {
        const query = await db.user.update({
            where: {
                id,
            },
            data: {
                google_token: token,
                google_refreshToken: refreshToken,
            },
        });

        return query;
    };
}

export { UserDatabaseRepository };

