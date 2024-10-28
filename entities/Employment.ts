import { TCustomer } from "./Customer";

type TEmployment = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    company?: string | null;
    position?: string | null;
    startDate: Date;
    endDate: Date;
    periodIsSpecial: boolean;
    durationYears: number;
    durationMonths: number;
    durationDays: number;
    considerGracePeriod: boolean;
    gracePeriodMonths: number;
    customerId: number;
    customer?: TCustomer;
};

interface Employment extends TEmployment {}

export interface ICreateEmployment
    extends Omit<
        TEmployment,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "considerGracePeriod"
        | "customer"
        | "durationYears"
        | "durationMonths"
        | "durationDays"
        | "gracePeriodMonths"
    > {
    considerGracePeriod?: boolean;
    gracePeriodMonths?: number;
    durationYears?: number;
    durationMonths?: number;
    durationDays?: number;
}

export interface IUpdateEmployment
    extends Omit<
        TEmployment,
        | "createdAt"
        | "updatedAt"
        | "customer"
        | "durationYears"
        | "durationMonths"
        | "durationDays"
        | "considerGracePeriod"
        | "gracePeriodMonths"
    > {
    considerGracePeriod?: boolean;
    gracePeriodMonths?: number;
    durationYears?: number;
    durationMonths?: number;
    durationDays?: number;
}

class Employment {
    constructor(employment: TEmployment) {
        this.id = employment.id;
        this.createdAt = employment.createdAt;
        this.updatedAt = employment.updatedAt;
        this.company = employment.company;
        this.position = employment.position;
        this.startDate = employment.startDate;
        this.endDate = employment.endDate;
        this.durationYears = employment.durationYears;
        this.durationMonths = employment.durationMonths;
        this.durationDays = employment.durationDays;
        this.considerGracePeriod = employment.considerGracePeriod;
        this.gracePeriodMonths = employment.gracePeriodMonths;
        this.customerId = employment.customerId;
        this.customer = employment.customer;
    }
}

export { Employment, TEmployment };

