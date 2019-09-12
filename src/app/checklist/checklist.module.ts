import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistComponent } from './checklist.component';
import { ChecklistItemComponent } from './checklist-item/checklist-item.component';
import { CriarChecklistComponent } from './criar-checklist/criar-checklist.component';
import { ChecklistService } from './checklist.service';
import { AppRoutingModule } from './checklist.routing';
import { ComponentesCompartilhadosModule } from '../shared/componentes-compartilhados/componentes-compartilhados.module';
import { ChecklistResolver } from './checklist.resolver';
import { UtilForms } from '../shared/util-forms';
import { Util } from '../shared/utils';




@NgModule({
  declarations: [
    ChecklistComponent    
    ,ChecklistItemComponent
    ,CriarChecklistComponent 
  ],
  providers: [
    ChecklistService,
    ChecklistResolver,
    UtilForms,
    Util
  ],

  imports: [
    CommonModule,
    ComponentesCompartilhadosModule,
    AppRoutingModule,
  ],

  exports:[
    ChecklistComponent    
    ,ChecklistItemComponent
    ,CriarChecklistComponent 
  ]
})
export class ChecklistModule { }
