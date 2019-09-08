import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarChecklistComponent } from './criar-checklist.component';

describe('CriarChecklistComponent', () => {
  let component: CriarChecklistComponent;
  let fixture: ComponentFixture<CriarChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
