export interface ContratoRepository {
    create(titulo: string, texto: string);
    list();
    edit(id: string, data: any);
    getById(id: number);
    deleteOne(id: number);
}
