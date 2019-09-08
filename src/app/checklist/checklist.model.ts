import { ChecklistItem } from './checklist-item/checklist-item.model';

export class Checklist {
    constructor(

        public name: string,
        public itens: ChecklistItem[] = []

    ){

    }
}