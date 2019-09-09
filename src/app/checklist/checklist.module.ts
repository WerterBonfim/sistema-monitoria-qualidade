import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistComponent } from './checklist.component';
import { ChecklistItemComponent } from './checklist-item/checklist-item.component';
import { CriarChecklistComponent } from './criar-checklist/criar-checklist.component';
import { ChecklistService } from './checklist.service';




@NgModule({
  declarations: [
    ChecklistComponent    
    ,ChecklistItemComponent
    ,CriarChecklistComponent 
  ],
  providers: [
    ChecklistService
  ],

  imports: [
    CommonModule
  ]
})
export class ChecklistModule { }
