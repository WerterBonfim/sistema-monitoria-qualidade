import { DicionarioDeErros } from './../../dicionario-de-erros';
import { Component, Input, forwardRef, ViewChild, ElementRef, ContentChild, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControlName, FormControl, Validator, ValidatorFn, Validators, NgModel, NG_VALIDATORS } from '@angular/forms';
import { InputOptions } from './input-options';

@Component({
  selector: 'smq-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: InputComponent,
    //   multi: true

    // }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  

  @Input()
  public opcoes: InputOptions = new InputOptions();

  @Input()
  public submited: boolean;

  @ViewChild('input', { static: true })
  public input: NgModel
  public disabled: any;

  private propagateChange = (_: any) => { };
  private temErroNoControle: boolean;

  constructor() { }


  ngOnInit(): void {

    console.log('on init', this.input);
    
  }


  public eValido(): boolean {

    //console.log('NgModel: ', this.input)
    //this.verificarErros();


    if (!!this.input && this.submited) {
      const eValido = (this.input.dirty || this.input.touched);
      return eValido;
    }

    return undefined;


  }

  public eInvalido(): boolean {

    if (!!this.input && this.submited) {
      const invalido = (this.input.dirty || this.input.touched);
      return invalido;
    }

    return undefined;


  }


  //#region [ implementação da interface ControlValueAccessor ] 


  writeValue(obj: any): void {
    this.input.control.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    console.log('isDisabled', isDisabled);
    this.disabled = isDisabled;
  }

  //#endregion


  public onChange(novoValor: any): void {
    this.propagateChange(novoValor);
  }

  //#region [ implementação da interface Validator ]

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {

    console.log('controel', control.errors)

    if (!!!control.errors) {
      console.log('não tem erro')
      this.temErroNoControle = false;
      return null;
    }




    this.temErroNoControle = true;

    const primeirErro = Object.keys(control.errors)[0];

    const descricao = DicionarioDeErros[primeirErro];
    this.opcoes.mensagemDeErro = descricao;

    console.log('tem erros', control.getError(primeirErro))
    return control.getError(primeirErro);

  }

  registerOnValidatorChange?(fn: () => void): void {

    console.log('registerOnValidatorChange', fn);

  }

  //#endregion



  private verificarErros(): void {



  }


}
