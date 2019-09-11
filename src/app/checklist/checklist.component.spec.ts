import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ChecklistComponent } from './checklist.component';
import { ChecklistItemComponent } from './checklist-item/checklist-item.component';
import { ChecklistService } from './checklist.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('ChecklistComponent', () => {

  let
    component: ChecklistComponent,
    fixture: ComponentFixture<ChecklistComponent>    


  beforeEach(async(() => {

    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['pipe']);
    
    
    

    TestBed.configureTestingModule({

      imports: [
        RouterTestingModule
      ],

      declarations: [
        ChecklistComponent
      ],

      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]

    })
      .compileComponents()
      .then(() => {

        fixture = TestBed.createComponent(ChecklistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

      });

  }));
  

  it('deve ser criado', () => {

    expect(component).toBeTruthy();    

  });


});
