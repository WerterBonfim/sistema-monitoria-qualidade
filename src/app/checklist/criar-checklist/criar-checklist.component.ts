import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UtilForms } from 'src/app/shared/util-forms';

@Component({
  selector: 'smq-criar-checklist',
  templateUrl: './criar-checklist.component.html'
})
export class CriarChecklistComponent implements OnInit {

  public editarNomeDoChecklist = true;
  public nomeChecklistValido: boolean;
  public nomeDoChecklist: string;
  public formulario: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private _forms: UtilForms
  ) { }

  ngOnInit() {    

    this.criarFormulario();

  }

  private criarFormulario(): void {

    this.formulario = this._builder.group({
      'checklist': this._forms.criarControle()      
    });

  }


  public definirNovoNomeDoChecklist(): void {

  }


  public logar(): void {

    console.log('formulario', this.formulario.value);

  }
  

}
