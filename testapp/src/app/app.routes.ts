import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  { LoginComponent } from './login/login.component'
import { FirstpageComponent } from './firstpage/firstpage.component'
import { NotfoundComponentComponent } from './notfound-component/notfound-component.component'
import { DesignsComponent } from './designs/designs.component'
import {CommunicationComponent} from './communication/communication.component'
import { IndicatorComponent } from './indicator/indicator.component';

const routes: Routes = [
    {path:"Loginpage", component:LoginComponent},
    {path: "FirstPage" , component:FirstpageComponent},
    {path: "Designs" , component:DesignsComponent},
    {path:"Communication",component:CommunicationComponent},
    {path:"Indicator" , component:IndicatorComponent},
    {path: "**" , component:NotfoundComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
