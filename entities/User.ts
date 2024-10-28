import HashPassword from "../app/user/HashPassword";

type TUser = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: number | null;
    enabled: boolean;
    name: string;
    email: string;
    password: string;
    permissions: TPermissions | null;
};

type TPermissions = {
    clientes: number;
    processos: number;
    servicos: number;
    usuarios: number;
    anotacoes: number;
    relatorios: number;
    contratos: number;
    configuracoes: number;
};

interface ITransportUser extends Omit<TUser, "id" | "password" | "hashPassword"> {}

interface ICreateUser extends Omit<TUser, "id" | "createdAt" | "updatedAt" | "lastLogin" | "enabled"> {
    permissions: TPermissions;
}

interface User extends TUser {}

class User {
    constructor(user: TUser) {
        this.id = user.id;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.lastLogin = user.lastLogin;
        this.enabled = user.enabled;
        this.name = user.name;
        this.email = user.email;
        this.permissions = user.permissions;

        if (user.password) {
            const hashPassword = new HashPassword();
            this.password = hashPassword.execute(user.password);
        }
    }
}

export { User, TUser, ITransportUser, ICreateUser };
