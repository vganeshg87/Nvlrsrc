import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  ReactiveFormsModule , FormsModule, } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { AppRoutesModule } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MyserviceService } from '../app/shared/myservice.service';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { NotfoundComponentComponent } from './notfound-component/notfound-component.component';
import { DesignsComponent } from './designs/designs.component';
import { CommunicationComponent } from './communication/communication.component';
import { ChildCommunicationComponent } from './child-communication/child-communication.component';
import { IndicatorComponent } from './indicator/indicator.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FirstpageComponent,
    NotfoundComponentComponent,
    DesignsComponent,
    CommunicationComponent,
    ChildCommunicationComponent,
    IndicatorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutesModule
  ],
  providers: [MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 