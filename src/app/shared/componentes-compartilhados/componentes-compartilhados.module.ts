import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioComponent } from './radio/radio.component';
import { InputComponent } from "./input/InputComponent";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  
  declarations: [
    RadioComponent,
    InputComponent
  ],
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RadioComponent,
    InputComponent

  ]

})
export class ComponentesCompartilhadosModule { }
