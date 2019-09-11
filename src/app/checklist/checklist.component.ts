import { Component, OnInit } from '@angular/core';
import { Checklist } from './checklist.model';
import { ChecklistService } from './checklist.service';

@Component({
  selector: 'smq-checklist',
  templateUrl: './checklist.component.html'
})
export class ChecklistComponent implements OnInit {

  public checkList: Checklist 

  constructor(

    private _checklistService: ChecklistService    

  ) {

  }

  ngOnInit() {
    
    this.checkList = new Checklist("2bcfe950-8f57-4301-a014-cdc2202f70fc", "")
    
  }

}
