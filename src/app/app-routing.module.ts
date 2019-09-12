import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistResolver } from './checklist/checklist.resolver';
import { ChecklistComponent } from './checklist/checklist.component';
import { CriarChecklistComponent } from './checklist/criar-checklist/criar-checklist.component';


const routes: Routes = [
  
  { path: 'checklist', loadChildren: () => import('./checklist/checklist.module').then(m => m.ChecklistModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
