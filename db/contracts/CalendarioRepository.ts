import { TCriarTarefa, TTarefa } from "../../entities/Calendario";

export default interface CalendarioRepository {
    criar(tarefa: TCriarTarefa, idUsuario: number): Promise<any>;
    editar(tarefa: TTarefa, idusuario: number): Promise<any>;
    listarPorData(data: string, idUsuario: number): Promise<any>;
    deletar(id: number, idUsuario: number): Promise<any>;
}

