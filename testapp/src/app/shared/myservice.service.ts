import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable()
export class MyserviceService {

  constructor (private http:HttpClient) {

  }

  doCheck(){
     return this.http.get('assets/users.json');
  }

  dosomething(): string{
    return "hai";
  }

}
