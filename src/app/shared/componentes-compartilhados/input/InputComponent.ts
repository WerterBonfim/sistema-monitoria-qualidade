import { Component, OnInit, Input, ContentChild, forwardRef, OnChanges } from '@angular/core';
import { NgModel, FormControlName, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { InputOptions } from './input-options';
@Component({
  selector: 'smq-input',
  templateUrl: './input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputComponent), multi: true }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input()
  public options: InputOptions = new InputOptions();
  private input: any;
  @ContentChild(NgModel, { static: true })
  public model: NgModel;
  @ContentChild(FormControlName, { static: true })
  public control: FormControlName;
  get value(): any {
    return this.input.control.value;
  }
  set value(va: any) {
    console.log('v', va);
    if (va)
      //this.input.control.setValue(v);
      this.onChange(va);
  }
  propagateChange: any = () => { };
  validateFn: any = () => { };
  constructor() { }
  ngOnInit() {
  }
  // ngAfterContentInit(): void {
  //   this.input = this.model || this.control;
  //   console.log('input', this.input)
  //   if (this.input === undefined) {
  //     throw new Error('Esse componente precisa ser usando com uma diretiva ngModel ou formControlName');
  //   }
  // }
  public eValido(): boolean {
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
    console.log('input', this.input);
    if (obj) {
      this.value = obj;
      this.onChange(this.value);
    }
  }
  registerOnChange(fn: any): void {
    console.log('registerOnChange', fn);
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.OnTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('isDisabled', isDisabled);
  }
}
