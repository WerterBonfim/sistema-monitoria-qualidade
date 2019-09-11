import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { ChecklistModule } from './checklist/checklist.module';
import { RadioComponent } from './shared/componentes-compartilhados/radio/radio.component';
import { ComponentesCompartilhadosModule } from './shared/componentes-compartilhados/componentes-compartilhados.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/mock/in-memory-data.service';
import { InputComponent } from './shared/input/input.component';

export const isMock = environment.mock

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    InputComponent    
    
  ],
  imports: [
    
    BrowserModule
    ,HttpClientModule        
    ,isMock ? HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService) : []
    ,AppRoutingModule
    ,ChecklistModule
    ,ComponentesCompartilhadosModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
