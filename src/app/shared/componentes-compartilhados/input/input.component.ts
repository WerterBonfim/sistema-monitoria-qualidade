import { Component, OnInit, Input, ContentChild, forwardRef, OnChanges, SimpleChanges, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { InputOptions } from './input-options';

@Component({
  selector: 'smq-input',
  templateUrl: './input.component.html',
  //encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    //{ provide: NG_VALIDATORS, useExisting: forwardRef(() => InputComponent), multi: true }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {





  @Input()
  public options: InputOptions = new InputOptions();

  public input: FormControlName | NgModel;
  




  get value(): any {
    return this.input.control.value;
  }


  set value(va: any) {
    console.log('v', va);
    if (this.input)
      this.input.control.setValue(va);

  }

  propagateChange: any = () => { };
  validateFn: any = () => { };





  constructor() { }

  ngOnInit() {
  }

  public eValido(): boolean {
    console.log('input valor', this.input);
    const eValido = this.input.valid && (this.input.dirty || this.input.touched);
    return eValido;
  }

  public temErro(): boolean {
    const eValido = this.input.invalid && (this.input.dirty || this.input.touched);
    return eValido;
  }


  //#region [ implementação da interface ControlValueAccessor ]

  onChange: any = () => { };
  OnTouched: any = () => { };


  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    //this.onChange.valueChange.subscribe(x => console.log('alsdjflakj', x))
    console.dir(this.onChange)
  }
  registerOnTouched(fn: any): void {
    this.OnTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('isDisabled', isDisabled);
  }

  //#endregion




}
