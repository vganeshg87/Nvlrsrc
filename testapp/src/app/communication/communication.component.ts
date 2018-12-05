import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {


  public Personname = {name : "JavaScript"}
   
   
  constructor() { }


  handlenameChange(event) {
    console.log('Value passed from child comp \" ' + event + '\"');

  }


  ngOnInit() {
    console.log('Source Value in ** ' + this.Personname.name + ' **');
  }

}
