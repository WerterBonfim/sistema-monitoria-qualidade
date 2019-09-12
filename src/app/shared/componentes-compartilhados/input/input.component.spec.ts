import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { createHostComponentFactory, SpectatorWithHost, Spectator } from "@ngneat/spectator";


import { InputComponent } from "./InputComponent";
import { Component } from '@angular/core';

@Component({ selector: 'app-custom', template: '' })
class CustomComponent {

  public formulario = new FormGroup({
    nome: new FormControl('')
  });

}

describe('InputComponent', () => {

  let host: SpectatorWithHost<InputComponent, CustomComponent>;
  const createHost = createHostComponentFactory({
    component: InputComponent,
    host: CustomComponent,
    imports: [
      FormsModule,
      ReactiveFormsModule
    ]
  });




  it('Deve ser criado', async(() => {


    host = createHost(
      `<smq-input mensagemDeErro="Campo obrigatório, no minimo 3 caracteres" >
        <input class="foo" [(ngModel)]="nomeDoChecklist" >
      </smq-input>`);

    expect(host).toBeTruthy();

  }));

  it('Deve definir um NgModel', () => {

    host = createHost(
      `<smq-input mensagemDeErro="Campo obrigatório, no minimo 3 caracteres" >
            <input class="foo" [(ngModel)]="nomeDoChecklist" >
          </smq-input>`);

    host.hostFixture.whenStable().then(() => {
      host.typeInElement('primeiro checklist', '.foo');

      expect(host).toBeTruthy();
      expect(host.component.model.value).toBe("primeiro checklist");

    });

  });



  it('Deve definir um FormControlName', () => {

    pending();

    // const html = `
    //   <div [formGroup]="formulario">
    //     <smq-input mensagemDeErro="Campo obrigatório, no minimo 3 caracteres" >
    //       <input class="foo" formControlName="nome" />
    //     </smq-input>
    //   </div>
    // `;

    // host = createHost(html, {
    //   detectChanges: true,
    //   props: {
        

    //   }
    // });

    // host.hostFixture.whenStable().then(() => {
    //   host.typeInElement('primeiro checklist', '.foo');

    //   expect(host).toBeTruthy();
    //   expect(host.component.model.value).toBe("primeiro checklist");

    // });

  });


});
