import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';

import { Checklist } from './checklist.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ChecklistService {



  private api: string = environment.api;

  constructor(

    private _http: HttpClient,

  ) {

  }

  public buscarChecklist(id: string): Observable<Checklist> {

    return this._http.get<Checklist>(`${this.api}/checklist?id=${id}`);

  }

  public listarChecklists(): Observable<Checklist[]> {
    return this._http.get<Checklist[]>(`${this.api}/checklist`);
  }


}
