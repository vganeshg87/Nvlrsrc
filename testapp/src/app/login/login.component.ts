import { Component, OnInit } from '@angular/core';
//import { NgModel } from '@angular/forms';
import {MyserviceService} from '../shared/myservice.service'
import { Router } from '@angular/router';
import {AppRoutesModule} from '../app.routes'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 //private myservice:MyserviceService
  myusername:string; 
  mypwd:string;

  constructor(private myservice: MyserviceService,private myroute:Router) { 
  }

  ngOnInit() {
    //this.myusername = "ganeshhguy"
  }

  Submit(): void{
    this.doLogin();
    
  }

     doLogin(): void {
      if (this.myusername != '' && this.mypwd != '') {
      // let res = this.myservice.dosomething();
       this.myservice.doCheck().subscribe((data:any) => {
               
        data.forEach(element => {
          if (element.Name == this.myusername && element.password == this.mypwd){
            this.myroute.navigateByUrl("/")
            alert('Login successfully')
           
          }else {

          }
        });
       })

        };
          // let loginObj = new login(this.myusername, this.mypwd)

  

}
}

// class login{
//   protected checkusername: string;
//   protected chckpwd: string;
//   constructor(username: string, password: string) {
//     this.checkusername = username;
//     this.chckpwd   = password;
//   }
// }


