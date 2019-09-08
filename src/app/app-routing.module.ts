import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistItemComponent } from './checklist/checklist-item/checklist-item.component';
import { ChecklistResolver } from './checklist/checklist.resolver';


const routes: Routes = [
  { path: 'checklist', component: ChecklistItemComponent, resolve: { recursosDaPagina: ChecklistResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
