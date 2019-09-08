import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistItemComponent } from './checklist-item/checklist-item.component';
import { CriarChecklistComponent } from './criar-checklist/criar-checklist.component';
import { ChecklistComponent } from './checklist/checklist.component';



@NgModule({
  declarations: [ChecklistItemComponent, CriarChecklistComponent, ChecklistComponent],
  imports: [
    CommonModule
  ]
})
export class ChecklistModule { }
