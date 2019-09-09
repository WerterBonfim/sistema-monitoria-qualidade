import { ChecklistItem } from './checklist-item/checklist-item.model';

export class Checklist {
    constructor(
        
        public id: string,
        public nome: string,
        public itens: ChecklistItem[] = []

    ){

    }
}