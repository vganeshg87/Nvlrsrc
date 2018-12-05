import { Component, Input, Output ,OnInit ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-communication',
  templateUrl: './child-communication.component.html',
  styleUrls: ['./child-communication.component.css']
})
export class ChildCommunicationComponent implements OnInit {

  constructor() { }

  @Input() title;
  @Input() title1;
  @Input() myparentval;
  @Output() onNamechange = new EventEmitter(); 
// Passing to parent comp
  @Input()
  set title2(value){
    console.log(value)

  }

  // Getting the value from parent
  // @Input()
  // set myparentval(value){
  //   console.log(value.name)

  // }

  ngOnInit() {
  }

  Dochange() {
    this.myparentval.name = "value changed as Typescript "
    console.log(this.myparentval.name)

    // To Parent Component emitter
    this.onNamechange.emit('Hai i am from Child')
  }

}
