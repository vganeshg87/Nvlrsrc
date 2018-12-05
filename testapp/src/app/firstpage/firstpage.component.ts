import { Component, OnInit } from '@angular/core';
import {HttpClient} from  '@angular/common/http'

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit {

  constructor(private http:HttpClient) {

   }

  ngOnInit():void {
    this.http.get('https://api.github.com/users/gopigoppu').subscribe(data => {
      console.log(data)
  }
    )
  }

}
