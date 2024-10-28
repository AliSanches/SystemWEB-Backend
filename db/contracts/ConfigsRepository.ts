export default interface ConfigsRepository {
    get(): Promise<any>;
    update(data: any): Promise<any>;
}

