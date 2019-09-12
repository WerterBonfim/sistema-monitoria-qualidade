import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName  } from '@angular/forms';

@Component({
  selector: 'smq-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() mensagemDeErro: string;
  input: any;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usando com uma diretiva ngModel ou formControlName');
    }
  }

  public eValido(): boolean {
    const eValido = this.input.valid && (this.input.dirty || this.input.touched);
    return eValido;
  }

  public temErro(): boolean {
    const eValido = this.input.invalid && (this.input.dirty || this.input.touched);
    return eValido;
  }

  

}
