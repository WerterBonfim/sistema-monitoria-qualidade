import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoComponent } from './cabecalho.component';
import { DebugElement } from '@angular/core';
import { By } from 'protractor';

describe('CabecalhoComponent', () => {
  
  let component: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>;
  let el: DebugElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ 
        CabecalhoComponent 
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(CabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;

  });

  it('should create', () => {
    
    //el.nativeElement.outerHtml
    //pending();
    expect(component).toBeTruthy();
    
  });

  it('Deve conter uma lista de navbars', () => {   
    
    //el.nativeElement.outerHtml
    pending();
    
    //expect(component).toBeTruthy();
    
  });


});
