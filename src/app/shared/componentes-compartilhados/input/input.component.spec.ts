import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { createHostComponentFactory, SpectatorWithHost } from "@ngneat/spectator";


import { InputComponent } from './input.component';

describe('InputComponent', () => {

  let host: SpectatorWithHost<InputComponent>;
  const createHost = createHostComponentFactory({
    component: InputComponent,
    imports: [FormsModule]
  });


  it('Deve ser criado', async(() => {


    host = createHost(
      `<smq-input mensagemDeErro="Campo obrigatório, no minimo 3 caracteres" >
        <input class="foo" [(ngModel)]="nomeDoChecklist" >
      </smq-input>`);

    expect(host).toBeTruthy();

  }));

  it('Deve dar um erro para um input que não foi definido um ngModel ou FormControlName', () => {

    host = createHost(
      `<smq-input mensagemDeErro="Campo obrigatório, no minimo 3 caracteres" >
        <input class="foo" [(ngModel)]="nomeDoChecklist" >
      </smq-input>`);

    host.hostFixture.whenStable().then(() => {

      //host.typeInElement('primeiro checklist', '.foo');

      expect(host).toBeTruthy();
      host.component.model//?
      expect(host.component.model.value).toBe("primeiro checklist");

    });

  // it('Deve renderizar um input para um NgModel definido', () => {

  //   host = createHost(
  //     `<smq-input mensagemDeErro="Campo obrigatório, no minimo 3 caracteres" >
  //         <input class="foo" [(ngModel)]="nomeDoChecklist" >
  //       </smq-input>`);

  //   host.hostFixture.whenStable().then(() => {
  //     host.typeInElement('primeiro checklist', '.foo');


  //     expect(host).toBeTruthy();
  //     host.component.model//?
  //     expect(host.component.model.value).toBe("primeiro checklist");

  //   });




  });
