import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ChecklistComponent } from './checklist.component';
import { ChecklistItemComponent } from './checklist-item/checklist-item.component';
import { ChecklistService } from './checklist.service';


describe('ChecklistComponent', () => {
  
  let
    component: ChecklistComponent,
    fixture: ComponentFixture<ChecklistComponent>,
    checklistServiceFake: ChecklistService;


  beforeEach( async (() => {

    checklistServiceFake = jasmine.createSpyObj('ChecklistService', ['buscarChecklist', 'listarChecklists']);

    TestBed.configureTestingModule({

      declarations: [
        ChecklistComponent,
        ChecklistItemComponent
      ],

      providers: [
        { provide: ChecklistService, useValue: checklistServiceFake }

      ]

    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    
    expect(component).toBeTruthy();
    expect(true).toBeTruthy();

  });  


});
