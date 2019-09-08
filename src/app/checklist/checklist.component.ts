import { Component, OnInit } from '@angular/core';
import { Checklist } from './checklist.model';
import { ChecklistService } from './checklist.service';

@Component({
  selector: 'smq-checklist',
  template: `
    <w-checklist-item 
        *ngIf="checkList" 
        [itens]="checkList.itens">

    </w-checklist-item>
  `
})
export class ChecklistComponent implements OnInit {

  public checkList: Checklist

  constructor(

    private _checklistService: ChecklistService    

  ) {

  }

  ngOnInit() {

    
    
  }

}
