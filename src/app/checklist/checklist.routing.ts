import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChecklistComponent } from './checklist.component';
import { ChecklistResolver } from './checklist.resolver';
import { CriarChecklistComponent } from './criar-checklist/criar-checklist.component';

const routes: Routes = [
    {
        path: '', component: ChecklistComponent, resolve: { recursosDaPagina: ChecklistResolver }
    },
    { 
        path: 'criar', component: CriarChecklistComponent 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
