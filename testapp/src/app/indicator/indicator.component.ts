import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {FormArray , FormGroup , FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html'
})
export class IndicatorComponent implements OnInit {


  orderForm: FormGroup;
  items: any = [];
  

  constructor(private _fb:FormBuilder) { 
    
  }

  ngOnInit() {

    this.orderForm = this._fb.group({
      customerName: '',
      email: '',
      items: this._fb.array([ this.createItem() ])
    });

    for (var i=0;i<4;i++){
      this.addItem();
      console.log(this.orderForm.get('items'))
    }

   }

  createItem(): FormGroup {
    return this._fb.group({
      Year: '',
      checkval:'',
      Dateval:'',
      description: '',
      Baseline:'',
      projection:'',
      achieved:''
    });
  } 

addItem(): void {
  this.items = this.orderForm.get('items') as FormArray;
  this.items.push(this.createItem());
}

Saveitem(): void{
  console.log(this._fb)
}

}
