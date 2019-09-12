import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChecklistService } from './checklist.service';

@Injectable()
export class ChecklistResolver implements Resolve<any> {

    constructor(
        private _checklistService: ChecklistService
    ) {

    }
    
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {


        const listaDeRecurso: Observable<any>[] = [
            this._checklistService.listarChecklists()
        ];

        return forkJoin(listaDeRecurso).pipe(
            map( recurso => {
                return {
                    checklists: recurso[0]
                }
            }));


    }
}
