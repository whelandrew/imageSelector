import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import {WebApiPromiseService} from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [WebApiPromiseService],
				
  bootstrap: [AppComponent]
})
export class AppModule { }
