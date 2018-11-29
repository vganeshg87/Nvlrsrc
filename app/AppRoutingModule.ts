import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import {FirstpageComponent} from './Components/firstpage/firstpage.component'

const routes: Routes = [


    {
        
                path: 'Home', component: FirstpageComponent
        
            }
        


]


@NgModule({
    
        imports: [RouterModule.forRoot(routes, { useHash: true})],
    
        exports: [RouterModule]
    
    })
    
    export class AppRoutingModule { }