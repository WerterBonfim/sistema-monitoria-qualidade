import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistResolver } from './checklist/checklist.resolver';
import { ChecklistComponent } from './checklist/checklist.component';


const routes: Routes = [
  { path: 'checklist', component: ChecklistComponent, resolve: { recursosDaPagina: ChecklistResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
