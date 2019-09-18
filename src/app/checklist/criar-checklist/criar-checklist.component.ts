import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilForms } from 'src/app/shared/util-forms';
import { InputOptions } from 'src/app/shared/componentes-compartilhados/input/input-options';

@Component({
  selector: 'smq-criar-checklist',
  templateUrl: './criar-checklist.component.html'
})
export class CriarChecklistComponent implements OnInit {

  public editarNomeDoChecklist = true;
  public nomeChecklistValido: boolean;
  public nomeDoChecklist: string;
  public formulario: FormGroup;
  public submited: boolean;

  public opcoes = new InputOptions();

  constructor(
    private _builder: FormBuilder,
    private _forms: UtilForms
  ) { }

  ngOnInit() {    

    this.criarFormulario();
    this.configurarInputs();

  }

  private criarFormulario(): void {

    this.formulario = this._builder.group({
      'checklist': this._forms.criarControle([Validators.required])      
    });

  }


  public definirNovoNomeDoChecklist(): void {

  }

  private configurarInputs(): void {

    this.opcoes.required = true;
    this.opcoes.minlength = 3;

  }


  public logar(): void {

    console.log('formulario', this.formulario.value);

    this.submited = true;

  }
  

}
