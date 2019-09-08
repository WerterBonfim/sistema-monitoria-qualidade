export class ChecklistItem {
    
    constructor(
        public posicao: number,
        descricao: string,
        descricaoAbrevidada: string,
        peso: number,
        atendeuItem?: string,
        comentario?: string
    ) {

    }
}