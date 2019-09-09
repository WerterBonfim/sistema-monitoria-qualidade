import { ChecklistItem } from './checklist-item.model';
import { Component, OnInit, Input } from '@angular/core';
import { RadioOption } from 'src/app/shared/componentes-compartilhados/radio/radio-option.model';

@Component({
  selector: 'smq-checklist-item',
  templateUrl: './checklist-item.component.html'
})
export class ChecklistItemComponent implements OnInit {

  @Input() 
  public itens: ChecklistItem[] = [];

  atendeuItemOptions: RadioOption[] = [
    { label: 'Sim', value: 'S' },
    { label: 'Não', value: 'N' },
    { label: 'N/A', value: 'A' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
