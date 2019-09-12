import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioComponent } from './radio/radio.component';
import { InputComponent } from './input/input.component';
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
    
  ]

})
export class ComponentesCompartilhadosModule { }
