import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioComponent } from './radio/radio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';



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
