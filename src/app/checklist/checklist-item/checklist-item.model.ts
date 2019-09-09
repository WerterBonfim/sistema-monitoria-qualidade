export class ChecklistItem {
    
    constructor(
        public id: string,
        public posicaoOrdenacao: number,
        public descricao: string,
        public descricaoAbreviada: string,
        public peso: number,
        public eEliminatoria: boolean,
        public atendeuItem?: string,
        public comentario?: string
    ) {

    }
}