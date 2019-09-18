import { Component, Input, forwardRef, ViewChild, ElementRef, ContentChild } from '@angular/core';
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
    {
      provide: NG_VALIDATORS,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, Validator {

  @Input()
  public opcoes: InputOptions = new InputOptions();

  @Input()
  public submited: boolean;

  @ViewChild('input', { static: true })
  public input: NgModel
  public disabled: any;

  private propagateChange = (_: any) => { };

  constructor() { }


  public eValido(): boolean {

    //console.log('NgModel: ', this.input)
    //this.verificarErros();


    if (!!this.input && this.submited) {
      const eValido = this.input.valid && (this.input.dirty || this.input.touched);
      return eValido;
    }

    return undefined;


  }

  public eInvalido(): boolean {

    if (!!this.input && this.submited) {
      const eValido = this.input.invalid && (this.input.dirty || this.input.touched);
      return eValido;
    }

    return undefined;


  }


  //#region [ implementação da interface ControlValueAccessor ] 


  writeValue(obj: any): void {
    console.log('obj', obj);
    console.log('iput', this.input);;
    this.input.control.setValue(obj)
    //this.input.nativeElement.value = obj;
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

    //console.log('validate', control);
    
    console.log('NgModel Controle', {
      erros: control.errors,
      requirido: control.hasError('required')
    });

    return this.opcoes.listarValidacoes(control);

  }

  registerOnValidatorChange?(fn: () => void): void {

    console.log('registerOnValidatorChange', fn);

  }

  //#endregion



  private verificarErros(): void {

    

  }


}
