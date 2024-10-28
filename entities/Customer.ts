type TCustomer = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    motherName: string;
    cpf: string;
    rg: string;
    rgIssuer: string;
    cep: string;
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    mail: string;
    phone: string;
    birthplace: string;
    profession: string;
    civil: string;
    customerSince: Date | string;
    gender: string;
    birthdate: Date | string;
    serie: string;
    ctps: string;
    numberFolder: string;
    pis: string;
    responsibleFolder: string;
    smartPhone: string;
    statusCustomer: string;
    origin: string;
    stateLife: string;
    education: string;
    payment: boolean;
    passwordINSS: string;
    imageProfile: string;
    attachments?: any;
};

interface IUpdateCustomer extends Omit<TCustomer, "createdAT" | "updatedAT"> {}

interface ITransportCustomer extends Omit<TCustomer, "id" | "createdAT" | "updatedAT"> {}

interface Customer extends TCustomer {}

class Customer {
    constructor(customer: TCustomer) {
        this.id = customer.id;
        this.createdAt = customer.createdAt;
        this.updatedAt = customer.updatedAt;
        this.name = customer.name;
        this.motherName = customer.motherName;
        this.cpf = customer.cpf;
        this.rg = customer.rg;
        this.rgIssuer = customer.rgIssuer;
        this.cep = customer.cep;
        this.uf = customer.uf;
        this.city = customer.city;
        this.neighborhood = customer.neighborhood;
        this.street = customer.street;
        this.mail = customer.mail;
        this.phone = customer.phone;
        this.birthplace = customer.birthplace;
        this.profession = customer.profession;
        this.civil = customer.civil;
        this.customerSince = customer.customerSince;
        this.gender = customer.gender;
        this.birthdate = customer.birthdate;
        this.serie = customer.serie;
        this.ctps = customer.ctps;
        this.numberFolder = customer.numberFolder;
        this.pis = customer.pis;
        this.responsibleFolder = customer.responsibleFolder;
        this.smartPhone = customer.smartPhone;
        this.statusCustomer = customer.statusCustomer;
        this.origin = customer.origin;
        this.stateLife = customer.stateLife;
        this.education = customer.education;
        this.payment = customer.payment;
        this.passwordINSS = customer.passwordINSS;
        this.imageProfile = customer.imageProfile;
        this.attachments = customer.attachments;
    }
}

export { Customer, TCustomer, ITransportCustomer, IUpdateCustomer };

