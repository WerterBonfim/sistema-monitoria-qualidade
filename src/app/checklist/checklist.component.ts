import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Checklist } from './checklist.model';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'smq-checklist',
  templateUrl: './checklist.component.html'
})
export class ChecklistComponent implements OnInit {

  public checkLists: Checklist[] = [];

  constructor(    
    private _activatedRouter: ActivatedRoute

  ) {

  }

  ngOnInit() {

    this.carregarRecursosDaPagina();


  }

  private carregarRecursosDaPagina(): void {

    this._activatedRouter.data      
      .pipe(map(x => x.recursosDaPagina))
      .subscribe(recursos => {
        
        console.log('recursos', recursos);
        this.checkLists = recursos.checklists;

      })

  }

}
