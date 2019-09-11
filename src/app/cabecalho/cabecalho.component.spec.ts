import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { CabecalhoComponent } from './cabecalho.component';
import { By } from '@angular/platform-browser';

describe('CabecalhoComponent', () => {

  let component: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>;
  let el: DebugElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        CabecalhoComponent,

      ],

      imports: [
        NoopAnimationsModule

      ]
    })
      .compileComponents()
      .then(() => {

        fixture = TestBed.createComponent(CabecalhoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        el = fixture.debugElement;

      })

  }));



  it('Deve criar o component', () => {

    expect(component).toBeTruthy();

  });

  it("Deve ter a navbar que presenta os menus", () => {

    const navbar = el.query(By.css(".navbar"));
    expect(navbar).toBeTruthy('Não foi encontrado o elemento');

  })


  it("Deve conter a aba agenda e seus sub-menus", () => {

    const navbarAgenda = el.query(By.css(".navbar-item:nth-child(1)"));

    const linkAgendas = navbarAgenda.query(By.css(".navbar-link"));

    expect(linkAgendas.nativeElement.textContent).toContain("Agendas");

    const subLinksDaAgenda = navbarAgenda.queryAll(By.css(".navbar-item"));

    expect(subLinksDaAgenda.length).toBe(2);

  })


});
